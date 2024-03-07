import { auth } from "@/auth";
export const isTeacher =  async () => {
  const session = await auth();
  if(session?.user?.role == "TEACHER"){
    return true;
  }
  return false;
  
}