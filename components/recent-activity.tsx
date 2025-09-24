import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function RecentActivity() {
  const activities = [
    {
      type: "payment",
      message: "Payment received from TechCorp",
      amount: "$2,500",
      time: "2 hours ago",
      avatar: "TC",
    },
    {
      type: "project",
      message: "Project milestone completed",
      amount: null,
      time: "4 hours ago",
      avatar: "P",
    },
    {
      type: "client",
      message: "New client inquiry received",
      amount: null,
      time: "6 hours ago",
      avatar: "C",
    },
    {
      type: "invoice",
      message: "Invoice sent to StartupXYZ",
      amount: "$1,800",
      time: "1 day ago",
      avatar: "SX",
    },
  ]

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.type} className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs">{activity.avatar}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">{activity.message}</p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
            {activity.amount && <div className="text-sm font-medium text-success">{activity.amount}</div>}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
