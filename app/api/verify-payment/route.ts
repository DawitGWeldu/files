import { db } from "@/lib/db";
import { ChapaTransaction, Course } from "@prisma/client"
import { NextResponse } from "next/server";

export async function GET(
    req: Request) {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    let tx_ref: string = "";
    let transaction: ChapaTransaction
    if (status == "success") {

        tx_ref = searchParams.get('trx_ref')!;
        try {
            const tr = await db.chapaTransaction.findFirst({
                where: {
                    tx_ref: searchParams.get('trx_ref')!,
                    status: 'PENDING'
                }
            })
            transaction = tr!;
            // console.log(JSON.stringify(transaction))

            await db.purchase.create({
                data: {
                    courseId: transaction.courseId,
                    userId: transaction.userId,
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