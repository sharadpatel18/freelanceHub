"use client"

import { usePathname } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"

export function SiteHeader() {
  const path = usePathname();
  const { theme , setTheme} = useTheme();
  
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
       {
        theme === "dark" ? (
          <Button variant="ghost" size="icon" className="m-4" onClick={() => setTheme("light")}>
            <Sun className="h-4 w-4" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        ) : (
          <Button variant="ghost" size="icon" className="m-4" onClick={() => setTheme("dark")}>
            <Moon className="h-4 w-4" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        )
       }
      </div>
    </header>
  )
}
