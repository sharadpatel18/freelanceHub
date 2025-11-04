import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    FileText,
    Search,
    Filter,
    Plus,
    Calendar,
    DollarSign,
    Clock,
    CheckCircle,
    XCircle,
    Send,
    Eye,
    Edit,
    Trash2,
    MoreVertical,
    TrendingUp,
    AlertCircle,
    Copy
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

export default function Page() {
    const proposals = [
        {
            id: 1,
            title: "E-commerce Platform Redesign",
            client: "TechMart Solutions",
            status: "pending",
            amount: 5500,
            sentDate: "Nov 1, 2025",
            expiryDate: "Nov 15, 2025",
            daysLeft: 10,
            description: "Complete redesign of the e-commerce platform with modern UI/UX and improved user experience",
            items: ["UI/UX Design", "Frontend Development", "Testing"],
            acceptanceRate: 75
        },
        {
            id: 2,
            title: "Mobile Banking App Development",
            client: "FinanceHub Inc.",
            status: "accepted",
            amount: 8200,
            sentDate: "Oct 25, 2025",
            expiryDate: "Nov 10, 2025",
            daysLeft: 5,
            description: "Develop secure mobile banking application for iOS and Android platforms",
            items: ["Mobile Development", "Security Implementation", "API Integration"],
            acceptanceRate: 90
        },
        {
            id: 3,
            title: "Brand Identity & Marketing Materials",
            client: "StartupVentures",
            status: "rejected",
            amount: 2800,
            sentDate: "Oct 20, 2025",
            expiryDate: "Nov 5, 2025",
            daysLeft: 0,
            description: "Create comprehensive brand identity including logo, guidelines, and marketing materials",
            items: ["Logo Design", "Brand Guidelines", "Marketing Collateral"],
            acceptanceRate: 60
        },
        {
            id: 4,
            title: "SaaS Dashboard Development",
            client: "CloudTech Systems",
            status: "draft",
            amount: 6700,
            sentDate: null,
            expiryDate: null,
            daysLeft: null,
            description: "Build analytics dashboard for SaaS platform with real-time data visualization",
            items: ["Dashboard Design", "Data Visualization", "Backend Integration"],
            acceptanceRate: 0
        },
        {
            id: 5,
            title: "Website Maintenance & Support",
            client: "RetailCo Group",
            status: "pending",
            amount: 1200,
            sentDate: "Oct 28, 2025",
            expiryDate: "Nov 12, 2025",
            daysLeft: 7,
            description: "Monthly website maintenance and technical support package",
            items: ["Bug Fixes", "Updates", "Technical Support"],
            acceptanceRate: 85
        }
    ]

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'accepted': return 'bg-green-500/20 text-green-700 border-green-500/30'
            case 'pending': return 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30'
            case 'rejected': return 'bg-red-500/20 text-red-700 border-red-500/30'
            case 'draft': return 'bg-gray-500/20 text-gray-700 border-gray-500/30'
            default: return 'bg-gray-500/20 text-gray-700 border-gray-500/30'
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'accepted': return <CheckCircle className="h-4 w-4" />
            case 'pending': return <Clock className="h-4 w-4" />
            case 'rejected': return <XCircle className="h-4 w-4" />
            case 'draft': return <FileText className="h-4 w-4" />
            default: return <FileText className="h-4 w-4" />
        }
    }

    const filterProposals = (status: string) => {
        if (status === 'all') return proposals
        return proposals.filter(p => p.status === status)
    }

    const stats = {
        total: proposals.length,
        pending: proposals.filter(p => p.status === 'pending').length,
        accepted: proposals.filter(p => p.status === 'accepted').length,
        rejected: proposals.filter(p => p.status === 'rejected').length,
        totalValue: proposals.reduce((sum, p) => sum + p.amount, 0),
        avgAcceptance: 75
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
                                        Proposals
                                    </h1>
                                    <p className="text-muted-foreground">
                                        Track and manage all your project proposals
                                    </p>
                                </div>
                                <Button className="mt-4 md:mt-0 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Create Proposal
                                </Button>
                            </div>

                            {/* Search and Filter */}
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search proposals..."
                                        className="pl-10 bg-background/50 backdrop-blur-sm border-2"
                                    />
                                </div>
                                <Button variant="outline" className="border-2">
                                    <Filter className="h-4 w-4 mr-2" />
                                    Filters
                                </Button>
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
                                                <p className="text-sm font-medium text-muted-foreground">Total Proposals</p>
                                                <p className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{stats.total}</p>
                                                <p className="text-sm text-muted-foreground mt-1">All time</p>
                                            </div>
                                            <div className="p-3 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                                <FileText className="h-6 w-6 text-primary" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/20">
                                    <CardContent className="pt-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                                                <p className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">{stats.pending}</p>
                                                <p className="text-sm text-muted-foreground mt-1">Awaiting response</p>
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
                                                <p className="text-sm font-medium text-muted-foreground">Accepted</p>
                                                <p className="text-2xl font-bold bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">{stats.accepted}</p>
                                                <p className="text-sm text-muted-foreground mt-1">Won projects</p>
                                            </div>
                                            <div className="p-3 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                                <CheckCircle className="h-6 w-6 text-green-500" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/20">
                                    <CardContent className="pt-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                                                <p className="text-2xl font-bold bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">${stats.totalValue.toLocaleString()}</p>
                                                <p className="text-sm text-muted-foreground mt-1">Combined worth</p>
                                            </div>
                                            <div className="p-3 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                                <DollarSign className="h-6 w-6 text-green-500" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </section>

                    {/* Proposals List with Tabs */}
                    <section className="px-6 pb-8">
                        <div className="container mx-auto">
                            <Tabs defaultValue="all" className="w-full">
                                <TabsList className="grid w-full max-w-2xl grid-cols-5 mb-6">
                                    <TabsTrigger value="all">All</TabsTrigger>
                                    <TabsTrigger value="pending">Pending</TabsTrigger>
                                    <TabsTrigger value="accepted">Accepted</TabsTrigger>
                                    <TabsTrigger value="rejected">Rejected</TabsTrigger>
                                    <TabsTrigger value="draft">Drafts</TabsTrigger>
                                </TabsList>

                                {['all', 'pending', 'accepted', 'rejected', 'draft'].map((tab) => (
                                    <TabsContent key={tab} value={tab} className="space-y-6">
                                        {filterProposals(tab).map((proposal) => (
                                            <Card key={proposal.id} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
                                                <CardHeader>
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-3 mb-2">
                                                                <CardTitle className="text-xl">{proposal.title}</CardTitle>
                                                                <Badge variant="secondary" className={getStatusColor(proposal.status)}>
                                                                    <span className="mr-1">{getStatusIcon(proposal.status)}</span>
                                                                    {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                                                                </Badge>
                                                            </div>
                                                            <CardDescription className="flex items-center gap-4 flex-wrap">
                                                                <span className="flex items-center gap-1">
                                                                    <FileText className="h-4 w-4" />
                                                                    {proposal.client}
                                                                </span>
                                                                {proposal.sentDate && (
                                                                    <span className="flex items-center gap-1">
                                                                        <Send className="h-4 w-4" />
                                                                        Sent: {proposal.sentDate}
                                                                    </span>
                                                                )}
                                                                {proposal.expiryDate && (
                                                                    <span className="flex items-center gap-1">
                                                                        <Calendar className="h-4 w-4" />
                                                                        Expires: {proposal.expiryDate}
                                                                    </span>
                                                                )}
                                                                {proposal.daysLeft != null && proposal.daysLeft > 0 && (
                                                                    <Badge variant="outline" className="bg-yellow-500/10 text-yellow-700 border-yellow-500/30">
                                                                        <AlertCircle className="h-3 w-3 mr-1" />
                                                                        {proposal.daysLeft} days left
                                                                    </Badge>
                                                                )}
                                                            </CardDescription>
                                                        </div>
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" size="sm">
                                                                    <MoreVertical className="h-4 w-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuItem>
                                                                    <Eye className="h-4 w-4 mr-2" />
                                                                    View Details
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem>
                                                                    <Edit className="h-4 w-4 mr-2" />
                                                                    Edit Proposal
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem>
                                                                    <Copy className="h-4 w-4 mr-2" />
                                                                    Duplicate
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem className="text-red-600">
                                                                    <Trash2 className="h-4 w-4 mr-2" />
                                                                    Delete
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </div>
                                                </CardHeader>
                                                <CardContent>
                                                    <p className="text-sm text-muted-foreground mb-4">{proposal.description}</p>

                                                    {/* Proposal Items */}
                                                    <div className="flex flex-wrap gap-2 mb-4">
                                                        {proposal.items.map((item) => (
                                                            <Badge key={item} variant="outline" className="bg-primary/5">
                                                                {item}
                                                            </Badge>
                                                        ))}
                                                    </div>

                                                    {/* Proposal Info */}
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                                                        <div className="flex items-center gap-3">
                                                            <div className="p-2 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-lg">
                                                                <DollarSign className="h-4 w-4 text-green-500" />
                                                            </div>
                                                            <div>
                                                                <p className="text-xs text-muted-foreground">Proposal Amount</p>
                                                                <p className="text-lg font-bold text-green-600">${proposal.amount.toLocaleString()}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <div className="p-2 bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-lg">
                                                                <TrendingUp className="h-4 w-4 text-blue-500" />
                                                            </div>
                                                            <div>
                                                                <p className="text-xs text-muted-foreground">Acceptance Rate</p>
                                                                <p className="text-lg font-bold">{proposal.acceptanceRate}%</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <Button className="w-full" variant={proposal.status === 'draft' ? 'default' : 'outline'}>
                                                                {proposal.status === 'draft' ? (
                                                                    <>
                                                                        <Send className="h-4 w-4 mr-2" />
                                                                        Send Proposal
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <Eye className="h-4 w-4 mr-2" />
                                                                        View Full Proposal
                                                                    </>
                                                                )}
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </TabsContent>
                                ))}
                            </Tabs>
                        </div>
                    </section>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}