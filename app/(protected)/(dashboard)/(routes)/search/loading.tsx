import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { CardSkeleton } from "@/components/card-skeleton"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardSettingsLoading() {
  return (
    <DashboardShell>
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-1/5 rounded-lg" />
        <Skeleton className="h-10 w-1/5 rounded-lg" />
        <Skeleton className="h-10 w-1/5 rounded-lg" />
        <Skeleton className="h-10 w-1/5 rounded-lg" />
      </div>

      <div className="flex items-center gap-4 justify-between">
        <Card className="w-full">
          <CardContent className="pt-4">
            <Skeleton className="h-20 w-full" />
          </CardContent>
          <CardFooter>
            <div className="grid gap-4 w-full">
              <Skeleton className="h-4 w-full" />
              {/* <Skeleton className="h-2 w-[120px]" /> */}
              <div className="flex items-center gap-4">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-4 w-full" />
              </div>
            </div>
          </CardFooter>
        </Card>

        <Card className="w-full">
          <CardContent className="pt-4">
            <Skeleton className="h-20 w-full" />
          </CardContent>
          <CardFooter>
            <div className="grid gap-4 w-full">
              <Skeleton className="h-4 w-full" />
              {/* <Skeleton className="h-2 w-[120px]" /> */}
              <div className="flex items-center gap-4">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-4 w-full" />
              </div>
            </div>
          </CardFooter>
        </Card>


        <Card className="w-full">
          <CardContent className="pt-4">
            <Skeleton className="h-20 w-full" />
          </CardContent>
          <CardFooter>
            <div className="grid gap-4 w-full">
              <Skeleton className="h-4 w-full" />
              {/* <Skeleton className="h-2 w-[120px]" /> */}
              <div className="flex items-center gap-4">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-4 w-full" />
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </DashboardShell>
  )
}
