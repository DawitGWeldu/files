import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { sendNotificationSms } from '@/lib/sms'; // Your SMS logic
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    try {
        const today = new Date();
        const fiveDaysFromNow = new Date(today.setDate(today.getDate() + 5))
        fiveDaysFromNow.setHours(0, 0, 0, 0);
        const endOfDay = new Date(fiveDaysFromNow);
        endOfDay.setHours(23, 59, 59, 999);

        const attachement = await prisma.attachment.findFirst({
            where: {
                name: "Flight Date & Time",
            },
        });

        const files = await prisma.file.findMany({
            where: {
                attachmentId: attachement?.id,
                dateTime: {
                    lte: endOfDay,
                },
            },
            include: {
                worker: true
            }
        });
        if (!files || files.length == 0) {
            return NextResponse.json({ message: "No workers" }, { status: 404 });

        }
        console.log("FILES: ", files)
        interface workers {
            workerId: string,
            workerName: string,
            departureDate: Date | null
        }
        var workers: workers[] = []

        files.forEach((file) => {
            workers.push({ workerId: file.workerId, workerName: file.worker.name, departureDate: file.dateTime })
        })
        await sendNotificationSms(workers)
        return NextResponse.json({ message: "Success" }, { status: 200 });
    } catch (error) {
        console.error('Error sending SMS:', error);
        return new NextResponse("Failed to send SMS notifications", { status: 500 });

    }
}
