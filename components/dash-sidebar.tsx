import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { dashboardConfig } from "@/config/dashboard"
import { Calendar, ChevronDown, List, Home, Inbox, LogOut, Search, Settings, PlusCircle } from "lucide-react"
import { Collapsible } from "./ui/collapsible"
import { currentUser } from "@/lib/auth"
import { notFound } from "next/navigation"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import Link from "next/link"
import { LogoutButton } from "./auth/logout-button"
import Image from 'next/image'


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
  var ratio = 16/9
  return (
    <Sidebar collapsible="icon" className="shadow-sm group-data-[collapsible=icon]:w-16">

      <SidebarHeader className="flex flex-row justify-around items-cente group-data-[collapsible=icon]:text-transparent overflow-hidden">
        <Image
          src="https://utfs.io/f/TYU8Sd1dVxYI92OV8hln8LZTilVSuK26NoQwbcYqB1jkmpPx"
          alt="ITTIHAD Logo"
          className="rounded-md"
          // set the dimension (affected by layout)
          width={200}
          height={200 / ratio}
          layout="responsive" // you can use "responsive", "fill" or the default "intrinsic"
        />
        {/* <span className="text-md font-semibold text-nowrap">
          Welcome, {user?.name}
        </span> */}
      </SidebarHeader>
      <SidebarContent className="mt-0">
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
                              <Link href={item.url} className="group-data-[collapsible=icon]:h-10" style={{ height: '2.6rem' }}>
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
                            <Link href={item.url} style={{ height: '2.6rem' }}>
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