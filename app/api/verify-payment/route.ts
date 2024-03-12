import { db } from "@/lib/db";
import { ChapaTransaction, Course } from "@prisma/client"
import { NextRequest } from "next/server";

export async function GET(
    req: NextRequest) {
    const searchParams  = req.nextUrl.searchParams;
    const status = searchParams.get("status");
    console.log("[CALLBACK RAN]: [TRANSACTION STATUS]: ", status)

    let tx_ref: string = "";
    if (status == "success") {

        tx_ref = searchParams.get('trx_ref')!;
        try {
            const transaction = await db.chapaTransaction.findFirst({
                where: {
                    tx_ref: searchParams.get('trx_ref')!,
                    status: 'PENDING'
                }
            })
            // console.log(JSON.stringify(transaction))

            await db.purchase.create({
                data: {
                    courseId: transaction!.courseId,
                    userId: transaction!.userId,
                }
            });
            console.log("[CALLBACK RAN]: Success")

            return Response.json({ status: "Transaction Success" });
        } catch (error) {
            throw new Error("Transaction Data not found")
        }

    }
    console.log("[CALLBACK RAN]: Error")
    return Response.json({ status: "Transaction Not Success" });
}