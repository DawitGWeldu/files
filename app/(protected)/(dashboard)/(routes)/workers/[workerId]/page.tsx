import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { CircleDollarSign, File, LayoutDashboardIcon, ListChecks, Terminal, InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { ImageForm } from "./_components/image-form";
import { Banner } from "@/components/banner";
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
            userId: user.id
        },
        include: {
            files: {}
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
                    }
                }
            }
        },
    });

    // console.log("Reqs: ", requirements.attachments)

    const requiredFields = [
        worker.name,
        worker.phoneNumber,
        // worker.chapters.some(chapter => chapter.isPublished),
    ];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;

    const completionText = `${completedFields} of ${totalFields} fields completed`

    const isComplete = requiredFields.every(Boolean);

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
            <div className="p-6">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-y-2">
                        <h1 className="text-2xl font-medium">
                            Edit Worker
                        </h1>
                        <span className="text-sm text-muted-foreground">
                            Edit {worker.name}&apos;s information and documents  
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
                        <RequirementContainer key={index} initialData={requirement} workerId={requirement.id} />
                    ))}
                   
                </div>
            </div>
        </>
    );
}

export default WorkerIdPage;