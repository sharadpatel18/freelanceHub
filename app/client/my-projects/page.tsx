"use client"

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Briefcase, Search, Calendar, DollarSign, MapPin, Clock, Edit, Trash2, Eye, Loader2 } from 'lucide-react';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { createProject, getProjectByUserId, deleteProjectByUserId } from '@/services/projects-services';

const categories = [
    { value: 'web-development', label: 'Web Development' },
    { value: 'mobile-development', label: 'Mobile Development' },
    { value: 'design', label: 'Design' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'writing', label: 'Writing' },
    { value: 'data-science', label: 'Data Science' },
];

const durations = [
    { value: 'less-than-1-month', label: 'Less than 1 month' },
    { value: '1-3-months', label: '1-3 months' },
    { value: '3-6-months', label: '3-6 months' },
    { value: 'more-than-6-months', label: 'More than 6 months' },
];

const locationPreferences = [
    { value: 'remote', label: 'Remote' },
    { value: 'onsite', label: 'Onsite' },
    { value: 'hybrid', label: 'Hybrid' },
];

const statusColors: { [key: string]: string } = {
    open: 'bg-green-100 text-green-800 border-green-200',
    in_progress: 'bg-blue-100 text-blue-800 border-blue-200',
    completed: 'bg-gray-100 text-gray-800 ',
    cancelled: 'bg-red-100 text-red-800 border-red-200'
};

const statusLabels: { [key: string]: string } = {
    open: 'Open',
    in_progress: 'In Progress',
    completed: 'Completed',
    cancelled: 'Cancelled'
};

