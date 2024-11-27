import { NewPasswordForm } from "@/components/auth/new-password-form";
import { Suspense } from "react";

const NewPasswordPage = () => {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Suspense>
        <NewPasswordForm />
      </Suspense>

    </div>
  );
}

export default NewPasswordPage;