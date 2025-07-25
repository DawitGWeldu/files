import { currentUser } from "@/lib/auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
    try {
        const user = await currentUser();
        const { name } = await req.json();

        if (!user?.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const arab = await db.arab.create({
            data: {
                name
            }
        });

        return NextResponse.json(arab);

    } catch (error) {
        console.log("[ARABS]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const user = await currentUser();

        if (!user?.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const arab = await db.arab.findMany();

        return NextResponse.json(arab);

    } catch (error) {
        console.log("[ARABS]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}