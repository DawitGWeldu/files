import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";

import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

const ArabsPage = async () => {
  const user = await currentUser();

  if (!user?.id) {
    return redirect("/");
  }

  const arabs = await db.arab.findMany({
    include: {
      country: true
    }
  });

  return ( 
    <div>
      <DataTable columns={columns} data={arabs} />
    </div>
   );
}
 
export default ArabsPage;