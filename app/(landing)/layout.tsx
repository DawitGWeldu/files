"use client"
import Link from "next/link"
import { marketingConfig } from "@/config/marketing"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import { ModeToggle } from "@/components/mode-toggle"
import { LoginButton } from "@/components/auth/login-button"
import { currentUser } from "@/lib/auth"
import { UserAccountNav } from "@/components/user-account-nav"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  const [user, setUser] = useState(null as any)
  useEffect(() => {
    async () => {
      const user = await currentUser();
      setUser(user)
    }
  })

  const router = useRouter()
  useEffect(()=>{
    router.replace('/workers')
  })
  return (

    <div className="flex items-center justify-center h-screen flex-col">
      <main className="">{children}</main>
    </div>
  )
}
