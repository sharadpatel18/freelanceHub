import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function ClientsTable() {
  const clients = [
    {
      name: "TechCorp Solutions",
      email: "contact@techcorp.com",
      projects: 3,
      totalEarnings: "$8,500",
      status: "Active",
      avatar: "TC",
    },
    {
      name: "StartupXYZ",
      email: "hello@startupxyz.com",
      projects: 2,
      totalEarnings: "$3,200",
      status: "Active",
      avatar: "SX",
    },
    {
      name: "Creative Agency",
      email: "team@creative.agency",
      projects: 1,
      totalEarnings: "$2,800",
      status: "Completed",
      avatar: "CA",
    },
    {
      name: "DataFlow Inc",
      email: "projects@dataflow.com",
      projects: 1,
      totalEarnings: "$1,500",
      status: "Active",
      avatar: "DF",
    },
  ]

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Top Clients</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {clients.map((client) => (
            <div key={client.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback>{client.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-foreground">{client.name}</p>
                  <p className="text-sm text-muted-foreground">{client.email}</p>
                </div>
              </div>
              <div className="text-right space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-foreground">{client.totalEarnings}</span>
                  <Badge variant={client.status === "Active" ? "default" : "secondary"}>{client.status}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{client.projects} projects</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
