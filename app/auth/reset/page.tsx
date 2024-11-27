import { ResetForm } from "@/components/auth/reset-form";
import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link  from "next/link";

const ResetPage = () => {
  return ( 
    <div className="container flex h-screen w-screen flex-col items-center justify-center">

        <ResetForm />
        
      </div>
  );
}
 
export default ResetPage;