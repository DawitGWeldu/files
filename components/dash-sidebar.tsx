import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { dashboardConfig } from "@/config/dashboard"
import { Calendar, ChevronDown, Home, Inbox, LogOut, Search, Settings } from "lucide-react"
import { Collapsible } from "./ui/collapsible"
import { currentUser } from "@/lib/auth"
import { notFound } from "next/navigation"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"



const items = [
    {
        title: "Home",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "Workers",
        url: "/workers",
        icon: Inbox,
    },
    {
        title: "Settings",
        url: "/settings",
        icon: Settings,
    },
    {
        title: "Sign out",
        url: "#",
        icon: LogOut,
    },
]

export async function DashSidebar() {

    const user = await currentUser();
    if (!user) {
        return notFound();
    }
    return (
        <Sidebar collapsible="icon" className="shadow-sm group-data-[collapsible=icon]:w-16">
            <SidebarHeader className="flex items-center pt-4 group-data-[collapsible=icon]:text-transparent overflow-hidden">
                <span className="text-lg font-bold text-nowrap">
                    Welcome, {user?.name}
                </span>
            </SidebarHeader>
            <SidebarContent className="mt-4">
                
                    <SidebarGroup>
                        {/* <SidebarGroupLabel>Group</SidebarGroupLabel> */}
                        <SidebarGroupContent>
                            <SidebarMenu className="p-2 group-data-[collapsible=icon]:p-2">
                                {items.map((item) => (
                                    <span className="">
                                        <SidebarMenuItem key={item.title} className="h-8 group-data-[collapsible=icon]:h-8" >
                                            <SidebarMenuButton asChild >
                                                <a href={item.url} >
                                                    <item.icon />
                                                    <span>{item.title}</span>
                                                </a>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    </span>

                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>

            </SidebarContent>
        </Sidebar>
    )
}