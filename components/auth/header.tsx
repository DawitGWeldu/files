import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { Icons } from "../icons";
import { buttonVariants } from "../ui/button";
import { CardHeader } from "../ui/card";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string,
  action: string,
};

export const Header = ({
  label,
  action,
}: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.logo className="mx-auto h-6 w-6" />
          <h1 className="text-2xl font-semibold tracking-tight">
            {label}
          </h1>
          <p className="text-sm text-muted-foreground">
            {action}
          </p>
        </div>
        </div>
    </div>
  );
};
