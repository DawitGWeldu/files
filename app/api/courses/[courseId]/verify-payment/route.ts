import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { courseId: string; chapterId: string } }
) {

    console.log("[Callback_executed]", );

    return NextResponse.json({ "Hello": "hello" });

    // return new NextResponse("Internal Error", { status: 500 });

}