"use client"

import { usePathname } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import NotificationBellComponent from "./notification-bell"

export function SiteHeader() {
  const path = usePathname();
  const { theme, setTheme } = useTheme();

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{path.replace("/", "")}</h1>
      </div>
      <div className="flex items-center gap-2">
        <NotificationBellComponent />
        <Button
          variant="ghost"
          size="icon"
          className="m-4 relative"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          <Sun className="h-4 w-4 scale-100 dark:scale-0 transition-transform" />
          <Moon className="absolute h-4 w-4 scale-0 dark:scale-100 transition-transform" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </header>
  )
}