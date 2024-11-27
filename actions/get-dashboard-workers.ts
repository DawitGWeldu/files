import { Worker } from "@prisma/client";

import { db } from "@/lib/db";


type DashboardWorkers = {
  completedWorkers: Worker[];
  workersInProgress: Worker[];
}

export const getDashboardWorkers = async (userId: string, role: string): Promise<DashboardWorkers> => {
  try {
    var registeredWorkers
    if (role == 'ADMIN') {
      const regWorkers = await db.worker.findMany();
      registeredWorkers = regWorkers
    } else {
      const regWorkers = await db.worker.findMany({
        // where: {
        //   userId: userId,
        // }
      });
      registeredWorkers = regWorkers
    }


    const completedWorkers = registeredWorkers.filter((worker) => worker.isComplete);
    const workersInProgress = registeredWorkers.filter((worker) => !worker.isComplete);

    return {
      completedWorkers,
      workersInProgress,
    }
  } catch (error) {
    console.log("[GET_DASHBOARD_WORKERS]", error);
    return {
      completedWorkers: [],
      workersInProgress: [],
    }
  }
}