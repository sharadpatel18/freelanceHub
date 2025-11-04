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
    DollarSign,
    TrendingUp,
    Download,
    Calendar,
    CreditCard,
    Wallet,
    CheckCircle,
    Clock,
    Filter
} from "lucide-react"

export default function Page() {
    const transactions = [
        {
            id: 1,
            project: "E-commerce Website Redesign",
            client: "TechCorp Inc.",
            amount: 3200,
            status: "completed",
            date: "Nov 1, 2025",
            method: "Bank Transfer",
            invoice: "#INV-001"
        },
        {
            id: 2,
            project: "Mobile App UI/UX Design",
            client: "StartupXYZ",
            amount: 2800,
            status: "pending",
            date: "Oct 28, 2025",
            method: "PayPal",
            invoice: "#INV-002"
        },
        {
            id: 3,
            project: "Brand Identity Package",
            client: "CreativeStudio",
            amount: 1500,
            status: "completed",
            date: "Oct 25, 2025",
            method: "Stripe",
            invoice: "#INV-003"
        },
        {
            id: 4,
            project: "Marketing Website Development",
            client: "Digital Agency Co.",
            amount: 4500,
            status: "pending",
            date: "Oct 20, 2025",
            method: "Bank Transfer",
            invoice: "#INV-004"
        },
        {
            id: 5,
            project: "Logo Design & Branding",
            client: "FreshStart Inc.",
            amount: 800,
            status: "completed",
            date: "Oct 15, 2025",
            method: "PayPal",
            invoice: "#INV-005"
        }
    ]

    const monthlyData = [
        { month: "Jan", earnings: 8200, expenses: 1200 },
        { month: "Feb", earnings: 9500, expenses: 1400 },
        { month: "Mar", earnings: 7800, expenses: 1100 },
        { month: "Apr", earnings: 10200, expenses: 1600 },
        { month: "May", earnings: 11500, expenses: 1800 },
        { month: "Jun", earnings: 9800, expenses: 1500 },
        { month: "Jul", earnings: 12300, expenses: 1900 },
        { month: "Aug", earnings: 10800, expenses: 1700 },
        { month: "Sep", earnings: 13200, expenses: 2000 },
        { month: "Oct", earnings: 11900, expenses: 1850 },
        { month: "Nov", earnings: 12450, expenses: 1920 }
    ]

    const stats = {
        totalEarnings: 124450,
        thisMonth: 12450,
        pending: 7300,
        available: 118150,
        growth: 12.5,
        transactions: transactions.length
    }

    const getStatusColor = (status: string) => {
        return status === 'completed'
            ? 'bg-green-500/20 text-green-700 border-green-500/30'
            : 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30'
    }

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
                                        Earnings
                                    </h1>
                                    <p className="text-muted-foreground">
                                        Track your income and financial performance
                                    </p>
                                </div>
                                <div className="flex gap-2 mt-4 md:mt-0">
                                    <Button variant="outline" className="border-2">
                                        <Filter className="h-4 w-4 mr-2" />
                                        Filter
                                    </Button>
                                    <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary">
                                        <Download className="h-4 w-4 mr-2" />
                                        Export Report
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Stats Overview */}
                    <section className="px-6 pb-8">
                        <div className="container mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/20">
                                    <CardContent className="pt-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Total Earnings</p>
                                                <p className="text-2xl font-bold bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">
                                                    ${stats.totalEarnings.toLocaleString()}
                                                </p>
                                                <div className="flex items-center mt-1">
                                                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                                                    <span className="text-sm text-green-500 font-medium">+{stats.growth}%</span>
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
                                                <p className="text-sm font-medium text-muted-foreground">This Month</p>
                                                <p className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                                    ${stats.thisMonth.toLocaleString()}
                                                </p>
                                                <p className="text-sm text-muted-foreground mt-1">November 2025</p>
                                            </div>
                                            <div className="p-3 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                                <Calendar className="h-6 w-6 text-primary" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/20">
                                    <CardContent className="pt-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                                                <p className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                                                    ${stats.pending.toLocaleString()}
                                                </p>
                                                <p className="text-sm text-muted-foreground mt-1">Awaiting payment</p>
                                            </div>
                                            <div className="p-3 bg-gradient-to-br from-yellow-500/20 to-yellow-500/10 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                                <Clock className="h-6 w-6 text-yellow-500" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/20">
                                    <CardContent className="pt-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Available</p>
                                                <p className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
                                                    ${stats.available.toLocaleString()}
                                                </p>
                                                <p className="text-sm text-muted-foreground mt-1">Ready to withdraw</p>
                                            </div>
                                            <div className="p-3 bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                                <Wallet className="h-6 w-6 text-blue-500" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </section>

                    {/* Charts and Breakdown */}
                    <section className="px-6 pb-8">
                        <div className="container mx-auto">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                                {/* Monthly Earnings Chart */}
                                <Card className="lg:col-span-2 border-2 hover:shadow-xl transition-all duration-300">
                                    <CardHeader>
                                        <CardTitle>Monthly Earnings</CardTitle>
                                        <CardDescription>Your earnings over the past 11 months</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            {monthlyData.slice(-6).reverse().map((data) => (
                                                <div key={data.earnings} className="space-y-2">
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span className="font-medium">{data.month}</span>
                                                        <span className="text-green-600 font-semibold">${data.earnings.toLocaleString()}</span>
                                                    </div>
                                                    <Progress value={(data.earnings / 15000) * 100} className="h-2" />
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Payment Methods */}
                                <Card className="border-2 hover:shadow-xl transition-all duration-300">
                                    <CardHeader>
                                        <CardTitle>Payment Methods</CardTitle>
                                        <CardDescription>Breakdown by payment type</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg">
                                                    <CreditCard className="h-5 w-5 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold">Bank Transfer</p>
                                                    <p className="text-xs text-muted-foreground">45% of earnings</p>
                                                </div>
                                            </div>
                                            <p className="font-bold text-primary">$56k</p>
                                        </div>

                                        <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-blue-500/10 to-blue-500/5 border border-blue-500/20">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-lg">
                                                    <Wallet className="h-5 w-5 text-blue-500" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold">PayPal</p>
                                                    <p className="text-xs text-muted-foreground">35% of earnings</p>
                                                </div>
                                            </div>
                                            <p className="font-bold text-blue-600">$43k</p>
                                        </div>

                                        <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-green-500/10 to-green-500/5 border border-green-500/20">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-lg">
                                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold">Stripe</p>
                                                    <p className="text-xs text-muted-foreground">20% of earnings</p>
                                                </div>
                                            </div>
                                            <p className="font-bold text-green-600">$25k</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </section>

                    {/* Recent Transactions */}
                    <section className="px-6 pb-8">
                        <div className="container mx-auto">
                            <Card className="border-2 hover:shadow-xl transition-all duration-300">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle>Recent Transactions</CardTitle>
                                            <CardDescription>Your latest payment activities</CardDescription>
                                        </div>
                                        <Button variant="outline" size="sm">View All</Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {transactions.map((transaction) => (
                                            <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg border-2 hover:border-primary/20 transition-colors">
                                                <div className="flex items-center gap-4 flex-1">
                                                    <div className={`p-3 rounded-lg ${transaction.status === 'completed'
                                                        ? 'bg-gradient-to-br from-green-500/20 to-green-500/10'
                                                        : 'bg-gradient-to-br from-yellow-500/20 to-yellow-500/10'
                                                        }`}>
                                                        {transaction.status === 'completed' ? (
                                                            <CheckCircle className="h-5 w-5 text-green-500" />
                                                        ) : (
                                                            <Clock className="h-5 w-5 text-yellow-500" />
                                                        )}
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-semibold">{transaction.project}</h4>
                                                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                                            <span>{transaction.client}</span>
                                                            <span>•</span>
                                                            <span>{transaction.invoice}</span>
                                                            <span>•</span>
                                                            <span>{transaction.method}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-lg font-bold text-green-600">
                                                        +${transaction.amount.toLocaleString()}
                                                    </p>
                                                    <div className="flex items-center justify-end gap-2 mt-1">
                                                        <Badge variant="secondary" className={getStatusColor(transaction.status)}>
                                                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                                                        </Badge>
                                                        <span className="text-sm text-muted-foreground">{transaction.date}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
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