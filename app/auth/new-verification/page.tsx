import { NewVerificationForm } from "@/components/auth/new-verification-form";
import { Suspense } from "react";


const NewVerificationPage = () => {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Suspense>
        <NewVerificationForm />
      </Suspense>
    </div>
  );
}

export default NewVerificationPage;