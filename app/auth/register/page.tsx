import { RegisterForm } from "@/components/auth/register-form";
import { BeatLoader } from "react-spinners";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";

const RegisterPage = () => {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;