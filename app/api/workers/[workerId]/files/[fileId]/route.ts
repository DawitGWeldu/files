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

    const action = await db.action.create({
      data: {
        action: 'Deleted a file',
        userId: user?.id,
        workerId: params.workerId,
        attachmentId: file?.attachmentId
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
    const { fileId } = params;
    const values = await req.json();

    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    // console.log("{{{{{}}}}}}}: ", values)
    if (fileId !== 'undefined') {
      const file = await db.file.update({
        where: {
          id: fileId,
        },
        data: {
          ...values,
        }
      });

      const action = await db.action.create({
        data: {
          action: 'Changed a file',
          userId: user?.id,
          workerId: params.workerId,
          attachmentId: values?.attachmentId
        }
      });
      return NextResponse.json(file);

    } else {

      const file = await db.file.create({
        data: {
          ...values
        }
      });

      let act = "Made changes"
      if (file.url)
        act = "Uploaded a file"
      if (file.name)
        act = "Uploaded a file"
      if (file.status)
        act = "Changed a status"
      if (file.text)
        act = "Changed text"

      const action = await db.action.create({
        data: {
          action: act,
          userId: user?.id,
          workerId: params.workerId,
          attachmentId: values?.attachmentId
        }
      });

      return NextResponse.json(file);
    }


  } catch (error) {
    console.log("[FILE_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}