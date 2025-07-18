import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { NextResponse } from "next/server"


export async function DELETE(
  req: Request,
  { params }: { params: { workerId: string } }
) {
  try {
    const user = await currentUser();

    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const worker = await db.worker.findUnique({
      where: {
        id: params.workerId,
        userId: user.id,
      },
      include: {
        files: {
          include: {
            attachment: true,
          }
        }
      }
    });

    if (!worker) {
      return new NextResponse("Not found", { status: 404 });
    }

    // for (const file of worker.files) {
    //   if (file.muxData?.assetId) {
    //     await video.assets.delete(chapter.muxData.assetId);
    //   }
    // }

    const deletedworker = await db.worker.delete({
      where: {
        id: params.workerId,
      },
    });

    return NextResponse.json(deletedworker);
  } catch (error) {
    console.log("[COURSE_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}




export async function PATCH(
  req: Request,
  { params }: { params: { brokerId: string } }
) {
  try {
    const user = await currentUser();
    // const { brokerId } = params;
    const {isActive, idd} = await req.json();

    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    
    const date = (isActive? null: new Date())
    console.log("DATE: ", date)
    const broker = await db.user.update({
      where: {
        phoneNumber: idd
      },
      data: { phoneNumberVerified: date }
    });

    return NextResponse.json(broker);
  } catch (error) {
    console.log("[BROKER_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}