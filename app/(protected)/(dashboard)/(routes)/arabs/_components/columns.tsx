"use client"

import { Arab, Country, User, Worker } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Delete, MoreHorizontal, Pencil, Trash } from "lucide-react"
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import axios from "axios";
import toast from "react-hot-toast";
import router from "next/router";

type arabWithCountry = Arab & {
  country: Country
}

const onDelete = async (arabId: string) => {
  try {

    await axios.delete(`/api/arabs/${arabId}`);

    toast.success("Worker deleted");
  } catch(er) {
    console.log(er)
    toast.error("Something went wrong");
  }
}

export const columns: ColumnDef<arabWithCountry>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Arab&apos;s Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "country",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Country
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const cou: Country = row.getValue("country");
      // const dt = dateReg.
      //@ts-ignore
      // const dt = new Date(dateReg).toLocaleString('en-us', { year: "numeric", month: "short", day: "numeric" })

      return (
        <span>
          {cou.name}
        </span>
      )
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { id } = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-4 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <ConfirmModal message="Caution! If you procede, all workers registered under this Arab will also be deleted!" onConfirm={() => onDelete(id)}>

            <DropdownMenuContent align="end">
              <Button>
                <DropdownMenuItem>
                  <Trash className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </Button>
            </DropdownMenuContent>
          </ConfirmModal>

        </DropdownMenu>
      )
    }
  }
]
