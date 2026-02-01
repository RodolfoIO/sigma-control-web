import { Calendar, Home, Inbox } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router"
import { UserAvatar } from "./UserAvatar"
import type { User } from "@/interfaces/user.interface"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Clientes",
    url: "/clientes",
    icon: Inbox,
  },
  {
    title: "Citas",
    url: "/citas",
    icon: Calendar,
  },
]

export const AdminSidebar = () => {
  const user:Partial<User>= {
    nombres: "Fredy",
    apellidos: "Castillo",
    correo: "sigmainternet.info@gmail.com",
    avatar: "/FREDY-CASTILLO.jpeg"
  }
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex h-18 items-center justify-center border-b border-gray-200">

        <h1 className="text-2xl">Sigma Internet</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <UserAvatar user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}