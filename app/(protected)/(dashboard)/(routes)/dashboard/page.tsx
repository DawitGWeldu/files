import { redirect } from "next/navigation";
import { CheckCircle, Clock } from "lucide-react";

import { getDashboardWorkers } from "@/actions/get-dashboard-workers";
import { currentUser } from "@/lib/auth";

import { InfoCard } from "./_components/info-card";

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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
       <InfoCard
          icon={Clock}
          label="In Progress"
          numberOfItems={workersInProgress?.length || 0}
       />
       <InfoCard
          icon={CheckCircle}
          label="Completed"
          numberOfItems={completedWorkers?.length || 0}
          variant="success"
       />
      </div>
    </div>
  )
}
