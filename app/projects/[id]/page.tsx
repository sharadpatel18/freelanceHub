"use client"

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Calendar,
    DollarSign,
    MapPin,
    Clock,
    Briefcase,
    FileText,
    Paperclip,
    ArrowLeft,
    Send
} from 'lucide-react';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import { getProjectById } from '@/services/projects-services';
import { ProjectType } from '@/types/projects';

export default function ProjectDetailPage() {
    const { id }: { id: string } = useParams();
    const [project, setProject] = useState<ProjectType>();

    useEffect(() => {
        const fetchedProject = async () => {
            try {
                const data = await getProjectById(id);
                console.log('Fetched Project:', data);
                setProject(data.data[0]);
            } catch (error) {
                console.error('Error fetching project:', error);
                toast.error('Failed to fetch project details.');
            }
        }
        fetchedProject();
    }, [id]);
    console.log(project);

    const getStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            open: "bg-green-100 text-green-800 border-green-300",
            in_progress: "bg-blue-100 text-blue-800 border-blue-300",
            completed: "bg-gray-100 text-gray-800 border-gray-300",
            cancelled: "bg-red-100 text-red-800 border-red-300"
        };
        return colors[status] || colors.open;
    };

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
                        {/* Header */}
                        <div className="mb-6">
                            <Button variant="ghost" onClick={() => window.history.back()}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Projects
                            </Button>
                        </div>

                        {
                            project && (
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    {/* Main Content */}
                                    <div className="lg:col-span-2 space-y-6">
                                        {/* Project Header Card */}
                                        <Card>
                                            <CardHeader>
                                                <div className="flex items-start justify-between gap-4">
                                                    <div className="flex-1">
                                                        <CardTitle className="text-3xl mb-3">{project.title}</CardTitle>
                                                        <div className="flex flex-wrap gap-2 mb-4">
                                                            {/* <Badge className={getStatusColor(project.status)}>
                                                                {project.status.replace('_', ' ').toUpperCase()}
                                                            </Badge> */}
                                                            <Badge variant="outline">{project.category}</Badge>
                                                            <Badge variant="outline">{project.subCategory}</Badge>
                                                        </div>
                                                    </div>
                                                </div>
                                                <CardDescription className="flex items-center gap-2 text-sm">
                                                    <Calendar className="h-4 w-4" />
                                                    Posted on {new Date(project.createdAt).toLocaleDateString()}
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="space-y-6">
                                                    {/* Description */}
                                                    <div>
                                                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                                            <FileText className="h-5 w-5" />
                                                            Project Description
                                                        </h3>
                                                        <p className="leading-relaxed">{project.description}</p>
                                                    </div>
                                                    <Separator />

                                                    {/* Skills Required */}
                                                    <div>
                                                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                                            <Briefcase className="h-5 w-5" />
                                                            Skills Required
                                                        </h3>
                                                        <div className="flex flex-wrap gap-2">
                                                            {project.skills.map((skill) => (
                                                                <Badge key={skill} variant="secondary" className="text-sm py-1">
                                                                    {skill}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Attachments */}
                                                    {project.attachments.length > 0 && (
                                                        <>
                                                            <Separator />
                                                            <div>
                                                                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                                                    <Paperclip className="h-5 w-5" />
                                                                    Attachments
                                                                </h3>
                                                                <div className="space-y-2">
                                                                    {project.attachments.map((file) => (
                                                                        <div key={file} className="flex items-center gap-2 p-3 transition-colors cursor-pointer">
                                                                            <Paperclip className="h-4 w-4" />
                                                                            <span className="text-sm">{file}</span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    {/* Sidebar */}
                                    <div className="space-y-6">
                                        {/* Budget & Timeline Card */}
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Project Details</CardTitle>
                                            </CardHeader>
                                            <CardContent className="space-y-4">
                                                <div className="flex items-start gap-3">
                                                    <DollarSign className="h-5 w-5 mt-0.5" />
                                                    <div className="flex-1">
                                                        <p className="text-sm mb-1">Budget</p>
                                                        <p className="font-semibold text-lg">
                                                            {formatBudget(project.minBudget, project.maxBudget, project.budgetType)}
                                                        </p>
                                                        <p className="text-xs mt-1 capitalize">
                                                            {project.budgetType} Rate
                                                        </p>
                                                    </div>
                                                </div>

                                                <Separator />

                                                <div className="flex items-start gap-3">
                                                    <Clock className="h-5 w-5 mt-0.5" />
                                                    <div className="flex-1">
                                                        <p className="text-sm mb-1">Duration</p>
                                                        <p className="font-semibold">{project.expectedDuration}</p>
                                                    </div>
                                                </div>

                                                <Separator />

                                                <div className="flex items-start gap-3">
                                                    <MapPin className="h-5 w-5 mt-0.5" />
                                                    <div className="flex-1">
                                                        <p className="text-sm mb-1">Location</p>
                                                        <p className="font-semibold capitalize">{project.locationPreference}</p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>

                                        {/* Client Info Card */}
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>About the Client</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-3">
                                                        <Avatar className="h-12 w-12">
                                                            {/* <AvatarImage src={project.user.image} alt='none' /> */}
                                                            <AvatarFallback className="text-lg">
                                                                {project.user.name.split(' ').map(n => n[0]).join('')}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <p className="font-semibold">{project.user.name}</p>
                                                            {/* <p className="text-sm">Member since {new Date(project.user.createdAt).toLocaleDateString}</p> */}
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

                                        {/* Action Buttons */}
                                        <Card>
                                            <CardContent className="pt-6 space-y-3">
                                                <Button className="w-full" size="lg">
                                                    <Send className="mr-2 h-4 w-4" />
                                                    Submit Proposal
                                                </Button>
                                                <Button variant="outline" className="w-full" size="lg">
                                                    Save Project
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}