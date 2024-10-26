"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/ui/card";
import { Header } from "@/components/auth/header";
import { Social } from "@/components/auth/social";
import Link from "next/link";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  headerAction: string,
  footerLabel?: string,
  footerHref?: string,
  showSocial?: boolean;
};

export const CardWrapper = ({
  children,
  headerLabel,
  headerAction,
  footerLabel,
  footerHref,
  showSocial
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] ">
      <CardHeader>
        <Header label={headerLabel} action={headerAction} />
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      {footerLabel && (
        <CardFooter className="flex justify-center">
          <p className="px-8 text-center text-sm text-muted-foreground">
            <a
              href={footerHref}
              className="hover:text-brand underline underline-offset-4"
            >
              {footerLabel}
            </a>
          </p>
        </CardFooter>
      )}
    </Card>
  );
};
