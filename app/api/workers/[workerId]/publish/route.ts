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

    // const hasPublishedChapter = course.chapters.some((chapter) => chapter.isPublished);

    // if (!course.title || !course.description || !course.imageUrl || !course.categoryId || !hasPublishedChapter) {
    //   return new NextResponse("Missing required fields", { status: 401 });
    // }

    const publishedWorker = await db.worker.update({
      where: {
        id: params.workerId,
        userId: user.id,
      },
      data: {
        isComplete: true,
      }
    });

    return NextResponse.json(publishedWorker);
  } catch (error) {
    console.log("[COURSE_ID_PUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  } 
}