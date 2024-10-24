import { Worker, File } from "@prisma/client"
import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { CourseProgress } from "@/components/course-progress";

import { CourseSidebarItem } from "./worker-sidebar-item";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { BadgeCheck, ChevronRight, LockKeyhole } from "lucide-react";

interface WorkerSidebarProps {
  worker: Worker & {
    files: File[]
  };
  progressCount: number;
};

export const WorkerSidebar = async ({
  worker,
  progressCount,
}: WorkerSidebarProps) => {

  const user = await currentUser();

  if (!user?.id) {
    return redirect("/");
  }

  // const purchase: Purchase|null = await db.purchase.findUnique({
  //   where: {
  //     userId_courseId: {
  //       userId: user.id,
  //       courseId: course.id,
  //     }
  //   }
  // });

  return (
    <>
      <div className="py-4 flex flex-col">
        <h1 className="font-semibold">
          {worker.name.length > 25 ? (
            `${worker.name.substring(0, 25)}...`
          ): (
            worker.name
          )}
        </h1>
        {/* {!purchase && (
          <div className="mt-2">
            <CourseProgress
              variant="success"
              value={progressCount}
            />
          </div>
        )} */}
      </div>
     

      <nav className="grid items-start gap-2 w-full">
        {worker.files.map((item, index) => {
          const href = `/workers/${item.workerId}/chapters/${item.id}`;
          return (
            href && (
              <>
              <Link key={index} href={href}>
                <span
                  className={cn(
                    "group h-10 rounded-md flex items-center px-3 py-2 text-sm font-medium bg-accent/50 hover:bg-accent hover:text-accent-foreground",
                    !!item.status && "text-emerald-700 hover:text-emerald-700"
                  )}
                >
                  {/* {!item.isFree && !purchase ? (
                    <LockKeyhole className="mr-2 h-4 w-4" />
                  ) : !!item.userProgress?.[0]?.isCompleted ? (
                      <BadgeCheck className="mr-2 h-4 w-4" />
                    ) : (
                      <ChevronRight className="mr-2 h-4 w-4" />
                    )} */}
                  
                  <span>{item.name}</span>
                </span>
              </Link>
              
              </>
            )
          )
        })}
      </nav>
    </>
  )
}