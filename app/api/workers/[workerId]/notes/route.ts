import { currentUser } from "@/lib/auth";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { workerId: string } }
) {
  try {
    const user = await currentUser();
    const { note, requirementId } = await req.json();

    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    

    const notee = await db.note.create({
      data: {
        note,
        workerId: params.workerId,
        requirementId: requirementId,
      }
    });


 

    return NextResponse.json(notee);
  } catch (error) {
    console.log("WORKER_ID_NOTES", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}