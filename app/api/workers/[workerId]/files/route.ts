import { currentUser } from "@/lib/auth";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { workerId: string } }
) {
  try {
    const user = await currentUser();
    const { url, name = null, status = null, attachmentId } = await req.json();

    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const broker = await db.worker.findUnique({
      where: {
        id: params.workerId,
        userId: user.id,
      }
    });

    if (!broker) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const file = await db.file.create({
      data: {
        url,
        name: url.split("/").pop(),
        workerId: params.workerId,
        attachmentId: attachmentId,
      }
    });

    return NextResponse.json(file);
  } catch (error) {
    console.log("WORKER_ID_ATTACHMENTS", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}