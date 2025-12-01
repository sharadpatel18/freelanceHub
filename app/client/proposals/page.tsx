"use client"

import React, { useState } from 'react';
import { Star, MapPin, Clock, Award, CheckCircle2, X, MessageSquare, User, Briefcase, Calendar, ChevronRight, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';

const ProposalsPage = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [filter, setFilter] = useState('all');

    // Client's projects
    const projects = [
        {
            id: 1,
            title: "E-Commerce Website Development",
            description: "Looking for an experienced developer to build a modern e-commerce platform with payment integration",
            budget: { min: 2000, max: 3000 },
            postedDate: "3 days ago",
            proposalsCount: 12,
            status: "active"
        },
        {
            id: 2,
            title: "Mobile App UI/UX Design",
            description: "Need a creative designer to create user interface designs for a fitness tracking mobile app",
            budget: { min: 1500, max: 2500 },
            postedDate: "1 week ago",
            proposalsCount: 8,
            status: "active"
        },
        {
            id: 3,
            title: "WordPress Blog Customization",
            description: "Customize existing WordPress blog with new theme and plugins",
            budget: { min: 500, max: 1000 },
            postedDate: "2 days ago",
            proposalsCount: 15,
            status: "active"
        },
        {
            id: 4,
            title: "Python Data Analysis Script",
            description: "Create automated data analysis scripts for processing CSV files and generating reports",
            budget: { min: 800, max: 1200 },
            postedDate: "5 days ago",
            proposalsCount: 6,
            status: "active"
        }
    ];

    // Proposals for each project
    const proposalsByProject = {
        1: [
            {
                id: 1,
                freelancer: {
                    name: "Sarah Johnson",
                    avatar: "SJ",
                    rating: 4.9,
                    reviews: 127,
                    location: "New York, USA",
                    hourlyRate: 85,
                    jobSuccess: 98,
                    totalJobs: 156,
                    memberSince: "2020"
                },
                bidAmount: 2500,
                deliveryTime: "7 days",
                coverLetter: "Hi! I'm excited about your project. I have 8+ years of experience in web development, specializing in React and Next.js. I've completed similar projects for enterprise clients and can deliver a high-quality solution within your timeline.",
                skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
                status: "active"
            },
            {
                id: 2,
                freelancer: {
                    name: "Michael Chen",
                    avatar: "MC",
                    rating: 5.0,
                    reviews: 89,
                    location: "San Francisco, USA",
                    hourlyRate: 95,
                    jobSuccess: 100,
                    totalJobs: 89,
                    memberSince: "2019"
                },
                bidAmount: 2800,
                deliveryTime: "5 days",
                coverLetter: "Hello! I'm a full-stack developer with expertise in building scalable applications. I've reviewed your requirements carefully and I'm confident I can exceed your expectations.",
                skills: ["React", "Node.js", "PostgreSQL", "AWS"],
                status: "active"
            },
            {
                id: 3,
                freelancer: {
                    name: "Emily Rodriguez",
                    avatar: "ER",
                    rating: 4.8,
                    reviews: 203,
                    location: "London, UK",
                    hourlyRate: 75,
                    jobSuccess: 96,
                    totalJobs: 215,
                    memberSince: "2018"
                },
                bidAmount: 2200,
                deliveryTime: "10 days",
                coverLetter: "Greetings! I'm a senior developer with a passion for creating beautiful, functional web applications. I've worked with numerous clients globally and understand the importance of delivering quality work on time.",
                skills: ["React", "Vue.js", "Python", "Django"],
                status: "active"
            }
        ],
        2: [
            {
                id: 4,
                freelancer: {
                    name: "Alex Martinez",
                    avatar: "AM",
                    rating: 4.9,
                    reviews: 156,
                    location: "Barcelona, Spain",
                    hourlyRate: 70,
                    jobSuccess: 97,
                    totalJobs: 162,
                    memberSince: "2019"
                },
                bidAmount: 1800,
                deliveryTime: "12 days",
                coverLetter: "I'm a UI/UX designer specializing in mobile applications. I've designed over 50 mobile apps and would love to bring your fitness app vision to life.",
                skills: ["Figma", "Adobe XD", "UI Design", "Prototyping"],
                status: "active"
            }
        ],
        3: [
            {
                id: 5,
                freelancer: {
                    name: "David Kim",
                    avatar: "DK",
                    rating: 4.7,
                    reviews: 94,
                    location: "Seoul, South Korea",
                    hourlyRate: 45,
                    jobSuccess: 95,
                    totalJobs: 98,
                    memberSince: "2021"
                },
                bidAmount: 650,
                deliveryTime: "4 days",
                coverLetter: "WordPress expert here! I've customized hundreds of WordPress sites and can handle your blog customization efficiently.",
                skills: ["WordPress", "PHP", "CSS", "JavaScript"],
                status: "active"
            }
        ],
        4: [
            {
                id: 6,
                freelancer: {
                    name: "Priya Sharma",
                    avatar: "PS",
                    rating: 5.0,
                    reviews: 67,
                    location: "Mumbai, India",
                    hourlyRate: 55,
                    jobSuccess: 100,
                    totalJobs: 67,
                    memberSince: "2020"
                },
                bidAmount: 900,
                deliveryTime: "6 days",
                coverLetter: "I'm a data scientist with extensive experience in Python and data analysis. I can create robust scripts for your CSV processing needs.",
                skills: ["Python", "Pandas", "Data Analysis", "Automation"],
                status: "active"
            }
        ]
    };

    const currentProposals = selectedProject ? (proposalsByProject[selectedProject.id] || []) : [];

    const filteredProposals = filter === 'all'
        ? currentProposals
        : currentProposals.filter(p => {
            if (filter === 'top-rated') return p.freelancer.rating >= 4.9;
            if (filter === 'fastest') return parseInt(p.deliveryTime) <= 7;
            if (filter === 'budget-friendly') return p.bidAmount <= selectedProject?.budget.max * 0.8;
            return true;
        });

    // Project Selection View
    if (!selectedProject) {
        return (
            <SidebarProvider
                style={{
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties}
            >
                <AppSidebar variant="inset" />
                <SidebarInset>
                    <SiteHeader />
                    <div className="min-h-screen bg-background">
                        <div className="py-8 px-6">
                            <div className="max-w-7xl mx-auto">
                                <h1 className="te   xt-3xl font-bold mb-2">Your Projects</h1>
                                <p className="text-muted-foreground mb-6">Select a project to view proposals and estimations</p>

                                <div className="grid grid-cols-1 gap-4">
                                    {projects.map((project) => (
                                        <div
                                            key={project.id}
                                            onClick={() => setSelectedProject(project)}
                                            className="rounded-lg border shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer hover:border-primary/50"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-start gap-3 mb-3">
                                                        <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center flex-shrink-0">
                                                            <Package className="h-6 w-6 text-white" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                                                            <p className="text-muted-foreground text-sm mb-2">{project.description}</p>
                                                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                                <span>Posted {project.postedDate}</span>
                                                                <span>•</span>
                                                                <span className="font-medium text-foreground">
                                                                    {project.proposalsCount} proposals
                                                                </span>
                                                                <span>•</span>
                                                                <span>Budget: ${project.budget.min} - ${project.budget.max}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0 ml-4" />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {projects.length === 0 && (
                                    <div className="rounded-lg border p-12 text-center">
                                        <Briefcase className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                                        <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
                                        <p className="text-muted-foreground">Create your first project to start receiving proposals.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        );
    }

    // Proposals View
    return (
        <SidebarProvider
            style={{
                "--sidebar-width": "calc(var(--spacing) * 72)",
                "--header-height": "calc(var(--spacing) * 12)",
            } as React.CSSProperties}
        >
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <div className="min-h-screen bg-background">
                    <div className="py-8 px-6">
                        <div className="max-w-7xl mx-auto">
                            {/* Back button and header */}
                            <Button
                                onClick={() => setSelectedProject(null)}
                                className="mb-4 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border border-input hover:bg-accent hover:text-accent-foreground h-9 px-4"
                            >
                                ← Back to Projects
                            </Button>

                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h1 className="text-3xl font-bold mb-2">{selectedProject.title}</h1>
                                    <p className="text-muted-foreground">
                                        Posted {selectedProject.postedDate} • Budget: ${selectedProject.budget.min} - ${selectedProject.budget.max} • {currentProposals.length} proposals
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <Button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border border-input hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                                        <MessageSquare className="h-4 w-4 mr-2" />
                                        Message All
                                    </Button>
                                    <Button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                                        Close Project
                                    </Button>
                                </div>
                            </div>

                            {/* Filters */}
                            <div className="flex gap-2 mb-6">
                                <Button
                                    onClick={() => setFilter('all')}
                                    className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors h-9 px-4 py-2 ${filter === 'all'
                                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                                        : 'border border-input hover:bg-accent hover:text-accent-foreground'
                                        }`}
                                >
                                    All Proposals ({currentProposals.length})
                                </Button>
                                <Button
                                    onClick={() => setFilter('top-rated')}
                                    className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors h-9 px-4 py-2 ${filter === 'top-rated'
                                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                                        : 'border border-input hover:bg-accent hover:text-accent-foreground'
                                        }`}
                                >
                                    Top Rated
                                </Button>
                                <Button
                                    onClick={() => setFilter('fastest')}
                                    className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors h-9 px-4 py-2 ${filter === 'fastest'
                                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                                        : 'border border-input hover:bg-accent hover:text-accent-foreground'
                                        }`}
                                >
                                    Fastest Delivery
                                </Button>
                                <Button
                                    onClick={() => setFilter('budget-friendly')}
                                    className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors h-9 px-4 py-2 ${filter === 'budget-friendly'
                                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                                        : 'border border-input hover:bg-accent hover:text-accent-foreground'
                                        }`}
                                >
                                    Budget Friendly
                                </Button>
                            </div>

                            {/* Proposals List */}
                            <div className="grid grid-cols-1 gap-4">
                                {filteredProposals.map((proposal) => (
                                    <div key={proposal.id} className="rounded-lg border shadow-sm overflow-hidden">
                                        <div className="p-6">
                                            {/* Freelancer Header */}
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex gap-4">
                                                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                                                        {proposal.freelancer.avatar}
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <h3 className="text-xl font-semibold">{proposal.freelancer.name}</h3>
                                                            <div className="flex items-center gap-1">
                                                                <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400" />
                                                                <span className="font-semibold">{proposal.freelancer.rating}</span>
                                                                <span className="text-sm text-muted-foreground">({proposal.freelancer.reviews})</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                            <div className="flex items-center gap-1">
                                                                <MapPin className="h-4 w-4" />
                                                                {proposal.freelancer.location}
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <Calendar className="h-4 w-4" />
                                                                Member since {proposal.freelancer.memberSince}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-2xl font-bold mb-1">${proposal.bidAmount}</div>
                                                    <div className="text-sm text-muted-foreground">Fixed Price</div>
                                                </div>
                                            </div>

                                            {/* Stats */}
                                            <div className="grid grid-cols-4 gap-4 mb-4 p-4 rounded-lg bg-muted/50">
                                                <div>
                                                    <div className="text-sm text-muted-foreground mb-1">Hourly Rate</div>
                                                    <div className="font-semibold">${proposal.freelancer.hourlyRate}/hr</div>
                                                </div>
                                                <div>
                                                    <div className="text-sm text-muted-foreground mb-1">Job Success</div>
                                                    <div className="font-semibold flex items-center gap-1">
                                                        {proposal.freelancer.jobSuccess}%
                                                        <CheckCircle2 className="h-4 w-4 stroke-green-600" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-sm text-muted-foreground mb-1">Total Jobs</div>
                                                    <div className="font-semibold">{proposal.freelancer.totalJobs}</div>
                                                </div>
                                                <div>
                                                    <div className="text-sm text-muted-foreground mb-1">Delivery</div>
                                                    <div className="font-semibold flex items-center gap-1">
                                                        <Clock className="h-4 w-4" />
                                                        {proposal.deliveryTime}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Cover Letter */}
                                            <div className="mb-4">
                                                <h4 className="font-semibold mb-2">Cover Letter</h4>
                                                <p className="text-muted-foreground leading-relaxed">
                                                    {proposal.coverLetter}
                                                </p>
                                            </div>

                                            {/* Skills */}
                                            <div className="mb-4">
                                                <h4 className="font-semibold mb-2">Skills</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {proposal.skills.map((skill) => (
                                                        <span
                                                            key={skill}
                                                            className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium"
                                                        >
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex gap-2 pt-4 border-t">
                                                <Button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6">
                                                    <Award className="h-4 w-4 mr-2" />
                                                    Hire Freelancer
                                                </Button>
                                                <Button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border border-input hover:bg-accent hover:text-accent-foreground h-10 px-6">
                                                    <MessageSquare className="h-4 w-4 mr-2" />
                                                    Message
                                                </Button>
                                                <Button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border border-input hover:bg-accent hover:text-accent-foreground h-10 px-6">
                                                    <User className="h-4 w-4 mr-2" />
                                                    View Profile
                                                </Button>
                                                <Button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border border-input hover:bg-accent hover:text-accent-foreground h-10 px-4 ml-auto">
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {filteredProposals.length === 0 && currentProposals.length > 0 && (
                                <div className="rounded-lg border p-12 text-center">
                                    <Briefcase className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                                    <h3 className="text-lg font-semibold mb-2">No proposals match your filters</h3>
                                    <p className="text-muted-foreground">Try adjusting your filters to see more results.</p>
                                </div>
                            )}

                            {currentProposals.length === 0 && (
                                <div className="rounded-lg border p-12 text-center">
                                    <Briefcase className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                                    <h3 className="text-lg font-semibold mb-2">No proposals yet</h3>
                                    <p className="text-muted-foreground">Freelancers haven't submitted proposals for this project yet.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
};

export default ProposalsPage;