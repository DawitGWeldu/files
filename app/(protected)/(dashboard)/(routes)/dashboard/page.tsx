import { redirect } from "next/navigation";
import { CheckCircle, Clock, Hourglass, Search } from "lucide-react";

import { getDashboardWorkers } from "@/actions/get-dashboard-workers";
import { currentUser } from "@/lib/auth";

import { InfoCard } from "./_components/info-card";
import { Input } from "@/components/ui/input";

export default async function Dashboard() {
  const user = await currentUser();

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
       <InfoCard
          icon={Hourglass}
          label="In Progress"
          subLabel="Current number of workers in progress"
          numberOfItems={workersInProgress?.length || 0}
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
