import { currentUser } from "@/lib/auth";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function PATCH(
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
    });

    if (!worker) {
      return new NextResponse("Not found", { status: 404 });
    }

    const unpublishedCourse = await db.worker.update({
      where: {
        id: params.workerId,
        userId: user.id,
      },
      data: {
        isComplete: false,
      }
    });

    return NextResponse.json(unpublishedCourse);
  } catch (error) {
    console.log("[WORKER_ID_UNPUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  } 
}