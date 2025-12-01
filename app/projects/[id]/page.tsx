"use client";

import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    Calendar,
    DollarSign,
    MapPin,
    Clock,
    Briefcase,
    FileText,
    ArrowLeft,
} from "lucide-react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { getProjectById } from "@/services/projects-services";
import FreelanceEstimationForm from "@/components/estimate";
import { useProjectStore } from "@/store/projects-store";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectDetailPage() {
    const { id }: { id: string } = useParams();
    const projects = useProjectStore((state) => state.projects);
    console.log(projects);

    // const [project, setProject] = useState<ProjectType>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchedProjects = async () => {
            try {
                await getProjectById(id)
            } catch (error) {
                console.error("Error fetching project:", error);
                toast.error("Failed to fetch projectsdetails.");
            } finally {
                setLoading(false);
            }
        };
        fetchedProjects();
    }, [id]);

    const formatBudget = (min: number, max: number, type: string) => {
        if (type === "hourly") {
            return `$${min} - $${max}/hr`;
        }
        return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
    };

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
                <div className="min-h-screen p-4 md:p-8">
                    <div className="max-w-6xl mx-auto">
                        {/* Back button */}
                        <div className="mb-6">
                            <Button variant="ghost" onClick={() => window.history.back()}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Projects
                            </Button>
                        </div>

                        {loading ? (
                            // ================== LOADING STATE ==================
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-pulse">
                                {/* Left Section Skeleton */}
                                <div className="lg:col-span-2 space-y-6">
                                    <Card>
                                        <CardHeader>
                                            <Skeleton className="h-8 w-64 mb-4" />
                                            <div className="flex gap-2 mb-3">
                                                <Skeleton className="h-6 w-32 rounded-full" />
                                                <Skeleton className="h-6 w-28 rounded-full" />
                                            </div>
                                            <Skeleton className="h-4 w-40" />
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            <div>
                                                <Skeleton className="h-5 w-48 mb-3" />
                                                <div className="space-y-2">
                                                    <Skeleton className="h-4 w-full" />
                                                    <Skeleton className="h-4 w-5/6" />
                                                    <Skeleton className="h-4 w-4/5" />
                                                </div>
                                            </div>
                                            <Separator />
                                            <div>
                                                <Skeleton className="h-5 w-40 mb-3" />
                                                <div className="flex flex-wrap gap-2">
                                                    {[...Array(4)].map((_, i) => (
                                                        <Skeleton
                                                            key={i}
                                                            className="h-6 w-20 rounded-full"
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Right Section Skeleton */}
                                <div className="space-y-6">
                                    <Card>
                                        <CardHeader>
                                            <Skeleton className="h-5 w-40 mb-2" />
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            {[...Array(3)].map((_, i) => (
                                                <div key={i} className="space-y-2">
                                                    <Skeleton className="h-4 w-24" />
                                                    <Skeleton className="h-4 w-32" />
                                                </div>
                                            ))}
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader>
                                            <Skeleton className="h-5 w-40 mb-2" />
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <Skeleton className="h-12 w-12 rounded-full" />
                                                <div className="space-y-2">
                                                    <Skeleton className="h-4 w-24" />
                                                    <Skeleton className="h-3 w-16" />
                                                </div>
                                            </div>
                                            <Separator />
                                            <div>
                                                <Skeleton className="h-8 w-16" />
                                                <Skeleton className="h-3 w-10" />
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardContent className="pt-6 space-y-3">
                                            <Skeleton className="h-10 w-full rounded-md" />
                                            <Skeleton className="h-10 w-full rounded-md" />
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        ) : Object.keys(projects).length !== 0 ? (
                            // ================== projectsDATA ==================
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Left Side */}
                                <div className="lg:col-span-2 space-y-6">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-3xl mb-3">
                                                {projects[0].title}
                                            </CardTitle>
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                <Badge variant="outline">{projects[0].category}</Badge>
                                                <Badge variant="outline">{projects[0].subCategory}</Badge>
                                            </div>
                                            <CardDescription className="flex items-center gap-2 text-sm">
                                                <Calendar className="h-4 w-4" />
                                                Posted on{" "}
                                                {new Date(projects[0].createdAt).toLocaleDateString()}
                                            </CardDescription>
                                        </CardHeader>

                                        <CardContent>
                                            <div className="space-y-6">
                                                {/* Description */}
                                                <div>
                                                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                                        <FileText className="h-5 w-5" />
                                                        projectsDescription
                                                    </h3>
                                                    <p className="leading-relaxed">
                                                        {projects[0].description}
                                                    </p>
                                                </div>

                                                <Separator />

                                                {/* Skills */}
                                                <div>
                                                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                                        <Briefcase className="h-5 w-5" />
                                                        Skills Required
                                                    </h3>
                                                    <div className="flex flex-wrap gap-2">
                                                        {projects[0].skills.map((skill) => (
                                                            <Badge
                                                                key={skill}
                                                                variant="secondary"
                                                                className="text-sm py-1"
                                                            >
                                                                {skill}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Right Side */}
                                <div className="space-y-6">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>projectsDetails</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="flex items-start gap-3">
                                                <DollarSign className="h-5 w-5 mt-0.5" />
                                                <div className="flex-1">
                                                    <p className="text-sm mb-1">Budget</p>
                                                    <p className="font-semibold text-lg">
                                                        {formatBudget(
                                                            projects[0].minBudget,
                                                            projects[0].maxBudget,
                                                            projects[0].budgetType
                                                        )}
                                                    </p>
                                                    <p className="text-xs mt-1 capitalize">
                                                        {projects[0].budgetType} Rate
                                                    </p>
                                                </div>
                                            </div>

                                            <Separator />

                                            <div className="flex items-start gap-3">
                                                <Clock className="h-5 w-5 mt-0.5" />
                                                <div className="flex-1">
                                                    <p className="text-sm mb-1">Duration</p>
                                                    <p className="font-semibold">
                                                        {projects[0].expectedDuration}
                                                    </p>
                                                </div>
                                            </div>

                                            <Separator />

                                            <div className="flex items-start gap-3">
                                                <MapPin className="h-5 w-5 mt-0.5" />
                                                <div className="flex-1">
                                                    <p className="text-sm mb-1">Location</p>
                                                    <p className="font-semibold capitalize">
                                                        {projects[0].locationPreference}
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader>
                                            <CardTitle>About the Client</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-12 w-12">
                                                        <AvatarFallback className="text-lg">
                                                            {projects[0].user.name
                                                                .split(" ")
                                                                .map((n) => n[0])
                                                                .join("")}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="font-semibold">
                                                            {projects[0].user.name}
                                                        </p>
                                                    </div>
                                                </div>

                                                <Separator />

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <p className="text-2xl font-bold">4.8</p>
                                                        <p className="text-xs">Rating</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardContent className="pt-6 space-y-3">
                                            <FreelanceEstimationForm project={projects[0]} />
                                            <Button variant="outline" className="w-full" size="lg">
                                                Save Project
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        ) : (
                            <p className="text-muted-foreground">No projectsfound.</p>
                        )}
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
