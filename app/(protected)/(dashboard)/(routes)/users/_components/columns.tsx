"use client"

import { Worker } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react"
import Link from "next/link";
import * as z from "zod";


import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { db } from "@/lib/db";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import axios from "axios";
import { Fragment } from "react";

export const columns: ColumnDef<Worker>[] = [

  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "phoneNumber",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Phone number
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "phoneNumberVerified",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Account Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const isActive = (row.getValue("phoneNumberVerified") ? true : false);
      const idd = row.getValue("phoneNumber");
      const onSubmit = async () => {
        try {

          await axios.patch(`/api/brokers/${idd}`, {isActive, idd});
          toast.success(`Updated`);
          window.location.reload()
        } catch {
          toast.error("Something went wrong");
        }
      }
      return (
        <span className='flex flex-row gap-2 items-center '>
          <Badge className={cn(
            "bg-slate-500",
            isActive && "bg-green-700"
          )}>
            {isActive ? "Active" : "Inactive"}
          </Badge>

          <Switch
            checked={isActive}
            onCheckedChange={onSubmit}
          />

        </span>

      )
    }
  },
  {
    accessorKey: "Workers",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Workers registered
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const totalWorkers: Worker[] = row.getValue('Workers')

      return (
        <Badge className={cn(
          "bg-slate-500",
          totalWorkers.length > 0 && "bg-green-700"
        )}>
          {/* {totalWorkers! >= 0 ? totalWorkers : 0} */}
          {totalWorkers.length}
        </Badge>
      )
    }
  }
]
