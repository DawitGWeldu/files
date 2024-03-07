import {Chapa} from "chapa-nodejs";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Chapa-Signature") as string;
  // if(!signature){
  //   return new NextResponse(`Signature not found`, { status: 400 })
  // }
  var sha256 = require('hash.js/lib/hash/sha/256');
  const webhookSecret = process.env.CHAPA_ENCRYPTION_KEY;
  sha256(webhookSecret).update('abc').digest('hex');
  console.log("[WEEEEEBBBBBBHOOOOOKKKKK]: "+sha256+" && "+ signature);

  

  // let event: Stripe.Event;
  

  // try {
  //   event = stripe.webhooks.constructEvent(
  //     body,
  //     signature,
  //     process.env.STRIPE_WEBHOOK_SECRET!
  //   )
  // } catch (error: any) {
  //   return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
  // }

  // const session = event.data.object as Stripe.Checkout.Session;
  // const userId = session?.metadata?.userId;
  // const courseId = session?.metadata?.courseId;

  // if (event.type === "checkout.session.completed") {
  //   if (!userId || !courseId) {
  //     return new NextResponse(`Webhook Error: Missing metadata`, { status: 400 });
  //   }

  //   await db.purchase.create({
  //     data: {
  //       courseId: courseId,
  //       userId: userId,
  //     }
  //   });
  // } else {
  //   return new NextResponse(`Webhook Error: Unhandled event type ${event.type}`, { status: 200 })
  // }

  return new NextResponse(null, { status: 200 });
}