import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";

import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { User } from "@prisma/client";

const BrokersPage = async () => {
  const user = await currentUser();

  if (!user?.id) {
    return redirect("/");
  }

  
  let brokers: any = []
  try {
    const brkrs = await db.user.findMany({
      include: {
        Workers: true
      }
    });
    brokers = brkrs
  } catch (error) {
    console.log(error)
  }

  return ( 
    <div className="p-6">
      {/* @ts-ignore */}
      <DataTable columns={columns} data={brokers} />
    </div>
   );
}
 
export default BrokersPage;