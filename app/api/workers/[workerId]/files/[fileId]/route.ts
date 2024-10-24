import { currentUser } from "@/lib/auth";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { workerId: string, fileId: string } }
) {
  try {
    const user = await currentUser();

    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const broker = await db.worker.findUnique({
      where: {
        id: params.workerId,
        userId: user.id
      }
    });

    if (!broker) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const file = await db.file.delete({
      where: {
        workerId: params.workerId,
        id: params.fileId,
      }
    });

    return NextResponse.json(file);
  } catch (error) {
    console.log("ATTACHMENT_ID", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}



export async function PATCH(
  req: Request,
  { params }: { params: { workerId: string, fileId: string } }
) {
  try {
    const user = await currentUser();
    const { workerId, fileId } = params;
    const values = await req.json();

    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const file = await db.file.update({
      where: {
        id: fileId,
      },
      data: {
        ...values,
      }
    });

    return NextResponse.json(file);
  } catch (error) {
    console.log("[FILE_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}