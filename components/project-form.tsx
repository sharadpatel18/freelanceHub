import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Briefcase } from 'lucide-react';

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

export default function ProjectFormDialog() {
    const [open, setOpen] = useState(false);
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
    const [skillInput, setSkillInput] = useState<string>('');
    const [attachments, setAttachments] = useState([]);

    const handleInputChange = (field: string, value: string) => {
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

    const handleSubmit = () => {
        if (!formData.title || !formData.description) {
            alert('Please fill in all required fields');
            return;
        }

        const projectData = {
            ...formData,
            skills,
            attachments,
            minBudget: formData.minBudget ? parseFloat(formData.minBudget) : null,
            maxBudget: formData.maxBudget ? parseFloat(formData.maxBudget) : null,
        };

        alert('Project created successfully! Check console for data.');

        // Reset data
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
        setAttachments([]);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
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
                    {/* Title */}
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

                    {/* Description */}
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

                    {/* Category & Sub-category */}
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

                    {/* Budget Type */}
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

                    {/* Budget Range */}
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

                    {/* Expected Duration */}
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

                    {/* Skills */}
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

                    {/* Location Preference */}
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

                    {/* Submit Button */}
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            onClick={handleSubmit}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            Post Project
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}