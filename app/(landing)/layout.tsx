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

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  const user = await currentUser();

  return (

    <div className="flex bg-gradient-to-br from-transparent via-emerald-600/20  min-h-screen flex-col">
      <header className="container z-40">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav items={marketingConfig.mainNav} />
          <div className="flex items-center gap-4">
            <ModeToggle />
            {user ? (
              <UserAccountNav
                user={{
                  name: user.name,
                  image: user.image,
                  phoneNumber: user.phoneNumber,
                }}
              />
            ) : (
              <nav>
                <LoginButton key={0} mode="modal">
                  <p
                    className={cn(
                      buttonVariants({ size: "sm" }),
                      "px-4"
                    )}
                  >
                    Login
                  </p>
                </LoginButton>
              </nav>
            )}


          </div>

        </div>
      </header>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
