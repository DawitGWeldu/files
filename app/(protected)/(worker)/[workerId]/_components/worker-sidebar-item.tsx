"use client";

import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

interface WorkerSidebarItemProps {
  name: string;
  id: string;
  isComplete: boolean;
  workerId: string;
  // isLocked: boolean;
};

export const CourseSidebarItem = ({
  name,
  id,
  isComplete,
  workerId,
}: WorkerSidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const Icon = isComplete ? CheckCircle : PlayCircle;
  const isActive = pathname?.includes(id);

  const onClick = () => {
    router.push(`/courses/${workerId}/chapters/${id}`);
  }

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:text-accent-foreground transition-all hover:text-slate-600 hover:bg-accent",
        isActive && "text-slate-700 bg-slate-200/20 hover:bg-slate-200/20 hover:text-slate-700",
        isComplete && "text-emerald-700 hover:text-emerald-700",
        isComplete && isActive && "bg-emerald-200/20",
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn(
            "text-slate-500",
            isActive && "text-slate-700",
            isComplete && "text-emerald-700"
          )}
        />
        {name}
        
      </div>
      <div className={cn(
        "ml-auto opacity-0 rounded-sm border-2 border-slate-700 h-full transition-all",
        isActive && "opacity-100",
        isComplete && "border-emerald-700"
      )} />
      
      
    </button>
  )
}