import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Users, Briefcase, TrendingUp } from "lucide-react"

export function StatsCards() {
  const stats = [
    {
      title: "Total Earnings",
      value: "$12,847",
      change: "+12.5%",
      icon: DollarSign,
      trend: "up",
    },
    {
      title: "Active Projects",
      value: "8",
      change: "+2",
      icon: Briefcase,
      trend: "up",
    },
    {
      title: "Total Clients",
      value: "24",
      change: "+3",
      icon: Users,
      trend: "up",
    },
    {
      title: "Monthly Growth",
      value: "23.1%",
      change: "+4.2%",
      icon: TrendingUp,
      trend: "up",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title} className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <p className="text-xs text-success">{stat.change} from last month</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
