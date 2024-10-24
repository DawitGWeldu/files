import { MainNav } from "@/components/main-nav";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";
import { dashboardConfig } from "@/config/dashboard"
import { SiteFooter } from "@/components/site-footer";
import { UserAccountNav } from "@/components/user-account-nav";
import { DashboardNav } from "@/components/nav";
import { currentUser } from "@/lib/auth";
import { notFound } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { DashSidebar } from "@/components/dash-sidebar"
const DashboardLayout = async ({
    children
}: {
    children: React.ReactNode
}) => {

    const user = await currentUser();
    if (!user) {
        return notFound();
    }

    return (

        <>

            <SidebarProvider>



                <DashSidebar />

                <main className="flex w-full flex-1 flex-col overflow-hidden justify-between">

                    <span className="px-6 h-16 shadow-sm py-2 flex items-ceter gap-4 justify-between">
                        <span className="flex gap-6 items-center">
                            <SidebarTrigger />
                            {/* <MainNav items={dashboardConfig.mainNav} /> */}
                        </span>

                        <span className="flex gap-6 items-center">
                            <ModeToggle />

                            <UserAccountNav
                                user={{
                                    name: user.name,
                                    image: user.image,
                                    phoneNumber: user.phoneNumber,
                                }}
                            />
                        </span>


                    </span>

                    <span className="p-8">
                        {children}

                    </span>
                    <SiteFooter className="border-t" />
                </main>
            </SidebarProvider>
        </>

    );
}

export default DashboardLayout;