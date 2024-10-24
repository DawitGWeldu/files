"use client"
import { File, Worker } from "@prisma/client"
import { WorkerMobileSidebar } from "./worker-mobile-sidebar";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { LucideChevronsRightLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

interface WorkerNavbarProps {
  worker: Worker & {
    files: (File)[];
  };
  progressCount: number;
};

export const WorkerNavbar = ({
  worker,
  progressCount,
}: WorkerNavbarProps) => {
  const pathname = usePathname();
  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses");
  const isSearchPage = pathname === "/search";
  const { data: session } = useSession();
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <Icons.logo />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <WorkerMobileSidebar
        worker={worker}
        progressCount={progressCount}
      />
      <div className="flex gap-x-2 ml-auto">
        {isTeacherPage || isCoursePage ? (
          <Link href="/">
            <Button size="sm" variant="ghost">
              <LucideChevronsRightLeft className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : (session?.user.role == "USER") ? (
          <Link href="/workers">
            <Button size="sm" variant="ghost">
              Teacher mode
            </Button>
          </Link>
        ) : null}
       
      </div>     
    </div>
  )
}