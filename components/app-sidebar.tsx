"use client"

import {
  Briefcase,
  BarChart3,
  LayoutDashboard,
  DollarSign,
  FileText,
  HelpCircle,
  MessageCircle,
  Settings,
  User,
  Workflow,
} from "lucide-react"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { redirect } from "next/navigation"
import { NavClient } from "./nav-client"
import { useAuthStore } from "@/store/user-store"
import { useEffect, useState } from "react"


const data = {
  user: {
    name: "John Doe",
    email: "john@freelancehub.com",
    avatar: "/avatars/john-doe.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Projects",
      url: "/projects",
      icon: Briefcase,
    },
    {
      title: "Proposals",
      url: "/proposals",
      icon: FileText,
    },
    {
      title: "Messages",
      url: "/messages",
      icon: MessageCircle,
    },
    {
      title: "Earnings",
      url: "/earnings",
      icon: DollarSign,
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: BarChart3,
    },
  ],
  navSecondary: [
    {
      title: "Profile",
      url: "/profile",
      icon: User,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
    {
      title: "Help & Support",
      url: "/help",
      icon: HelpCircle,
    },
  ],
  navClient: [
    {
      title: "My Projects",
      url: "/client/my-projects",
      icon: Workflow
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { getUserFromLocalStorage } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);
  const user = getUserFromLocalStorage();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  if (!user) return null
  console.log("user", user);

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2 px-2" onClick={() => redirect("/home")}>
            <div className="p-2 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg">
              <Briefcase className="h-6 w-6 text-primary" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              FreelanceHub
            </span>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {
          user.data.role === "CLIENT" &&
          <NavClient items={data.navClient} className="" />
        }
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}

