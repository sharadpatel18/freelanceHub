"use client"

import React, { useState } from 'react';
import { Star, MapPin, Clock, DollarSign, Award, CheckCircle2, X, ExternalLink, MessageSquare, User, Briefcase, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';

const ProposalsPage = () => {
    const [selectedProposal, setSelectedProposal] = useState(null);
    const [filter, setFilter] = useState('all');

    const proposals = [
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
            coverLetter: "Hi! I'm excited about your project. I have 8+ years of experience in web development, specializing in React and Next.js. I've completed similar projects for enterprise clients and can deliver a high-quality solution within your timeline. My approach involves thorough planning, regular updates, and clean, maintainable code.",
            skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
            portfolio: ["Project 1", "Project 2", "Project 3"],
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
            coverLetter: "Hello! I'm a full-stack developer with expertise in building scalable applications. I've reviewed your requirements carefully and I'm confident I can exceed your expectations. My work is backed by a 100% job success score and I prioritize clear communication throughout the project.",
            skills: ["React", "Node.js", "PostgreSQL", "AWS"],
            portfolio: ["Project A", "Project B"],
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
            coverLetter: "Greetings! I'm a senior developer with a passion for creating beautiful, functional web applications. I've worked with numerous clients globally and understand the importance of delivering quality work on time. Let's discuss how I can help bring your vision to life.",
            skills: ["React", "Vue.js", "Python", "Django"],
            portfolio: ["Project X", "Project Y", "Project Z"],
            status: "active"
        },
        {
            id: 4,
            freelancer: {
                name: "James Wilson",
                avatar: "JW",
                rating: 4.7,
                reviews: 64,
                location: "Toronto, Canada",
                hourlyRate: 70,
                jobSuccess: 94,
                totalJobs: 68,
                memberSince: "2021"
            },
            bidAmount: 2000,
            deliveryTime: "14 days",
            coverLetter: "Hi there! I'm a dedicated developer who loves solving complex problems. Your project aligns perfectly with my skill set, and I'm eager to contribute my expertise to make it successful.",
            skills: ["JavaScript", "React", "MongoDB", "Express"],
            portfolio: ["Portfolio 1", "Portfolio 2"],
            status: "active"
        }
    ];

    const filteredProposals = filter === 'all'
        ? proposals
        : proposals.filter(p => {
            if (filter === 'top-rated') return p.freelancer.rating >= 4.9;
            if (filter === 'fastest') return parseInt(p.deliveryTime) <= 7;
            if (filter === 'budget-friendly') return p.bidAmount <= 2200;
            return true;
        });

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
                    {/* Header */}
                    <div className='py-8 px-6 relative overflow-hidden'>
                        <div className="max-w-7xl mx-auto">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h1 className="text-3xl font-bold mb-2">E-Commerce Website Development</h1>
                                    <p className="text-muted-foreground">Posted 3 days ago • Budget: $2,000 - $3,000</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                                        <MessageSquare className="h-4 w-4 mr-2" />
                                        Message All
                                    </Button>
                                    <Button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                                        Close Project
                                    </Button>
                                </div>
                            </div>

                            {/* Filters */}
                            <div className="flex gap-2">
                                <Button
                                    onClick={() => setFilter('all')}
                                    className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background h-9 px-4 py-2 ${filter === 'all'
                                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                                        : 'border border-input hover:bg-accent hover:text-accent-foreground'
                                        }`}
                                >
                                    All Proposals ({proposals.length})
                                </Button>
                                <Button
                                    onClick={() => setFilter('top-rated')}
                                    className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background h-9 px-4 py-2 ${filter === 'top-rated'
                                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                                        : 'border border-input hover:bg-accent hover:text-accent-foreground'
                                        }`}
                                >
                                    Top Rated
                                </Button>
                                <Button
                                    onClick={() => setFilter('fastest')}
                                    className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background h-9 px-4 py-2 ${filter === 'fastest'
                                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                                        : 'border border-input hover:bg-accent hover:text-accent-foreground'
                                        }`}
                                >
                                    Fastest Delivery
                                </Button>
                                <Button
                                    onClick={() => setFilter('budget-friendly')}
                                    className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background h-9 px-4 py-2 ${filter === 'budget-friendly'
                                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                                        : 'border border-input hover:bg-accent hover:text-accent-foreground'
                                        }`}
                                >
                                    Budget Friendly
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="max-w-7xl mx-auto py-6">
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
                                            <Button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6">
                                                <Award className="h-4 w-4 mr-2" />
                                                Hire Freelancer
                                            </Button>
                                            <Button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-accent hover:text-accent-foreground h-10 px-6">
                                                <MessageSquare className="h-4 w-4 mr-2" />
                                                Message
                                            </Button>
                                            <Button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-accent hover:text-accent-foreground h-10 px-6">
                                                <User className="h-4 w-4 mr-2" />
                                                View Profile
                                            </Button>
                                            <Button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-accent hover:text-accent-foreground h-10 px-4 ml-auto">
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredProposals.length === 0 && (
                            <div className="rounded-lg border p-12 text-center">
                                <Briefcase className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                                <h3 className="text-lg font-semibold mb-2">No proposals found</h3>
                                <p className="text-muted-foreground">Try adjusting your filters to see more results.</p>
                            </div>
                        )}
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
};

export default ProposalsPage;