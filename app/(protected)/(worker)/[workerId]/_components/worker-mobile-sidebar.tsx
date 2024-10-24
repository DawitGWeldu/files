import { Menu } from "lucide-react";
import { File, Worker } from "@prisma/client";

import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";

import { WorkerSidebar } from "./worker-sidebar";

interface WorkerMobileSidebarProps {
  worker: Worker & {
    files: File[];
  };
  progressCount: number;
};

export const WorkerMobileSidebar = ({ 
  worker,
  progressCount,
}: WorkerMobileSidebarProps) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white w-72">
        <WorkerSidebar
          worker={worker}
          progressCount={progressCount}
        />
      </SheetContent>
    </Sheet>
  )
}