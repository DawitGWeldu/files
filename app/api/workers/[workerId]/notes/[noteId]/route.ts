import { currentUser } from "@/lib/auth";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { workerId: string, noteId: string } }
) {
  
    return NextResponse.json("Deleted");
}



export async function PATCH(
  req: Request,
  { params }: { params: { workerId: string } }
) {
  try {
    const user = await currentUser();
    const values = await req.json();

    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const exNote = await db.note.findFirst({
      where: {
        requirementId: values?.requirementId
      }
    })
    // console.log("{{{{{}}}}}}}: ", values)
    if (exNote) {
      const note = await db.note.update({
        where: {
          id: exNote.id,
        },
        data: {
          ...values,
        }
      });

      
      return NextResponse.json(note);

    } else {

      const note = await db.note.create({
        data: {
          ...values
        }
      });

     

      return NextResponse.json(note);
    }


  } catch (error) {
    console.log("[NOTE_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}