"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { X, User, Briefcase, MapPin, DollarSign } from "lucide-react";

export default function CompleteProfilePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        username: "",
        bio: "",
        about: "",
        location: "",
        timezone: "",
        hourlyRate: "",
        profileImage: "",
    });

    const [skills, setSkills] = useState<string[]>([]);
    const [skillInput, setSkillInput] = useState("");

    const [languages, setLanguages] = useState<string[]>([]);
    const [languageInput, setLanguageInput] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const addSkill = () => {
        if (skillInput.trim() && !skills.includes(skillInput.trim())) {
            setSkills([...skills, skillInput.trim()]);
            setSkillInput("");
        }
    };

    const removeSkill = (skill: string) => {
        setSkills(skills.filter((s) => s !== skill));
    };

    const addLanguage = () => {
        if (languageInput.trim() && !languages.includes(languageInput.trim())) {
            setLanguages([...languages, languageInput.trim()]);
            setLanguageInput("");
        }
    };

    const removeLanguage = (language: string) => {
        setLanguages(languages.filter((l) => l !== language));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("/api/profile/complete", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    skills,
                    languages,
                    hourlyRate: formData.hourlyRate ? parseFloat(formData.hourlyRate) : null,
                }),
            });

            if (response.ok) {
                router.push("/dashboard");
            } else {
                alert("Failed to update profile");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("An error occurred");
        } finally {
            setLoading(false);
        }
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

                <div className="min-h-screen">
                    <section className="py-8 px-6">
                        <div className="container mx-auto max-w-5xl">
                            {/* Header */}
                            <div className="mb-8">
                                <h1 className="text-3xl font-bold mb-2">Complete Your Profile</h1>
                                <p className="text-muted-foreground">
                                    Help us know more about you to get started on your freelancing journey
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Basic Information */}
                                <Card className="border-2">
                                    <CardHeader>
                                        <div className="flex items-center gap-2">
                                            <User className="h-5 w-5" />
                                            <CardTitle>Basic Information</CardTitle>
                                        </div>
                                        <CardDescription>Tell us about yourself</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="username">Username *</Label>
                                                <Input
                                                    id="username"
                                                    name="username"
                                                    value={formData.username}
                                                    onChange={handleInputChange}
                                                    placeholder="johndoe_dev"
                                                    required
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="profileImage">Profile Image URL</Label>
                                                <Input
                                                    id="profileImage"
                                                    name="profileImage"
                                                    value={formData.profileImage}
                                                    onChange={handleInputChange}
                                                    placeholder="https://example.com/image.jpg"
                                                    type="url"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="bio">Bio / Tagline *</Label>
                                            <Input
                                                id="bio"
                                                name="bio"
                                                value={formData.bio}
                                                onChange={handleInputChange}
                                                placeholder="Senior Web Developer & UI/UX Designer"
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="about">About You</Label>
                                            <Textarea
                                                id="about"
                                                name="about"
                                                value={formData.about}
                                                onChange={handleInputChange}
                                                placeholder="Tell us more about your experience and expertise..."
                                                rows={5}
                                            />
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Location & Work Details */}
                                <Card className="border-2">
                                    <CardHeader>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-5 w-5" />
                                            <CardTitle>Location & Availability</CardTitle>
                                        </div>
                                        <CardDescription>Where you work and your availability</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="location">Location *</Label>
                                                <Input
                                                    id="location"
                                                    name="location"
                                                    value={formData.location}
                                                    onChange={handleInputChange}
                                                    placeholder="San Francisco, CA"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="timezone">Timezone</Label>
                                                <Select
                                                    value={formData.timezone}
                                                    onValueChange={(value) =>
                                                        setFormData({ ...formData, timezone: value })
                                                    }
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select timezone" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="UTC">UTC</SelectItem>
                                                        <SelectItem value="Asia/Kolkata">Asia/Kolkata (IST)</SelectItem>
                                                        <SelectItem value="America/New_York">America/New York (EST)</SelectItem>
                                                        <SelectItem value="America/Los_Angeles">America/Los Angeles (PST)</SelectItem>
                                                        <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
                                                        <SelectItem value="Asia/Tokyo">Asia/Tokyo (JST)</SelectItem>
                                                        <SelectItem value="Australia/Sydney">Australia/Sydney (AEST)</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="hourlyRate">Hourly Rate (USD)</Label>
                                            <div className="relative">
                                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    id="hourlyRate"
                                                    name="hourlyRate"
                                                    type="number"
                                                    step="0.01"
                                                    value={formData.hourlyRate}
                                                    onChange={handleInputChange}
                                                    placeholder="75.00"
                                                    className="pl-9"
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Skills & Languages */}
                                <Card className="border-2">
                                    <CardHeader>
                                        <div className="flex items-center gap-2">
                                            <Briefcase className="h-5 w-5" />
                                            <CardTitle>Skills & Languages</CardTitle>
                                        </div>
                                        <CardDescription>Your expertise and communication abilities</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        {/* Skills */}
                                        <div className="space-y-2">
                                            <Label htmlFor="skills">Skills *</Label>
                                            <div className="flex gap-2">
                                                <Input
                                                    id="skills"
                                                    value={skillInput}
                                                    onChange={(e) => setSkillInput(e.target.value)}
                                                    placeholder="Add a skill (e.g., React, TypeScript)"
                                                    onKeyPress={(e) => {
                                                        if (e.key === "Enter") {
                                                            e.preventDefault();
                                                            addSkill();
                                                        }
                                                    }}
                                                />
                                                <Button type="button" onClick={addSkill} variant="secondary">
                                                    Add
                                                </Button>
                                            </div>
                                            {skills.length === 0 && (
                                                <p className="text-sm text-muted-foreground">At least one skill is required</p>
                                            )}
                                            {skills.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mt-3">
                                                    {skills.map((skill, index) => {
                                                        const colors = [
                                                            "border-primary/30",
                                                            "border-secondary/30",
                                                            "border-green-500/30",
                                                            "border-blue-500/30",
                                                            "border-purple-500/30",
                                                            "border-orange-500/30",
                                                            "border-pink-500/30",
                                                            "border-indigo-500/30"
                                                        ];
                                                        const colorClass = colors[index % colors.length];
                                                        return (
                                                            <Badge
                                                                key={skill}
                                                                variant="secondary"
                                                                className={`${colorClass} px-3 py-2 text-sm`}
                                                            >
                                                                {skill}
                                                                <X
                                                                    className="h-3 w-3 ml-1 cursor-pointer"
                                                                    onClick={() => removeSkill(skill)}
                                                                />
                                                            </Badge>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>

                                        {/* Languages */}
                                        <div className="space-y-2">
                                            <Label htmlFor="languages">Languages</Label>
                                            <div className="flex gap-2">
                                                <Input
                                                    id="languages"
                                                    value={languageInput}
                                                    onChange={(e) => setLanguageInput(e.target.value)}
                                                    placeholder="Add a language (e.g., English, Spanish)"
                                                    onKeyPress={(e) => {
                                                        if (e.key === "Enter") {
                                                            e.preventDefault();
                                                            addLanguage();
                                                        }
                                                    }}
                                                />
                                                <Button type="button" onClick={addLanguage} variant="secondary">
                                                    Add
                                                </Button>
                                            </div>
                                            {languages.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mt-3">
                                                    {languages.map((language, index) => {
                                                        const colors = [
                                                            "border-primary/30",
                                                            "border-secondary/30",
                                                            "border-green-500/30",
                                                            "border-blue-500/30"
                                                        ];
                                                        const colorClass = colors[index % colors.length];
                                                        return (
                                                            <Badge
                                                                key={language}
                                                                variant="outline"
                                                                className={`${colorClass} px-3 py-2`}
                                                            >
                                                                {language}
                                                                <X
                                                                    className="h-3 w-3 ml-1 cursor-pointer"
                                                                    onClick={() => removeLanguage(language)}
                                                                />
                                                            </Badge>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Submit Button */}
                                <div className="flex justify-end gap-3">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => router.push("/dashboard")}
                                        disabled={loading}
                                    >
                                        Skip for Now
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={loading || skills.length === 0 || !formData.username || !formData.bio || !formData.location}
                                    >
                                        {loading ? "Saving..." : "Complete Profile"}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}