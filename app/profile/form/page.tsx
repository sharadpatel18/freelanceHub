"use client";

import { useState, useEffect } from "react";
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
import { X, User, Briefcase, MapPin, DollarSign, Loader2, Upload, Image as ImageIcon, Check, Globe, Linkedin, Twitter, Github, LinkIcon, Award, Plus } from "lucide-react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { completeProfile, uploadUserImage } from "@/services/auth-services";

export default function CompleteProfilePage() {
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [imageUploaded, setImageUploaded] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        bio: "",
        about: "",
        location: "",
        timezone: "",
        hourlyRate: 0,
        profileImage: "",
        website: "",
    });
    const [isImageUploadedSuccessfully, setIsImageUploadedSuccessfully] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");

    const [skills, setSkills] = useState<string[]>([]);
    const [skillInput, setSkillInput] = useState("");

    const [languages, setLanguages] = useState<string[]>([]);
    const [languageInput, setLanguageInput] = useState("");

    // Social Links
    const [socialLinks, setSocialLinks] = useState({
        linkedin: "",
        github: "",
        twitter: "",
        portfolio: "",
        other: "",
    });

    // Certificates
    const [certificates, setCertificates] = useState<Array<{
        id: string;
        name: string;
        issuer: string;
        issueDate: string;
        credentialUrl: string;
    }>>([]);
    const [certificateInput, setCertificateInput] = useState({
        name: "",
        issuer: "",
        issueDate: "",
        credentialUrl: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name === "hourlyRate") {
            const numericValue = Number(value);
            if (numericValue <= 0) {
                setFormData((prev) => ({ ...prev, hourlyRate: 1 }));
            } else {
                setFormData((prev) => ({ ...prev, hourlyRate: numericValue }));
            }
            return;
        }

        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSocialLinkChange = (platform: string, value: string) => {
        setSocialLinks((prev) => ({ ...prev, [platform]: value }));
    };

    const handleCertificateInputChange = (field: string, value: string) => {
        setCertificateInput((prev) => ({ ...prev, [field]: value }));
    };

    const addCertificate = () => {
        if (certificateInput.name.trim() && certificateInput.issuer.trim()) {
            const newCert = {
                id: Date.now().toString(),
                ...certificateInput,
            };
            setCertificates([...certificates, newCert]);
            setCertificateInput({
                name: "",
                issuer: "",
                issueDate: "",
                credentialUrl: "",
            });
        }
    };

    const removeCertificate = (id: string) => {
        setCertificates(certificates.filter((cert) => cert.id !== id));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                toast.error('Please select an image file');
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                toast.error('Image size should be less than 5MB');
                return;
            }

            setSelectedFile(file);
            setImageUploaded(false);
            setFormData({ ...formData, profileImage: "" });

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setSelectedFile(null);
        setImagePreview("");
        setImageUploaded(false);
        setFormData({ ...formData, profileImage: "" });
    };

    const handleUploadImage = async () => {
        if (!selectedFile) {
            toast.error("Please select an image first");
            return;
        }

        setUploadingImage(true);

        try {
            const imageFormData = new FormData();
            imageFormData.append('file', selectedFile);

            const res = await uploadUserImage(imageFormData);
            setIsImageUploadedSuccessfully(true);
            setFormData({ ...formData, profileImage: res.data.url });
            setImageUploaded(true);
            toast.success("Image uploaded successfully!");
        } catch (error) {
            console.error("Error uploading image:", error);
        } finally {
            setUploadingImage(false);
        }
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
            const profileData = {
                ...formData,
                skills,
                languages,
                socialLinks,
                certificates,
            };
            const res = await completeProfile(profileData);
        } catch (error) {
            console.error("Error updating profile:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto max-w-5xl py-8 px-6">
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
                                    <Label htmlFor="profileImage">Profile Image</Label>
                                    <div className="flex flex-col gap-3">
                                        <div className="flex gap-2">
                                            <Input
                                                id="profileImage"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                className="cursor-pointer"
                                                disabled={uploadingImage}
                                            />
                                            {imagePreview && (
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={removeImage}
                                                    className="shrink-0"
                                                    disabled={uploadingImage}
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>

                                        {imagePreview && (
                                            <div className="flex items-center gap-3">
                                                <div className="w-24 h-24 rounded-lg border-2 border-border overflow-hidden">
                                                    <img
                                                        src={imagePreview}
                                                        alt="Preview"
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>

                                                {!imageUploaded ? (
                                                    <Button
                                                        type="button"
                                                        variant="default"
                                                        size="sm"
                                                        className="shrink-0"
                                                        onClick={handleUploadImage}
                                                        disabled={uploadingImage}
                                                    >
                                                        {isImageUploadedSuccessfully ? (
                                                            <>
                                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                                Uploading...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Upload className="mr-2 h-4 w-4" />
                                                                Upload Image
                                                            </>
                                                        )}
                                                    </Button>
                                                ) : (
                                                    <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                                                        <Check className="h-4 w-4" />
                                                        <span className="font-medium">Image uploaded successfully!</span>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {!imagePreview && (
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <ImageIcon className="h-4 w-4" />
                                                <span>Max size: 5MB • Supported: JPG, PNG, GIF</span>
                                            </div>
                                        )}
                                    </div>
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
                                <Label htmlFor="about">About You *</Label>
                                <Textarea
                                    id="about"
                                    name="about"
                                    value={formData.about}
                                    onChange={handleInputChange}
                                    placeholder="Tell us more about your experience and expertise..."
                                    rows={5}
                                    required
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
                                    <Label htmlFor="timezone">Timezone *</Label>
                                    <Select
                                        value={formData.timezone}
                                        onValueChange={(value) =>
                                            setFormData({ ...formData, timezone: value })
                                        }
                                        required
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
                                <Label htmlFor="hourlyRate">Hourly Rate (USD) *</Label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="hourlyRate"
                                        name="hourlyRate"
                                        type="number"
                                        step="0.01"
                                        min="1"
                                        value={formData.hourlyRate}
                                        onChange={handleInputChange}
                                        placeholder="75.00"
                                        className="pl-9"
                                        required
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
                                <Label htmlFor="languages">Languages *</Label>
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
                                {languages.length === 0 && (
                                    <p className="text-sm text-muted-foreground">At least one language is required</p>
                                )}
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

                    {/* Website & Social Links */}
                    <Card className="border-2">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Globe className="h-5 w-5" />
                                <CardTitle>Website & Social Links</CardTitle>
                            </div>
                            <CardDescription>Share your online presence</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="website">Website / Portfolio</Label>
                                <div className="relative">
                                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="website"
                                        name="website"
                                        type="url"
                                        value={formData.website}
                                        onChange={handleInputChange}
                                        placeholder="https://yourwebsite.com"
                                        className="pl-9"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="linkedin">LinkedIn</Label>
                                    <div className="relative">
                                        <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="linkedin"
                                            type="url"
                                            value={socialLinks.linkedin}
                                            onChange={(e) => handleSocialLinkChange("linkedin", e.target.value)}
                                            placeholder="https://linkedin.com/in/username"
                                            className="pl-9"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="github">GitHub</Label>
                                    <div className="relative">
                                        <Github className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="github"
                                            type="url"
                                            value={socialLinks.github}
                                            onChange={(e) => handleSocialLinkChange("github", e.target.value)}
                                            placeholder="https://github.com/username"
                                            className="pl-9"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="twitter">Twitter / X</Label>
                                    <div className="relative">
                                        <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="twitter"
                                            type="url"
                                            value={socialLinks.twitter}
                                            onChange={(e) => handleSocialLinkChange("twitter", e.target.value)}
                                            placeholder="https://twitter.com/username"
                                            className="pl-9"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="portfolio">Portfolio Site</Label>
                                    <div className="relative">
                                        <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="portfolio"
                                            type="url"
                                            value={socialLinks.portfolio}
                                            onChange={(e) => handleSocialLinkChange("portfolio", e.target.value)}
                                            placeholder="https://portfolio.com"
                                            className="pl-9"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="other">Other Link</Label>
                                <div className="relative">
                                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="other"
                                        type="url"
                                        value={socialLinks.other}
                                        onChange={(e) => handleSocialLinkChange("other", e.target.value)}
                                        placeholder="https://other-platform.com"
                                        className="pl-9"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Certifications */}
                    <Card className="border-2">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Award className="h-5 w-5" />
                                <CardTitle>Certifications</CardTitle>
                            </div>
                            <CardDescription>Add your professional certifications</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-3 p-4 border rounded-lg bg-muted/30">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div className="space-y-2">
                                        <Label htmlFor="certName">Certificate Name</Label>
                                        <Input
                                            id="certName"
                                            value={certificateInput.name}
                                            onChange={(e) => handleCertificateInputChange("name", e.target.value)}
                                            placeholder="AWS Certified Developer"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="certIssuer">Issuing Organization</Label>
                                        <Input
                                            id="certIssuer"
                                            value={certificateInput.issuer}
                                            onChange={(e) => handleCertificateInputChange("issuer", e.target.value)}
                                            placeholder="Amazon Web Services"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div className="space-y-2">
                                        <Label htmlFor="certDate">Issue Date</Label>
                                        <Input
                                            id="certDate"
                                            type="date"
                                            value={certificateInput.issueDate}
                                            onChange={(e) => handleCertificateInputChange("issueDate", e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="certUrl">Credential URL (optional)</Label>
                                        <Input
                                            id="certUrl"
                                            type="url"
                                            value={certificateInput.credentialUrl}
                                            onChange={(e) => handleCertificateInputChange("credentialUrl", e.target.value)}
                                            placeholder="https://credential-url.com"
                                        />
                                    </div>
                                </div>

                                <Button
                                    type="button"
                                    onClick={addCertificate}
                                    variant="secondary"
                                    size="sm"
                                    className="w-full"
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Certificate
                                </Button>
                            </div>

                            {certificates.length > 0 && (
                                <div className="space-y-3">
                                    {certificates.map((cert) => (
                                        <div
                                            key={cert.id}
                                            className="p-4 border rounded-lg bg-card hover:bg-accent/50 transition-colors"
                                        >
                                            <div className="flex justify-between items-start">
                                                <div className="space-y-1 flex-1">
                                                    <div className="flex items-start gap-2">
                                                        <Award className="h-5 w-5 text-primary mt-0.5" />
                                                        <div>
                                                            <h4 className="font-semibold">{cert.name}</h4>
                                                            <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                                                            {cert.issueDate && (
                                                                <p className="text-xs text-muted-foreground mt-1">
                                                                    Issued: {new Date(cert.issueDate).toLocaleDateString()}
                                                                </p>
                                                            )}
                                                            {cert.credentialUrl && (
                                                                <a
                                                                    href={cert.credentialUrl}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-xs text-primary hover:underline inline-flex items-center gap-1 mt-1"
                                                                >
                                                                    View Credential
                                                                    <LinkIcon className="h-3 w-3" />
                                                                </a>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => removeCertificate(cert.id)}
                                                    className="shrink-0"
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {certificates.length === 0 && (
                                <p className="text-sm text-muted-foreground text-center py-4">
                                    No certifications added yet
                                </p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            disabled={loading}
                            className="min-w-[200px]"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                "Complete Profile"
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}