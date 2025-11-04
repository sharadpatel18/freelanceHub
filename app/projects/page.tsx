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
import { Progress } from "@/components/ui/progress"
import {
    Briefcase,
    Search,
    Filter,
    Plus,
    Calendar,
    DollarSign,
    Clock,
    CheckCircle,
    AlertCircle,
    FileText,
    Users,
    TrendingUp,
    MoreVertical,
    Eye,
    Edit,
    Trash2
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
    const projects = [
        {
            id: 1,
            title: "E-commerce Website Redesign",
            client: "TechCorp Inc.",
            status: "in-progress",
            progress: 65,
            budget: 3200,
            spent: 2080,
            deadline: "Dec 15, 2025",
            daysLeft: 40,
            description: "Complete redesign of the e-commerce platform with modern UI/UX",
            tags: ["Web Design", "UI/UX", "React"]
        },
        {
            id: 2,
            title: "Mobile App UI/UX Design",
            client: "StartupXYZ",
            status: "review",
            progress: 90,
            budget: 2800,
            spent: 2520,
            deadline: "Nov 20, 2025",
            daysLeft: 15,
            description: "Design mobile application interface for iOS and Android",
            tags: ["Mobile", "UI/UX", "Figma"]
        },
        {
            id: 3,
            title: "Brand Identity Package",
            client: "CreativeStudio",
            status: "completed",
            progress: 100,
            budget: 1500,
            spent: 1500,
            deadline: "Oct 30, 2025",
            daysLeft: 0,
            description: "Complete brand identity including logo, colors, and guidelines",
            tags: ["Branding", "Design", "Illustrator"]
        },
        {
            id: 4,
            title: "Marketing Website Development",
            client: "Digital Agency Co.",
            status: "in-progress",
            progress: 45,
            budget: 4500,
            spent: 2025,
            deadline: "Jan 10, 2026",
            daysLeft: 66,
            description: "Build responsive marketing website with CMS integration",
            tags: ["Web Dev", "Next.js", "CMS"]
        },
        {
            id: 5,
            title: "Dashboard Analytics Tool",
            client: "DataTech Solutions",
            status: "planning",
            progress: 15,
            budget: 5200,
            spent: 780,
            deadline: "Feb 28, 2026",
            daysLeft: 115,
            description: "Create analytics dashboard with data visualization",
            tags: ["Dashboard", "React", "D3.js"]
        },
        {
            id: 6,
            title: "Logo Design & Branding",
            client: "FreshStart Inc.",
            status: "completed",
            progress: 100,
            budget: 800,
            spent: 800,
            deadline: "Oct 15, 2025",
            daysLeft: 0,
            description: "Design modern logo and brand guidelines",
            tags: ["Logo", "Branding"]
        }
    ]

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'bg-green-500/20 text-green-700 border-green-500/30'
            case 'in-progress': return 'bg-blue-500/20 text-blue-700 border-blue-500/30'
            case 'review': return 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30'
            case 'planning': return 'bg-purple-500/20 text-purple-700 border-purple-500/30'
            default: return 'bg-gray-500/20 text-gray-700 border-gray-500/30'
        }
    }

    const getStatusText = (status: string) => {
        return status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    }

    const filterProjects = (status: string) => {
        if (status === 'all') return projects
        return projects.filter(p => p.status === status)
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
                                        My Projects
                                    </h1>
                                    <p className="text-muted-foreground">
                                        Manage and track all your freelance projects in one place
                                    </p>
                                </div>
                                <Button className="mt-4 md:mt-0 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary">
                                    <Plus className="h-4 w-4 mr-2" />
                                    New Project
                                </Button>
                            </div>

                            {/* Search and Filter */}
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search projects..."
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
                                                <p className="text-sm font-medium text-muted-foreground">Total Projects</p>
                                                <p className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">12</p>
                                                <p className="text-sm text-muted-foreground mt-1">All time</p>
                                            </div>
                                            <div className="p-3 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                                <Briefcase className="h-6 w-6 text-primary" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/20">
                                    <CardContent className="pt-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Active</p>
                                                <p className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">8</p>
                                                <p className="text-sm text-muted-foreground mt-1">In progress</p>
                                            </div>
                                            <div className="p-3 bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                                <TrendingUp className="h-6 w-6 text-blue-500" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/20">
                                    <CardContent className="pt-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                                                <p className="text-2xl font-bold bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">4</p>
                                                <p className="text-sm text-muted-foreground mt-1">This month</p>
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
                                                <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                                                <p className="text-2xl font-bold bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">$18k</p>
                                                <p className="text-sm text-muted-foreground mt-1">Total value</p>
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

                    {/* Projects List with Tabs */}
                    <section className="px-6 pb-8">
                        <div className="container mx-auto">
                            <Tabs defaultValue="all" className="w-full">
                                <TabsList className="grid w-full max-w-2xl grid-cols-5 mb-6">
                                    <TabsTrigger value="all">All</TabsTrigger>
                                    <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                                    <TabsTrigger value="review">Review</TabsTrigger>
                                    <TabsTrigger value="completed">Completed</TabsTrigger>
                                    <TabsTrigger value="planning">Planning</TabsTrigger>
                                </TabsList>

                                {['all', 'in-progress', 'review', 'completed', 'planning'].map((tab) => (
                                    <TabsContent key={tab} value={tab} className="space-y-6">
                                        {filterProjects(tab).map((project) => (
                                            <Card key={project.id} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
                                                <CardHeader>
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-3 mb-2">
                                                                <CardTitle className="text-xl">{project.title}</CardTitle>
                                                                <Badge variant="secondary" className={getStatusColor(project.status)}>
                                                                    {getStatusText(project.status)}
                                                                </Badge>
                                                            </div>
                                                            <CardDescription className="flex items-center gap-4">
                                                                <span className="flex items-center gap-1">
                                                                    <Users className="h-4 w-4" />
                                                                    {project.client}
                                                                </span>
                                                                <span className="flex items-center gap-1">
                                                                    <Calendar className="h-4 w-4" />
                                                                    Due: {project.deadline}
                                                                </span>
                                                                {project.daysLeft > 0 && (
                                                                    <span className="flex items-center gap-1 text-yellow-600">
                                                                        <Clock className="h-4 w-4" />
                                                                        {project.daysLeft} days left
                                                                    </span>
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
                                                                    Edit Project
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
                                                    <p className="text-sm text-muted-foreground mb-4">{project.description}</p>

                                                    {/* Tags */}
                                                    <div className="flex flex-wrap gap-2 mb-4">
                                                        {project.tags.map((tag) => (
                                                            <Badge key={tag} variant="outline" className="bg-primary/5">
                                                                {tag}
                                                            </Badge>
                                                        ))}
                                                    </div>

                                                    {/* Progress Section */}
                                                    <div className="space-y-4">
                                                        <div>
                                                            <div className="flex items-center justify-between mb-2">
                                                                <span className="text-sm font-medium">Progress</span>
                                                                <span className="text-sm text-muted-foreground">{project.progress}%</span>
                                                            </div>
                                                            <Progress value={project.progress} className="h-2" />
                                                        </div>

                                                        {/* Budget Info */}
                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                                                            <div className="flex items-center gap-3">
                                                                <div className="p-2 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-lg">
                                                                    <DollarSign className="h-4 w-4 text-green-500" />
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs text-muted-foreground">Budget</p>
                                                                    <p className="text-sm font-semibold">${project.budget.toLocaleString()}</p>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-3">
                                                                <div className="p-2 bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-lg">
                                                                    <TrendingUp className="h-4 w-4 text-blue-500" />
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs text-muted-foreground">Spent</p>
                                                                    <p className="text-sm font-semibold">${project.spent.toLocaleString()}</p>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-3">
                                                                <div className="p-2 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg">
                                                                    <FileText className="h-4 w-4 text-primary" />
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs text-muted-foreground">Remaining</p>
                                                                    <p className="text-sm font-semibold">${(project.budget - project.spent).toLocaleString()}</p>
                                                                </div>
                                                            </div>
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