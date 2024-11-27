import { Poppins } from "next/font/google";
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { BeatLoader } from "react-spinners";
import { Loader2 } from "lucide-react";

export default function Home() {
  return (

    <>
      <div className="flex flex-col gap-4 items-center">
        <Image
          src="https://utfs.io/f/TYU8Sd1dVxYI92OV8hln8LZTilVSuK26NoQwbcYqB1jkmpPx"
          alt="ITTIHAD Logo"
          className="rounded-md"
          // set the dimension (affected by layout)
          width={200}
          height={200 / (16 / 9)}
          layout="responsive" // you can use "responsive", "fill" or the default "intrinsic"
        />
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    </>

  )
}

