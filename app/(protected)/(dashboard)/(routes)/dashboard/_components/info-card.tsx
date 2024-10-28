import { LucideIcon } from "lucide-react";

import { IconBadge } from "@/components/icon-badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface InfoCardProps {
  numberOfItems: number;
  variant?: "default" | "success";
  label: string;
  subLabel: string;
  icon: LucideIcon;
}

export const InfoCard = ({
  variant,
  icon: Icon,
  numberOfItems,
  label,
  subLabel,
}: InfoCardProps) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex flex-row gap-2"> <Icon /> {label}</CardTitle>
          <CardDescription>{subLabel}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">{numberOfItems} </p>
          
        </CardContent>
      </Card>
    </>

  )
}