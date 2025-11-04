import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
    TrendingUp,
    TrendingDown,
    Activity,
    Users,
    Briefcase,
    DollarSign,
    Target,
    Calendar,
    Star,
    ArrowUpRight,
    ArrowDownRight,
    Download,
    Filter
} from "lucide-react"

export default function Page() {
    const performanceData = [
        { metric: "Projects Completed", current: 24, previous: 18, change: 33.3, trend: "up" },
        { metric: "Client Satisfaction", current: 4.9, previous: 4.7, change: 4.3, trend: "up" },
        { metric: "Response Time (hours)", current: 2.1, previous: 2.8, change: -25, trend: "up" },
        { metric: "Revenue Growth", current: 12.5, previous: 8.2, change: 52.4, trend: "up" }
    ]

    const topClients = [
        { name: "TechCorp Inc.", projects: 8, revenue: 24600, growth: 15 },
        { name: "StartupXYZ", projects: 6, revenue: 18400, growth: 22 },
        { name: "Digital Agency Co.", projects: 5, revenue: 16200, growth: 8 },
        { name: "CreativeStudio", projects: 4, revenue: 12800, growth: -5 },
        { name: "FinanceHub Inc.", projects: 3, revenue: 9600, growth: 35 }
    ]

    const projectCategories = [
        { category: "Web Development", count: 12, revenue: 42000, percentage: 35 },
        { category: "UI/UX Design", count: 8, revenue: 28000, percentage: 25 },
        { category: "Mobile Development", count: 6, revenue: 24000, percentage: 20 },
        { category: "Branding", count: 5, revenue: 16000, percentage: 12 },
        { category: "Consulting", count: 3, revenue: 10000, percentage: 8 }
    ]

    const monthlyMetrics = [
        { month: "May", revenue: 11500, projects: 4, clients: 3 },
        { month: "Jun", revenue: 9800, projects: 3, clients: 3 },
        { month: "Jul", revenue: 12300, projects: 5, clients: 4 },
        { month: "Aug", revenue: 10800, projects: 4, clients: 3 },
        { month: "Sep", revenue: 13200, projects: 6, clients: 5 },
        { month: "Oct", revenue: 11900, projects: 5, clients: 4 },
        { month: "Nov", revenue: 12450, projects: 5, clients: 4 }
    ]

    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />

                <div className="min-h-screen bg-background">
                    {/* Header Section */}
                    <section className="py-8 px-6 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />

                        <div className="container mx-auto relative z-10">
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
                                <div>
                                    <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                                        Analytics
                                    </h1>
                                    <p className="text-muted-foreground">
                                        Insights and metrics about your freelance business
                                    </p>
                                </div>
                                <div className="flex gap-2 mt-4 md:mt-0">
                                    <Button variant="outline" className="border-2">
                                        <Filter className="h-4 w-4 mr-2" />
                                        Filter
                                    </Button>
                                    <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary">
                                        <Download className="h-4 w-4 mr-2" />
                                        Export Data
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Key Metrics */}
                    <section className="px-6 pb-8">
                        <div className="container mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/20">
                                    <CardContent className="pt-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                                                <p className="text-2xl font-bold bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">
                                                    $124k
                                                </p>
                                                <div className="flex items-center mt-1">
                                                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                                                    <span className="text-sm text-green-500 font-medium">+18.2%</span>
                                                </div>
                                            </div>
                                            <div className="p-3 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                                <DollarSign className="h-6 w-6 text-green-500" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/20">
                                    <CardContent className="pt-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Active Clients</p>
                                                <p className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                                    15
                                                </p>
                                                <div className="flex items-center mt-1">
                                                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                                                    <span className="text-sm text-green-500 font-medium">+3 this month</span>
                                                </div>
                                            </div>
                                            <div className="p-3 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                                <Users className="h-6 w-6 text-primary" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/20">
                                    <CardContent className="pt-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Avg Project Value</p>
                                                <p className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
                                                    $3,456
                                                </p>
                                                <div className="flex items-center mt-1">
                                                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                                                    <span className="text-sm text-green-500 font-medium">+8.5%</span>
                                                </div>
                                            </div>
                                            <div className="p-3 bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                                <Activity className="h-6 w-6 text-blue-500" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/20">
                                    <CardContent className="pt-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                                                <p className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                                                    87%
                                                </p>
                                                <div className="flex items-center mt-1">
                                                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                                                    <span className="text-sm text-green-500 font-medium">+5.2%</span>
                                                </div>
                                            </div>
                                            <div className="p-3 bg-gradient-to-br from-yellow-500/20 to-yellow-500/10 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                                <Target className="h-6 w-6 text-yellow-500" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </section>

                    {/* Performance Trends */}
                    <section className="px-6 pb-8">
                        <div className="container mx-auto">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                                {/* Performance Comparison */}
                                <Card className="border-2 hover:shadow-xl transition-all duration-300">
                                    <CardHeader>
                                        <CardTitle>Performance Comparison</CardTitle>
                                        <CardDescription>Current vs previous period metrics</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {performanceData.map((data) => (
                                            <div key={data.current} className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-medium">{data.metric}</span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm font-bold">{data.current}</span>
                                                        <Badge variant="secondary" className={`${data.trend === 'up'
                                                            ? 'bg-green-500/20 text-green-700 border-green-500/30'
                                                            : 'bg-red-500/20 text-red-700 border-red-500/30'
                                                            }`}>
                                                            {data.trend === 'up' ? (
                                                                <ArrowUpRight className="h-3 w-3 mr-1" />
                                                            ) : (
                                                                <ArrowDownRight className="h-3 w-3 mr-1" />
                                                            )}
                                                            {Math.abs(data.change)}%
                                                        </Badge>
                                                    </div>
                                                </div>
                                                <Progress value={Math.min((data.current / (data.previous * 1.5)) * 100, 100)} className="h-2" />
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>

                                {/* Monthly Revenue Trend */}
                                <Card className="border-2 hover:shadow-xl transition-all duration-300">
                                    <CardHeader>
                                        <CardTitle>Monthly Revenue Trend</CardTitle>
                                        <CardDescription>Last 7 months performance</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        {monthlyMetrics.map((data) => (
                                            <div key={data.month} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg">
                                                        <Calendar className="h-4 w-4 text-primary" />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-sm">{data.month}</p>
                                                        <p className="text-xs text-muted-foreground">
                                                            {data.projects} projects • {data.clients} clients
                                                        </p>
                                                    </div>
                                                </div>
                                                <p className="font-bold text-green-600">${data.revenue.toLocaleString()}</p>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </section>

                    {/* Client and Category Analysis */}
                    <section className="px-6 pb-8">
                        <div className="container mx-auto">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Top Clients */}
                                <Card className="border-2 hover:shadow-xl transition-all duration-300">
                                    <CardHeader>
                                        <CardTitle>Top Clients</CardTitle>
                                        <CardDescription>Clients by revenue contribution</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {topClients.map((client, idx) => (
                                            <div key={client.name} className="flex items-center justify-between p-4 rounded-lg border hover:border-primary/20 transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full">
                                                        <span className="text-sm font-bold text-primary">#{idx + 1}</span>
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold">{client.name}</p>
                                                        <p className="text-sm text-muted-foreground">{client.projects} projects</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-green-600">${client.revenue.toLocaleString()}</p>
                                                    <div className="flex items-center justify-end mt-1">
                                                        {client.growth > 0 ? (
                                                            <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                                                        ) : (
                                                            <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                                                        )}
                                                        <span className={`text-xs ${client.growth > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                                            {Math.abs(client.growth)}%
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>

                                {/* Project Categories */}
                                <Card className="border-2 hover:shadow-xl transition-all duration-300">
                                    <CardHeader>
                                        <CardTitle>Project Categories</CardTitle>
                                        <CardDescription>Revenue breakdown by category</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {projectCategories.map((category) => (
                                            <div key={category.count} className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <Briefcase className="h-4 w-4 text-primary" />
                                                        <span className="text-sm font-medium">{category.category}</span>
                                                        <Badge variant="outline" className="text-xs">{category.count}</Badge>
                                                    </div>
                                                    <span className="text-sm font-bold text-green-600">
                                                        ${category.revenue.toLocaleString()}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Progress value={category.percentage} className="h-2 flex-1" />
                                                    <span className="text-xs text-muted-foreground w-10 text-right">
                                                        {category.percentage}%
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </section>

                    {/* Goals and Achievements */}
                    <section className="px-6 pb-8">
                        <div className="container mx-auto">
                            <Card className="border-2 hover:shadow-xl transition-all duration-300">
                                <CardHeader>
                                    <CardTitle>Monthly Goals Progress</CardTitle>
                                    <CardDescription>Track your achievements and targets</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="text-center">
                                            <div className="mb-4">
                                                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mb-2">
                                                    <Target className="h-8 w-8 text-primary" />
                                                </div>
                                                <h3 className="font-semibold">Revenue Goal</h3>
                                            </div>
                                            <Progress value={83} className="mb-2" />
                                            <p className="text-sm text-muted-foreground">$12,450 of $15,000</p>
                                            <p className="text-xs text-green-500 mt-1">83% complete</p>
                                        </div>

                                        <div className="text-center">
                                            <div className="mb-4">
                                                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-full flex items-center justify-center mb-2">
                                                    <Briefcase className="h-8 w-8 text-blue-500" />
                                                </div>
                                                <h3 className="font-semibold">Projects Goal</h3>
                                            </div>
                                            <Progress value={62.5} className="mb-2" />
                                            <p className="text-sm text-muted-foreground">5 of 8 projects</p>
                                            <p className="text-xs text-blue-500 mt-1">62.5% complete</p>
                                        </div>

                                        <div className="text-center">
                                            <div className="mb-4">
                                                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-yellow-500/20 to-yellow-500/10 rounded-full flex items-center justify-center mb-2">
                                                    <Star className="h-8 w-8 text-yellow-500" />
                                                </div>
                                                <h3 className="font-semibold">Rating Goal</h3>
                                            </div>
                                            <Progress value={98} className="mb-2" />
                                            <p className="text-sm text-muted-foreground">4.9 of 5.0 rating</p>
                                            <p className="text-xs text-yellow-600 mt-1">98% complete</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </section>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}