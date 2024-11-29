import { NextResponse } from "next/server";
import { join } from "path";
import { stat, readdir } from "fs/promises";
import archiver from "archiver";

export async function GET(
  request: Request,
  { params }: { params: { workerId: string } }
) {
  const workerId = params.workerId;
  const workerDir = join(process.cwd(), "public", "uploads", workerId);

  try {
    // Check if the worker directory exists
    await stat(workerDir);
  } catch (e: any) {
    if (e.code === "ENOENT") {
      return NextResponse.json({ error: "Worker folder not found." }, { status: 404 });
    }
    console.error("Error accessing worker directory:", e);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }

  try {
    // Create a readable stream for the zip archive
    const stream = new ReadableStream({
      start(controller) {
        const archive = archiver("zip", { zlib: { level: 9 } });

        archive.on("data", (chunk) => controller.enqueue(chunk));
        archive.on("end", () => controller.close());
        archive.on("error", (err) => {
          console.error("Error during archive creation:", err);
          controller.error(err);
        });

        archive.directory(workerDir, false);
        archive.finalize();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${workerId}.zip"`,
      },
    });
  } catch (e) {
    console.error("Error creating zip archive:", e);
    return NextResponse.json({ error: "Failed to create archive." }, { status: 500 });
  }
}
