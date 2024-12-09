"use server";
import { db } from "@/lib/db";
import { Arab, Country, User, Worker } from "@prisma/client";

type workerWithUser = Worker & {
    user: User
}
type countryWithArabs = Country & {
    Arab: arabWithWorkers[]
}
type arabWithWorkers = Arab & {
  Workers: workerWithUser[];
};

export async function getWorkers(): Promise<workerWithUser[]> {
    try {
        const workers = await db.worker.findMany({
            // where: {
            //   userId: user.id,
            // },
            include: {
                user: true
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        // @ts-ignore
        return workers;
    } catch (error) {
        console.error("Error fetching workers:", error);
        return [];
    }
}


export async function getCountries(): Promise<countryWithArabs[]> {
    try {
      const countries = await db.country.findMany({
        include: {
          Arab: {
            include: {
              Workers: {
                include: {
                  user: true
                }
              } 
            },
          },
        },
      });
      return countries;
    } catch (error) {
      console.error("Error fetching countries:", error);
      return [];
    }
  }
  