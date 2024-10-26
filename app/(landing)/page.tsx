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
import React from "react";
import { BeatLoader } from "react-spinners";

export default function Home() {
  return (


    <BeatLoader />

  )
}

