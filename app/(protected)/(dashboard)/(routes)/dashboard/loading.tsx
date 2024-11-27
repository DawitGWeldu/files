import { Card } from "@/components/ui/card"
import { CardSkeleton } from "@/components/card-skeleton"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { Loader2 } from "lucide-react"

export default function UsersLoading() {
  return (
    
      <div className="flex flex-col gap-4 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
  
  )
}
