import { redirect } from "next/navigation"
import { currentUser } from "@/lib/auth"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { UserNameForm } from "@/components/user-name-form"
import { UserPasswordForm } from "@/components/user-password-form"

export const metadata = {
  title: "Settings",
  description: "Manage account and website settings.",
}

export default async function SettingsPage() {
  const user = await currentUser()

  if (!user) {
    redirect( "/login")
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Manage account and website settings."
      />
      <div className="grid grid-cols-2 gap-10">
        <UserNameForm user={{ id: user.id!, name: user.name || "" }} />
        <UserPasswordForm user={{ id: user.id!, password: user.name || "" }} />
      </div>
    </DashboardShell>
  )
}
