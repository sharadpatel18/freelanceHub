import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Search, Settings } from "lucide-react"

export function DashboardHeader() {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-foreground">FreelanceHub</h1>
            <nav className="hidden md:flex items-center space-x-6 text-sm">
              <a href="/" className="text-primary font-medium">
                Overview
              </a>
              <a href="/" className="text-muted-foreground hover:text-foreground">
                Projects
              </a>
              <a href="/" className="text-muted-foreground hover:text-foreground">
                Clients
              </a>
              <a href="/" className="text-muted-foreground hover:text-foreground">
                Invoices
              </a>
              <a href="/" className="text-muted-foreground hover:text-foreground">
                Analytics
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
            <Avatar>
              <AvatarImage src="/professional-freelancer-avatar.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  )
}
