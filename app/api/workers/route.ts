import { currentUser } from "@/lib/auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
    try {
        const user = await currentUser();
        const { name, country, arab } = await req.json();

        if (!user?.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const worker = await db.worker.create({
            data: {
                userId: user.id,
                name,
                country,
                arabId: arab
            }
        });

        return NextResponse.json(worker);

    } catch (error) {
        console.log("[WORKERS]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}