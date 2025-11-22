"use client"

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
import { Skeleton } from "@/components/ui/skeleton"
import {
    Search,
    Filter,
    Calendar,
    DollarSign,
    Users,
    MoreVertical,
    Eye,
    Edit,
    Trash2,
    Folder,
    MapPin,
    Clock,
    Paperclip,
    RefreshCw
} from "lucide-react"
import type { ProjectType } from "@/types/projects"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { getAllProjects } from "@/services/projects-services"
import { redirect } from "next/navigation"

export default function Page() {
    const [isMounted, setIsMounted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState<ProjectType[]>([])

    useEffect(() => {
        setIsMounted(true)
        const fetchProjects = async () => {
            try {
                setLoading(true);
                const data = await getAllProjects();
                setProjects(data.data);
                console.log(data.data);

            } catch (error) {
                console.error(error)
                toast.error("Something went wrong")
            } finally {
                setLoading(false);
            }
        }
        fetchProjects();
    }, [])

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

    const handleShowDetails = (id: string) => {
        redirect(`/projects/${id}`);
    }

    if (!isMounted) {
        return null
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
            <AppSidebar variant="inset" side="left" />
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
                                        Projects
                                    </h1>
                                    <p className="text-muted-foreground">
                                        Manage and track all your freelance projects in one place
                                    </p>
                                </div>
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

                    <section className="px-6 pb-8">
                        <div className="container mx-auto">
                            {
                                loading ? (
                                    // Loader visible while fetching
                                    <div className="flex flex-col gap-6" >
                                        {[...Array(3)].map((_, i) => (
                                            <Card key={i} className="border-2">
                                                <CardHeader>
                                                    <div className="flex items-center justify-between">
                                                        <Skeleton className="h-6 w-48" />
                                                        <Skeleton className="h-6 w-16" />
                                                    </div>
                                                    <div className="flex gap-3 mt-3">
                                                        <Skeleton className="h-4 w-32" />
                                                        <Skeleton className="h-4 w-24" />
                                                        <Skeleton className="h-4 w-20" />
                                                    </div>
                                                </CardHeader>
                                                <CardContent>
                                                    <Skeleton className="h-4 w-full mb-3" />
                                                    <Skeleton className="h-4 w-5/6 mb-3" />
                                                    <Skeleton className="h-4 w-3/4" />
                                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 mt-4 border-t">
                                                        {[...Array(4)].map((_, i) => (
                                                            <div key={i} className="flex items-center gap-3">
                                                                <Skeleton className="h-10 w-10 rounded-lg" />
                                                                <div>
                                                                    <Skeleton className="h-3 w-20 mb-2" />
                                                                    <Skeleton className="h-4 w-24" />
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                ) : projects.length > 0 && projects.map((project: ProjectType) => (
                                    <Card key={project.id} className="group mb-8 hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <CardTitle className="text-xl">{project.title}</CardTitle>
                                                        <Badge variant="secondary" className={getStatusColor(project.status)}>
                                                            {getStatusText(project.status)}
                                                        </Badge>
                                                    </div>
                                                    <CardDescription className="flex items-center gap-4 flex-wrap">
                                                        <span className="flex items-center gap-1">
                                                            <Users className="h-4 w-4" />
                                                            Client: {project.user.name}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Calendar className="h-4 w-4" />
                                                            Duration: {project.expectedDuration} days
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Folder className="h-4 w-4" />
                                                            {project.category} / {project.subCategory}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <MapPin className="h-4 w-4" />
                                                            {project.locationPreference}
                                                        </span>
                                                    </CardDescription>
                                                </div>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="sm">
                                                            <MoreVertical className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => handleShowDetails(project.id)}>
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
                                            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                                                {project.description}
                                            </p>

                                            {project.skills && project.skills.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {project.skills.map((skill) => (
                                                        <Badge key={skill} variant="outline" className="bg-primary/5">
                                                            {skill}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            )}

                                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-lg">
                                                        <DollarSign className="h-4 w-4 text-green-500" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-muted-foreground">Budget Range</p>
                                                        <p className="text-sm font-semibold">
                                                            ${project.minBudget.toLocaleString()} - ${project.maxBudget.toLocaleString()}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground capitalize">{project.budgetType}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-lg">
                                                        <Clock className="h-4 w-4 text-blue-500" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-muted-foreground">Duration</p>
                                                        <p className="text-sm font-semibold">{project.expectedDuration} days</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-gradient-to-br from-orange-500/20 to-orange-500/10 rounded-lg">
                                                        <Paperclip className="h-4 w-4 text-orange-500" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-muted-foreground">Attachments</p>
                                                        <p className="text-sm font-semibold">{project.attachments?.length || 0} files</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-gradient-to-br from-purple-500/20 to-purple-500/10 rounded-lg">
                                                        <RefreshCw className="h-4 w-4 text-purple-500" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-muted-foreground">Last Updated</p>
                                                        <p className="text-sm font-semibold">
                                                            {new Date(project.updatedAt).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex justify-between items-center mt-4 pt-4 border-t text-xs text-muted-foreground">
                                                <span>Created: {new Date(project.createdAt).toLocaleDateString()}</span>
                                                <span>Updated: {new Date(project.updatedAt).toLocaleDateString()}</span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                        </div>
                    </section>
                </div>
            </SidebarInset >
        </SidebarProvider >
    )
}