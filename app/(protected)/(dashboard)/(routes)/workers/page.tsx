import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";

import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

const WorkersPage = async () => {
  const user = await currentUser();

  if (!user?.id) {
    return redirect("/");
  }

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

  return ( 
    <div>
      <DataTable columns={columns} data={workers} />
    </div>
   );
}
 
export default WorkersPage;