"use client"

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AppSidebar } from "@/components/app-sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit3,
  Camera,
  Award,
  Globe,
  Linkedin,
  Github,
  Twitter,
  CheckCircle,
  Plus,
  ExternalLink,
  Download,
} from "lucide-react"
import { useEffect, useState } from "react"
import { getProfile } from "@/services/auth-services"
import { Skeleton } from "@/components/ui/skeleton"

// Default user data structure
const defaultUser = {
  id: "",
  name: "",
  email: "",
  username: "",
  role: "",
  profileImage: "",
  bio: "",
  about: "",
  location: "",
  timezone: "",
  skills: [],
  languages: [],
  hourlyRate: 0,
  isVerified: false,
  createdAt: new Date(),
  updatedAt: new Date()
}

export default function ProfilePage() {
  const [profileData, setProfileData] = useState(defaultUser)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")


  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true)
        const res = await getProfile()
        setProfileData(res.data.data)
      } catch (err) {
        setError("Failed to load profile data")
        console.error("Error fetching profile:", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProfileData()
  }, [])

  // Loading skeleton component
  if (isLoading) {
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
            {/* Profile Header Skeleton */}
            <section className="py-8 px-6 relative overflow-hidden">
              <div className="container mx-auto relative z-10">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                  {/* Avatar Skeleton */}
                  <div className="relative">
                    <Skeleton className="h-32 w-32 rounded-full" />
                  </div>

                  {/* Profile Info Skeleton */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <Skeleton className="h-8 w-64 mb-2" />
                      <Skeleton className="h-6 w-48 mb-2" />
                      <div className="flex gap-4">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-40" />
                      </div>
                    </div>

                    {/* Stats Skeleton */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[...Array(4)].map((_, i) => (
                        <Skeleton key={i} className="h-16 rounded-lg" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Main Content Skeleton */}
            <section className="px-6 pb-8">
              <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Column */}
                  <div className="lg:col-span-2 space-y-8">
                    {[...Array(3)].map((_, i) => (
                      <Card key={i}>
                        <CardHeader>
                          <Skeleton className="h-6 w-48" />
                        </CardHeader>
                        <CardContent>
                          <Skeleton className="h-4 w-full mb-2" />
                          <Skeleton className="h-4 w-3/4" />
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {[...Array(4)].map((_, i) => (
                      <Card key={i}>
                        <CardHeader>
                          <Skeleton className="h-5 w-32" />
                        </CardHeader>
                        <CardContent>
                          <Skeleton className="h-4 w-full mb-2" />
                          <Skeleton className="h-4 w-3/4" />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </SidebarInset>
      </SidebarProvider>
    )
  }

  // Error state
  if (error) {
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
          <div className="min-h-screen bg-background flex items-center justify-center">
            <Card className="w-full max-w-md">
              <CardContent className="pt-6 text-center">
                <div className="text-destructive mb-4">{error}</div>
                <Button onClick={() => window.location.reload()}>
                  Retry
                </Button>
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      </SidebarProvider>
    )
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

        {profileData.isVerified ? (
          <div className="min-h-screen bg-background">
            {/* Profile Header */}
            <section className="py-8 px-6 relative overflow-hidden">
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
              <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />

              <div className="container mx-auto relative z-10">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                  {/* Profile Avatar */}
                  <div className="relative">
                    <Avatar className="h-32 w-32 ring-4 ring-primary/20">
                      <AvatarImage src={profileData.profileImage || "/placeholder-avatar.jpg"} />
                      <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary text-3xl font-bold">
                        {profileData.name?.split(' ').map(n => n[0]).join('') || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary">
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Profile Info */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                          {profileData.username}
                        </h1>
                        <p className="text-xl text-muted-foreground mb-2">{profileData.bio || "No bio provided"}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{profileData.location || "Location not set"}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>Member since {new Date(profileData.createdAt).getFullYear()}</span>
                          </div>
                          {profileData.isVerified && (
                            <div className="flex items-center gap-1">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span className="text-green-500">Verified</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                              {profileData.role || "USER"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3 mt-4 md:mt-0">
                        <Button variant="outline" className="border-2">
                          <Edit3 className="h-4 w-4 mr-2" />
                          Edit Profile
                        </Button>
                        <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary">
                          <Download className="h-4 w-4 mr-2" />
                          Download CV
                        </Button>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 rounded-lg bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/10">
                        <div className="text-2xl font-bold text-primary">4.9</div>
                        <div className="text-sm text-muted-foreground">Rating</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-gradient-to-r from-green-500/5 to-green-500/5 border border-green-500/10">
                        <div className="text-2xl font-bold text-green-500">47</div>
                        <div className="text-sm text-muted-foreground">Projects</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-gradient-to-r from-blue-500/5 to-blue-500/5 border border-blue-500/10">
                        <div className="text-2xl font-bold text-blue-500">2.1h</div>
                        <div className="text-sm text-muted-foreground">Response</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-gradient-to-r from-yellow-500/5 to-yellow-500/5 border border-yellow-500/10">
                        <div className="text-2xl font-bold text-yellow-500">${profileData.hourlyRate || 0}</div>
                        <div className="text-sm text-muted-foreground">Hourly Rate</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Main Content */}
            <section className="px-6 pb-8">
              <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Column */}
                  <div className="lg:col-span-2 space-y-8">
                    {/* About Section */}
                    <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-xl">About Me</CardTitle>
                            <CardDescription>Tell clients about yourself and your experience</CardDescription>
                          </div>
                          <Button variant="outline" size="sm">
                            <Edit3 className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                          {profileData.about || "No description provided yet."}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Skills Section */}
                    <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-xl">Skills & Expertise</CardTitle>
                            <CardDescription>Your technical skills and specializations</CardDescription>
                          </div>
                          <Button variant="outline" size="sm">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Skill
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-3">
                          {profileData.skills && profileData.skills.length > 0 ? (
                            profileData.skills.map((skill, index) => {
                              const colors = [
                                "from-primary/10 to-primary/5 border-primary/20 text-primary",
                                "from-secondary/10 to-secondary/5 border-secondary/20 text-secondary",
                                "from-green-500/10 to-green-500/5 border-green-500/20 text-green-500",
                                "from-blue-500/10 to-blue-500/5 border-blue-500/20 text-blue-500",
                                "from-purple-500/10 to-purple-500/5 border-purple-500/20 text-purple-500",
                                "from-orange-500/10 to-orange-500/5 border-orange-500/20 text-orange-500",
                                "from-pink-500/10 to-pink-500/5 border-pink-500/20 text-pink-500",
                                "from-indigo-500/10 to-indigo-500/5 border-indigo-500/20 text-indigo-500"
                              ]
                              const colorClass = colors[index % colors.length]
                              return (
                                <Badge
                                  key={skill}
                                  variant="secondary"
                                  className={`bg-gradient-to-r ${colorClass} px-3 py-2 text-sm font-medium`}
                                >
                                  {skill}
                                </Badge>
                              )
                            })
                          ) : (
                            <p className="text-muted-foreground">No skills added yet.</p>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Portfolio Section */}
                    <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-xl">Portfolio</CardTitle>
                            <CardDescription>Showcase your best work and projects</CardDescription>
                          </div>
                          <Button variant="outline" size="sm">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Project
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="group/item">
                            <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg mb-3 flex items-center justify-center">
                              <ExternalLink className="h-8 w-8 text-primary" />
                            </div>
                            <h4 className="font-semibold mb-1">E-commerce Platform</h4>
                            <p className="text-sm text-muted-foreground mb-2">Full-stack React application with modern UI/UX</p>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="text-xs">React</Badge>
                              <Badge variant="secondary" className="text-xs">TypeScript</Badge>
                              <Badge variant="secondary" className="text-xs">Tailwind</Badge>
                            </div>
                          </div>
                          <div className="group/item">
                            <div className="aspect-video bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-lg mb-3 flex items-center justify-center">
                              <ExternalLink className="h-8 w-8 text-secondary" />
                            </div>
                            <h4 className="font-semibold mb-1">Mobile App Design</h4>
                            <p className="text-sm text-muted-foreground mb-2">Complete UI/UX design for fintech mobile app</p>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="text-xs">Figma</Badge>
                              <Badge variant="secondary" className="text-xs">UI/UX</Badge>
                              <Badge variant="secondary" className="text-xs">Mobile</Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* Contact Information */}
                    <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
                      <CardHeader>
                        <CardTitle className="text-lg">Contact Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg">
                            <Mail className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Email</p>
                            <p className="text-sm text-muted-foreground">{profileData.email || "No email provided"}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-lg">
                            <Phone className="h-4 w-4 text-green-500" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Phone</p>
                            <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-lg">
                            <Globe className="h-4 w-4 text-blue-500" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Website</p>
                            <p className="text-sm text-muted-foreground">johndoe.dev</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Social Links */}
                    <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">Social Links</CardTitle>
                          <Button variant="outline" size="sm">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-gradient-to-br from-blue-600/20 to-blue-600/10 rounded-lg">
                            <Linkedin className="h-4 w-4 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">LinkedIn</p>
                            <p className="text-sm text-muted-foreground">linkedin.com/in/johndoe</p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-gradient-to-br from-gray-800/20 to-gray-800/10 rounded-lg">
                            <Github className="h-4 w-4 text-gray-800" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">GitHub</p>
                            <p className="text-sm text-muted-foreground">github.com/johndoe</p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-gradient-to-br from-blue-400/20 to-blue-400/10 rounded-lg">
                            <Twitter className="h-4 w-4 text-blue-400" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Twitter</p>
                            <p className="text-sm text-muted-foreground">@johndoe_dev</p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Languages */}
                    <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
                      <CardHeader>
                        <CardTitle className="text-lg">Languages</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {profileData.languages && profileData.languages.length > 0 ? (
                            profileData.languages.map((language, index) => {
                              const colors = [
                                "bg-primary/20 text-primary border-primary/30",
                                "bg-secondary/20 text-secondary border-secondary/30",
                                "bg-green-500/20 text-green-500 border-green-500/30",
                                "bg-blue-500/20 text-blue-500 border-blue-500/30"
                              ]
                              const colorClass = colors[index % colors.length]
                              return (
                                <Badge
                                  key={language}
                                  variant="secondary"
                                  className={`${colorClass} px-3 py-1`}
                                >
                                  {language}
                                </Badge>
                              )
                            })
                          ) : (
                            <p className="text-muted-foreground">No languages added yet.</p>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Availability */}
                    <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
                      <CardHeader>
                        <CardTitle className="text-lg">Availability</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center mb-4">
                          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-full flex items-center justify-center mb-2">
                            <CheckCircle className="h-8 w-8 text-green-500" />
                          </div>
                          <h3 className="font-semibold text-green-500">Available for Work</h3>
                          <p className="text-sm text-muted-foreground">Ready to take on new projects</p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Hours per week</span>
                            <span className="font-medium">40+</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Response time</span>
                            <span className="font-medium">Within 2 hours</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Timezone</span>
                            <span className="font-medium">{profileData.timezone || "Not specified"}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Certifications */}
                    <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">Certifications</CardTitle>
                          <Button variant="outline" size="sm">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-gradient-to-br from-yellow-500/20 to-yellow-500/10 rounded-lg">
                            <Award className="h-4 w-4 text-yellow-500" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">AWS Certified Developer</p>
                            <p className="text-xs text-muted-foreground">Amazon Web Services</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-lg">
                            <Award className="h-4 w-4 text-blue-500" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Google UX Design Certificate</p>
                            <p className="text-xs text-muted-foreground">Google Career Certificates</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </section>
          </div>
        ) : (
          <div className="min-h-screen bg-background flex items-center justify-center">
            <Card className="w-full max-w-md">
              <CardContent className="pt-6 text-center">
                <h2 className="text-2xl font-bold mb-2">Complete Your Profile</h2>
                <p className="text-muted-foreground mb-4">
                  Your profile is incomplete. Please add your information to get started.
                </p>
                <Button>
                  <Edit3 className="h-4 w-4 mr-2" />
                  Complete Profile
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </SidebarInset>
    </SidebarProvider>
  )
}