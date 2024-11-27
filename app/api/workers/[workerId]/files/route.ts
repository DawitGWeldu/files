import { currentUser } from "@/lib/auth";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { workerId: string } }
) {
  try {
    const user = await currentUser();
    const { url, name, status, attachmentId, text } = await req.json();
    let act = "Made changes"
    if(url?.length > 0)
      act = "Uploaded a file"
    if(name?.length > 0)
      act = "Uploaded a file"
    if(status?.length > 0)
      act = "Changed a status"
    if(text?.length > 0)
      act = "Changed text"

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
        status,
        name: url?.split("/").pop(),
        workerId: params.workerId,
        attachmentId: attachmentId,
      }
    });


    const action = await db.action.create({
      data: {
        action: act,
        userId: user?.id,
        workerId: params.workerId,
        attachmentId: attachmentId
      }
    });


    return NextResponse.json(file);
  } catch (error) {
    console.log("WORKER_ID_ATTACHMENTS", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}