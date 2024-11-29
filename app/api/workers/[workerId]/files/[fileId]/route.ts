import { currentUser } from "@/lib/auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { unlink } from "fs/promises";
import { join } from "path";



export async function DELETE(
  req: Request,
  { params }: { params: { workerId: string, fileId: string } }
) {
  try {
    const user = await currentUser();

    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const file = await db.file.delete({
      where: {
        workerId: params.workerId,
        id: params.fileId,
      }
    });

    // Implement file delete operation here, after checking if file has a non empty url or name property 

    if (file?.url) {
      // Resolve the file path on the server
      const filePath = join(process.cwd(), "public", file.url);

      try {
        // Delete the file from the server
        await unlink(filePath);
      } catch (fsError) {
        console.error("File deletion error:", fsError);
        return new NextResponse("Failed to delete file from server", {
          status: 500,
        });
      }
    }

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