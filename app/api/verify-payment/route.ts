import { db } from "@/lib/db";
import { ChapaTransaction, Course } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from "next/server";

async function OPTIONS(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Replace '*' with specific origins if needed
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Max-Age', '600');
    res.status(200).end(); 
}

export async function GET(
    req: NextApiRequest) {
    // const searchParams = req.url?.search("status");
    console.log("[CALLBACK RAN]: [QUERY PARAMS]? ", req.url)

    // let tx_ref: string = "";
    // if (status == "success") {

    //     tx_ref = searchParams.get('trx_ref')!;
    //     try {
    //         const transaction = await db.chapaTransaction.findFirst({
    //             where: {
    //                 tx_ref: searchParams.get('trx_ref')!,
    //                 status: 'PENDING'
    //             }
    //         })
    //         // console.log(JSON.stringify(transaction))

    //         await db.purchase.create({
    //             data: {
    //                 courseId: transaction!.courseId,
    //                 userId: transaction!.userId,
    //             }
    //         });
    //         console.log("[CALLBACK RAN]: Success")

    //         return Response.json({ status: "Transaction Success" });
    //     } catch (error) {
    //         throw new Error("Transaction Data not found")
    //     }

    // }
    return NextResponse.json({ "headers": req.headers, "url": req.url }, { status: 200 });
}
GET.options = OPTIONS; 