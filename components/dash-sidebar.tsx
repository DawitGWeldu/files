import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { dashboardConfig } from "@/config/dashboard"
import { Calendar, ChevronDown, List, Home, Inbox, LogOut, Search, Settings, PlusCircle } from "lucide-react"
import { Collapsible } from "./ui/collapsible"
import { currentUser } from "@/lib/auth"
import { notFound } from "next/navigation"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import Link from "next/link"
import { LogoutButton } from "./auth/logout-button"



const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Register worker",
    url: "/create",
    icon: PlusCircle,
  },
  {
    title: "Workers",
    url: "/workers",
    icon: Inbox,
  },
  {
    title: "Brokers",
    url: "/brokers",
    icon: List,
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
    <Sidebar collapsible="icon"  className="shadow-sm group-data-[collapsible=icon]:w-16">
      <SidebarHeader className="flex items-center pt-4 group-data-[collapsible=icon]:text-transparent overflow-hidden">
        <span className="text-lg font-bold text-nowrap">
          Welcome, {user?.name}
        </span>
      </SidebarHeader>
      <SidebarContent className="mt-4">
        <SidebarGroup>
          {/* <SidebarGroupLabel>Group</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu className="p-2 gap-2 group-data-[collapsible=icon]:gap-2 ">
              {items.map((item) => (
                item.url == '/brokers' && user.role !== 'ADMIN' ? (
                  <></>
                ) : (
                  <>
                    {item.url == '#' ? (
                      <span key={item.title} className="">
                        <SidebarMenuItem>
                          <LogoutButton>
                            <SidebarMenuButton asChild >
                              <Link href={item.url} className="group-data-[collapsible=icon]:h-10" style={{height: '2.6rem'}}>
                                <item.icon />
                                <span>{item.title}</span>
                              </Link>
                            </SidebarMenuButton>
                          </LogoutButton>
                        </SidebarMenuItem>
                      </span>
                    ) : (
                      
                      <span key={item.title} className="">
                        <SidebarMenuItem className="" >
                            <SidebarMenuButton asChild >
                              <Link href={item.url} style={{height: '2.6rem'}}>
                                <item.icon />
                                <span>{item.title}</span>
                              </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                      </span>
                    )}
                  </>


                )
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}