function ProjectFormDialog({ onProjectCreated }: { onProjectCreated: (project: any) => void }) {
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        subCategory: '',
        budgetType: 'fixed',
        minBudget: '',
        maxBudget: '',
        expectedDuration: '',
        locationPreference: 'remote',
    });

    const [skills, setSkills] = useState<string[]>([]);
    const [skillInput, setSkillInput] = useState('');

    const handleInputChange = (field: string, value: string | number) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const addSkill = () => {
        if (skillInput.trim() && !skills.includes(skillInput.trim())) {
            setSkills([...skills, skillInput.trim()]);
            setSkillInput('');
        }
    };

    const removeSkill = (skillToRemove: string) => {
        setSkills(skills.filter(skill => skill !== skillToRemove));
    };

    const handleSubmit = async () => {
        if (!formData.title || !formData.description) {
            alert('Please fill in all required fields');
            return;
        }

        setIsSubmitting(true);

        try {
            const projectData = {
                ...formData,
                skills,
                minBudget: formData.minBudget ? parseFloat(formData.minBudget) : null,
                maxBudget: formData.maxBudget ? parseFloat(formData.maxBudget) : null,
                status: 'open',
                createdAt: new Date().toISOString().split('T')[0],
                proposalsCount: 0
            };

            const res = await createProject(projectData);

            // Pass the created project back to parent
            onProjectCreated(res);

            // Reset form
            setFormData({
                title: '',
                description: '',
                category: '',
                subCategory: '',
                budgetType: 'fixed',
                minBudget: '',
                maxBudget: '',
                expectedDuration: '',
                locationPreference: 'remote',
            });
            setSkills([]);
            setOpen(false);
        } catch (error) {
            console.error('Error creating project:', error);
            alert('Failed to create project. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Post a Project
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl">
                        <Briefcase className="w-6 h-6" />
                        Create New Project
                    </DialogTitle>
                    <DialogDescription>
                        Fill in the details below to post your project and find the perfect freelancer.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 mt-4">
                    <div className="space-y-2">
                        <Label htmlFor="title" className="text-base font-semibold">
                            Project Title *
                        </Label>
                        <Input
                            id="title"
                            placeholder="e.g., Build a responsive e-commerce website"
                            value={formData.title}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                            className="text-base"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-base font-semibold">
                            Project Description *
                        </Label>
                        <Textarea
                            id="description"
                            placeholder="Describe your project in detail..."
                            value={formData.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            rows={5}
                            className="text-base resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="category" className="text-base font-semibold">
                                Category
                            </Label>
                            <Select
                                value={formData.category}
                                onValueChange={(value) => handleInputChange('category', value)}
                            >
                                <SelectTrigger id="category">
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((cat) => (
                                        <SelectItem key={cat.value} value={cat.value}>
                                            {cat.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="subCategory" className="text-base font-semibold">
                                Sub-category
                            </Label>
                            <Input
                                id="subCategory"
                                placeholder="e.g., React Development"
                                value={formData.subCategory}
                                onChange={(e) => handleInputChange('subCategory', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-base font-semibold">Budget Type *</Label>
                        <div className="flex gap-4">
                            <Button
                                type="button"
                                variant={formData.budgetType === 'fixed' ? 'default' : 'outline'}
                                onClick={() => handleInputChange('budgetType', 'fixed')}
                                className="flex-1"
                            >
                                Fixed Price
                            </Button>
                            <Button
                                type="button"
                                variant={formData.budgetType === 'hourly' ? 'default' : 'outline'}
                                onClick={() => handleInputChange('budgetType', 'hourly')}
                                className="flex-1"
                            >
                                Hourly Rate
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="minBudget" className="text-base font-semibold">
                                Min Budget ($)
                            </Label>
                            <Input
                                id="minBudget"
                                type="number"
                                step="0.01"
                                placeholder="1000"
                                value={formData.minBudget}
                                onChange={(e) => handleInputChange('minBudget', e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="maxBudget" className="text-base font-semibold">
                                Max Budget ($)
                            </Label>
                            <Input
                                id="maxBudget"
                                type="number"
                                step="0.01"
                                placeholder="5000"
                                value={formData.maxBudget}
                                onChange={(e) => handleInputChange('maxBudget', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="duration" className="text-base font-semibold">
                            Expected Duration
                        </Label>
                        <Select
                            value={formData.expectedDuration}
                            onValueChange={(value) => handleInputChange('expectedDuration', value)}
                        >
                            <SelectTrigger id="duration">
                                <SelectValue placeholder="Select duration" />
                            </SelectTrigger>
                            <SelectContent>
                                {durations.map((dur) => (
                                    <SelectItem key={dur.value} value={dur.value}>
                                        {dur.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-base font-semibold">Required Skills</Label>
                        <div className="flex gap-2">
                            <Input
                                placeholder="e.g., React, TypeScript"
                                value={skillInput}
                                onChange={(e) => setSkillInput(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        addSkill();
                                    }
                                }}
                            />
                            <Button type="button" onClick={addSkill} size="icon">
                                <Plus className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {skills.map((skill) => (
                                <Badge key={skill} variant="secondary" className="text-sm px-3 py-1">
                                    {skill}
                                    <button
                                        type="button"
                                        onClick={() => removeSkill(skill)}
                                        className="ml-2 hover:text-red-600"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="location" className="text-base font-semibold">
                            Location Preference
                        </Label>
                        <Select
                            value={formData.locationPreference}
                            onValueChange={(value) => handleInputChange('locationPreference', value)}
                        >
                            <SelectTrigger id="location">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {locationPreferences.map((loc) => (
                                    <SelectItem key={loc.value} value={loc.value}>
                                        {loc.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            onClick={handleSubmit}
                            className="bg-blue-600 hover:bg-blue-700"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                'Post Project'
                            )}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

function ProjectCard({ project, onDelete }: { project: any, onDelete: (projectId: string) => void }) {
    return (
        <div className="rounded-lg border p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <Badge className={`${statusColors[project.status]} border`}>
                        {statusLabels[project.status]}
                    </Badge>
                </div>
                <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="text-blue-600 hover:text-blue-700">
                        <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="hover:text-gray-700">
                        <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => onDelete(project.id)}
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            <p className="mb-4 line-clamp-2">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
                {project.skills?.slice(0, 4).map((skill: string) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                    </Badge>
                ))}
                {project.skills?.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                        +{project.skills.length - 4} more
                    </Badge>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm border-t pt-4">
                <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    <span>
                        ${project.minBudget} - ${project.maxBudget}
                        {project.budgetType === 'hourly' ? '/hr' : ''}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span className="capitalize">{project.locationPreference}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium text-blue-600">{project.proposalsCount || 0} proposals</span>
                </div>
            </div>
        </div>
    );
}

export default function ClientProjectsPage() {
    const [isMounted, setIsMounted] = useState(false);
    const [isSessionLoading, setIsSessionLoading] = useState(true);
    const { data: session } = useSession();

    // State for projects and UI
    const [projects, setProjects] = useState<any[]>([]);
    const [isLoadingProjects, setIsLoadingProjects] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsSessionLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    // TODO: Fetch projects from API
    // Uncomment and implement when your GET projects API is ready
    useEffect(() => {
        const fetchProjects = async () => {
            if (!session) return;

            setIsLoadingProjects(true);
            try {
                const data = await getProjectByUserId(); // Replace with your API endpoint
                setProjects(data.data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
                setIsLoadingProjects(false);
            }
        };

        if (!isSessionLoading && session) {
            fetchProjects();
        }
    }, [session, isSessionLoading]);

    const handleProjectCreated = (newProject: any) => {
        setProjects([newProject, ...projects]);
        alert('Project created successfully!');
    };

    const handleDeleteProject = async (projectId: string) => {
        if (confirm('Are you sure you want to delete this project?')) {
            await deleteProjectByUserId(projectId);
            setProjects(projects.filter(p => p.id !== projectId));
        }
    };

    const filteredProjects = projects.filter(project => {
        const matchesSearch =
            (project.title?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
            (project.description?.toLowerCase() || '').includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const stats = {
        total: projects.length,
        open: projects.filter(p => p.status === 'open').length,
        inProgress: projects.filter(p => p.status === 'in_progress').length,
        completed: projects.filter(p => p.status === 'completed').length,
    };

    if (!isSessionLoading && session?.user.role !== "CLIENT") {
        return redirect("/home");
    }

    if (!isMounted) {
        return null;
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
                <div className="min-h-screen p-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                            <div>
                                <h1 className="text-3xl font-bold mb-2">My Projects</h1>
                                <p>Manage and track all your posted projects</p>
                            </div>
                            <ProjectFormDialog onProjectCreated={handleProjectCreated} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                            <div className="rounded-lg border p-4">
                                <div className="text-2xl font-bold">{stats.total}</div>
                                <div className="text-sm">Total Projects</div>
                            </div>
                            <div className="rounded-lg border border-green-200 p-4">
                                <div className="text-2xl font-bold text-green-600">{stats.open}</div>
                                <div className="text-sm">Open</div>
                            </div>
                            <div className="rounded-lg border border-blue-200 p-4">
                                <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
                                <div className="text-sm">In Progress</div>
                            </div>
                            <div className="rounded-lg border p-4">
                                <div className="text-2xl font-bold">{stats.completed}</div>
                                <div className="text-sm">Completed</div>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-4 mb-6">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
                                <Input
                                    placeholder="Search projects..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <Select value={filterStatus} onValueChange={setFilterStatus}>
                                <SelectTrigger className="w-full md:w-48">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Projects</SelectItem>
                                    <SelectItem value="open">Open</SelectItem>
                                    <SelectItem value="in_progress">In Progress</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {isLoadingProjects ? (
                            <div className="flex justify-center items-center py-12">
                                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                                <span className="ml-2">Loading projects...</span>
                            </div>
                        ) : filteredProjects.length > 0 ? (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {filteredProjects.map((project) => (
                                    <ProjectCard
                                        key={project.id}
                                        project={project}
                                        onDelete={handleDeleteProject}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-lg border p-12 text-center">
                                <Briefcase className="w-16 h-16 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold mb-2">No projects found</h3>
                                <p className="mb-6">
                                    {searchQuery || filterStatus !== 'all'
                                        ? 'Try adjusting your filters'
                                        : 'Get started by posting your first project'}
                                </p>
                                {!searchQuery && filterStatus === 'all' && (
                                    <ProjectFormDialog onProjectCreated={handleProjectCreated} />
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}