import { redirect } from "next/navigation";
import { CheckCircle, Clock, Hourglass, Search } from "lucide-react";

import { getDashboardWorkers } from "@/actions/get-dashboard-workers";
import { currentUser } from "@/lib/auth";

import { InfoCard } from "./_components/info-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";

import { ArabsDataTable } from "./_components/arabs-data-table";
import { arabsColumns } from "./_components/arabs-columns";
import { WorkersDataTable } from "./_components/workers-data-table";
import { workersColumns } from "./_components/workers-columns";

export default async function Dashboard() {
  const user = await currentUser();
  const arabs = await db.arab.findMany({
    take: 5
  });
  const workers = await db.worker.findMany({
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
  });


  if (!user?.id) {
    return redirect("/");
  }

  const {
    completedWorkers,
    workersInProgress
  } = await getDashboardWorkers(user.id, user.role);

  return (
    <div className="p-6 space-y-4">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold">Welcome back, {user?.name}</h2>

      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex flex-row gap-2"> Arabs </CardTitle>
            <CardDescription>Here you can find and manage recently added Arabs</CardDescription>
          </CardHeader>
          <CardContent>
            <ArabsDataTable columns={arabsColumns} data={arabs} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex flex-row gap-2"> Workers </CardTitle>
            <CardDescription>Here you can find and manage all registered Workers</CardDescription>
          </CardHeader>
          <CardContent>
            <WorkersDataTable columns={workersColumns} data={workers} />
          </CardContent>
        </Card>


        <InfoCard
          icon={Hourglass}
          label="Total"
          subLabel="Total number of workers registered"
          numberOfItems={workersInProgress?.length + completedWorkers?.length || 0}
        />
        <InfoCard
          icon={CheckCircle}
          label="Completed"
          subLabel="Number of workers with complete documents"
          numberOfItems={completedWorkers?.length || 0}
          variant="success"
        />
      </div>
    </div>
  )
}
