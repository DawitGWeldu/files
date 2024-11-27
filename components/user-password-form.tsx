"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { User } from "@prisma/client"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
// import { userNameSchema } from "@/lib/validations/user"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

interface UserPasswordFormProps extends React.HTMLAttributes<HTMLFormElement> {
  user: Pick<User, "id" | "password">
}

// type FormData = z.infer<typeof userNameSchema>

export function UserPasswordForm({ user, className, ...props }: UserPasswordFormProps) {
  const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    // resolver: zodResolver(userNameSchema),
    // defaultValues: {
    //   name: user?.name || "",
    // },
  })
  const [isSaving, setIsSaving] = React.useState<boolean>(false)

  async function onSubmit(data: FormData) {
    setIsSaving(true)

    const response = await fetch(`/api/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: data,
      }),
    })

  //   setIsSaving(false)

  //   if (!response?.ok) {
    //   return toast({
    //     title: "Something went wrong.",
    //     description: "Your name was not updated. Please try again.",
    //     variant: "destructive",
    //   })
    // }

    // toast({
    //   description: "Your name has been updated.",
    // })

    router.refresh()

  
  }
  return (

    
    <form
      className={cn(className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle>Change your password</CardTitle>
          
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            <Label htmlFor="oldPassword">
              Old Password
            </Label>
            <Input
              id="oldPassword"
              className="w-full"
              size={32}
              // {...register("name")}
            />
            {/* {errors?.name && (
              <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
            )} */}
          </div>


          <div className="grid gap-3">
            <Label htmlFor="name">
              New Password
            </Label>
            <Input
              id="name"
              className="w-full"
              size={32}
              // {...register("name")}
            />
            {/* {errors?.name && (
              <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
            )} */}
          </div>


          <div className="grid gap-3">
            <Label htmlFor="name mt-1">
              Confirm new Password
            </Label>
            <Input
              id="name"
              className="w-full"
              size={32}
              // {...register("name")}
            />
            {/* {errors?.name && (
              <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
            )} */}
          </div>
        </CardContent>
        <CardFooter>
          <button
            type="submit"
            className={cn(buttonVariants(), className)}
            disabled={isSaving}
          >
            {isSaving && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>Save</span>
          </button>
        </CardFooter>
      </Card>
    </form>
  )
}