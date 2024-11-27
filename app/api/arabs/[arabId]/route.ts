import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { NextResponse } from "next/server"


export async function DELETE(
  req: Request,
  { params }: { params: { arabId: string } }
) {
  try {
    const user = await currentUser();

    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const arab = await db.arab.findUnique({
      where: {
        id: params.arabId,
      }
    });

    if (!arab) {
      return new NextResponse("Not found", { status: 404 });
    }

    // for (const file of worker.files) {
    //   if (file.muxData?.assetId) {
    //     await video.assets.delete(chapter.muxData.assetId);
    //   }
    // }

    const deletedArab = await db.arab.delete({
      where: {
        id: params.arabId,
      },
    });

    return NextResponse.json(deletedArab);
  } catch (error) {
    console.log("[ARAB_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}




export async function PATCH(
  req: Request,
  { params }: { params: { workerId: string } }
) {
  try {
    const user = await currentUser();
    const { workerId } = params;
    const values = await req.json();

    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const worker = await db.worker.update({
      where: {
        id: workerId,
        userId: user.id
      },
      data: {
        ...values,
      }
    });

    return NextResponse.json(worker);
  } catch (error) {
    console.log("[COURSE_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}