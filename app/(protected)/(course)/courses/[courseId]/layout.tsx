import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { getProgress } from "@/actions/get-progress";

import { CourseSidebar } from "./_components/course-sidebar";
import { CourseNavbar } from "./_components/course-navbar";
import { currentUser } from "@/lib/auth";
import { ModeToggle } from "@/components/mode-toggle";
import { UserAccountNav } from "@/components/user-account-nav";
import { SiteFooter } from "@/components/site-footer";

const CourseLayout = async ({
  children,
  params
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
  const user = await currentUser();

  if (!user?.id) {
    return redirect("/")
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        include: {
          userProgress: {
            where: {
              userId: user.id,
            }
          }
        },
        orderBy: {
          position: "asc"
        }
      },
    },
  });

  if (!course) {
    return redirect("/");
  }

  const progressCount = await getProgress(user.id, course.id);
  return (


    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <CourseNavbar
            course={course}
            progressCount={progressCount}
          />
          
          <span className="flex items-ceter gap-4 justify-between">
            <ModeToggle />

            <UserAccountNav
              user={{
                name: user.name,
                image: user.image,
                phoneNumber: user.phoneNumber,
              }}
            />
          </span>
        </div>
      </header>
      <div className="container grid flex-1 gap-x-2 md:grid-cols-[250px_1fr]">
        <aside className="hidden  w-full flex-col md:flex">
          <CourseSidebar
            course={course}
            progressCount={progressCount}
          />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      <SiteFooter className="border-t" />
    </div>

  )
}

export default CourseLayout