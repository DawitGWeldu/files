import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const WorkerIdPage = async ({
  params
}: {
  params: { workerId: string; }
}) => {
  const worker = await db.worker.findUnique({
    where: {
      id: params.workerId,
    },
    include: {
      files: {}
    }
  });

  if (!worker) {
    return redirect("/");
  }

  return redirect(`/workers/${worker.id}/files/${worker.files[0].id}`);
}
 
export default WorkerIdPage;