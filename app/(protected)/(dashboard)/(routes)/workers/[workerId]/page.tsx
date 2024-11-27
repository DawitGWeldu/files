"use server"
import { db } from "@/lib/db";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { Actions } from "./_components/actions";
import { currentUser } from "@/lib/auth";
import { RequirementContainer } from "./_components/requirement-container";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


const WorkerIdPage = async ({
    params
}: {
    params: { workerId: string }
}) => {

    const user = await currentUser();
    if (!user?.id) {
        return redirect("/");
    }
    const worker = await db.worker.findUnique({
        where: {
            id: params.workerId,
        },
        include: {
            files: true,
            arab: true
        },
    });

    // const categories = await db.category.findMany({
    //     orderBy: {
    //         name: "asc",
    //     },
    // });

    if (!worker) {
        return redirect("/");
    }


    const requirements = await db.requirement.findMany({
        include: {
            attachments: {
                include: {
                    files: {
                        where: {
                            workerId: worker.id
                        }
                    },
                    actions: {
                        where: {
                            workerId: worker.id
                        },
                        include: {
                            user: true
                        },
                        orderBy: {
                            createdAt: 'desc'
                        }
                    }
                },
                orderBy: {
                    position: 'asc'
                }
            },
            notes: {
                where: {
                    workerId: worker.id
                }
            }
        },
    });

    // console.log("Reqs: ", requirements.attachments)
    let totalFields
    let requiredFields
    let completedFields
    try {
        const reqF = await db.attachment.findMany({
            include: {
                files: {
                    where: {
                        workerId: worker.id
                    }
                }
            }
        });
        totalFields = reqF.length
        requiredFields = reqF
        completedFields = reqF.filter(att => att.files[0]?.attachmentId == att.id).length
        console.log(completedFields)
    } catch (error) {
        console.log(error)
    }



    const completionText = `${completedFields} of ${totalFields} fields completed`

    const isComplete = requiredFields?.every(Boolean);

    return (
        <>
            {!worker.isComplete && (
                <Alert>
                    <InfoIcon className="h-4 w-4" />
                    <AlertTitle>Please complete all required fields!</AlertTitle>
                    <AlertDescription>
                        {completionText}
                    </AlertDescription>
                </Alert>
            )}
            <div className="pt-6">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-y-2">
                        <h1 className="text-2xl font-medium">
                            Edit Worker
                        </h1>
                        <span className="text-sm text-muted-foreground">
                            Name: <span className="text-md text-foreground">{worker.name}</span>
                        </span>
                        <span className="text-sm text-muted-foreground">
                            Country: <span className="text-md text-foreground">{worker.country}</span>
                        </span>
                        <span className="text-sm text-muted-foreground">
                            Arab&apos;s name: <span className="text-md text-foreground">{worker.arab?.name}</span>
                        </span>
                    </div>
                    <Actions
                        disabled={!isComplete}
                        courseId={params.workerId}
                        isPublished={worker.isComplete}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {requirements.map((requirement, index) => (
                        <RequirementContainer key={index} initialData={requirement} workerId={worker.id} />
                    ))}

                </div>
            </div>
        </>
    );
}

export default WorkerIdPage;