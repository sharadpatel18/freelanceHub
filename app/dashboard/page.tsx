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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Briefcase,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Clock,
  Star,
  MessageCircle,
  FileText,
  Calendar,
  Target,
  Award,
  Zap,
  Eye,
  CheckCircle,
} from "lucide-react"
import { useAuthStore } from "@/store/user-store"
import { useState } from "react"

export default function Page() {
  const { getUserFromLocalStorage } = useAuthStore();
  const [user, setUser] = useState(getUserFromLocalStorage());
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
          {/* Welcome Section */}
          <section className="py-8 px-6 relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />

            <div className="container mx-auto relative z-10">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                    Welcome back, {user?.data?.name} 👋
                  </h1>
                  <p className="text-muted-foreground">
                    Here's what's happening with your freelance business today.
                  </p>
                </div>
                <div className="flex items-center space-x-3 mt-4 md:mt-0">
                  <Badge variant="secondary" className="bg-gradient-to-r from-green-500/20 to-green-500/10 border-green-500/30">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Active
                  </Badge>
                  <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary">
                    <Zap className="h-4 w-4 mr-2" />
                    Quick Actions
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Stats Overview */}
          <section className="px-6 pb-8">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/20">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Earnings</p>
                        <p className="text-2xl font-bold bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">$12,450</p>
                        <div className="flex items-center mt-1">
                          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                          <span className="text-sm text-green-500 font-medium">+12.5%</span>
                        </div>
                      </div>
                      <div className="p-3 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-lg group-hover:scale-110 transition-transform duration-300">
                        <DollarSign className="h-6 w-6 text-green-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/20">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Active Projects</p>
                        <p className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">8</p>
                        <div className="flex items-center mt-1">
                          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                          <span className="text-sm text-green-500 font-medium">+2 this week</span>
                        </div>
                      </div>
                      <div className="p-3 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg group-hover:scale-110 transition-transform duration-300">
                        <Briefcase className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/20">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Client Rating</p>
                        <p className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">4.9</p>
                        <div className="flex items-center mt-1">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="text-sm text-muted-foreground">Based on 47 reviews</span>
                        </div>
                      </div>
                      <div className="p-3 bg-gradient-to-br from-yellow-500/20 to-yellow-500/10 rounded-lg group-hover:scale-110 transition-transform duration-300">
                        <Star className="h-6 w-6 text-yellow-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/20">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Response Time</p>
                        <p className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">2.1h</p>
                        <div className="flex items-center mt-1">
                          <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
                          <span className="text-sm text-green-500 font-medium">-0.3h faster</span>
                        </div>
                      </div>
                      <div className="p-3 bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-lg group-hover:scale-110 transition-transform duration-300">
                        <Clock className="h-6 w-6 text-blue-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Main Content Grid */}
          <section className="px-6 pb-8">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Projects */}
                <div className="lg:col-span-2">
                  <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-xl">Recent Projects</CardTitle>
                          <CardDescription>Your latest project activities and updates</CardDescription>
                        </div>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View All
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-4 p-4 rounded-lg bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/10">
                        <div className="p-2 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg">
                          <Briefcase className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">E-commerce Website Redesign</h4>
                          <p className="text-sm text-muted-foreground">Client: TechCorp Inc.</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary" className="bg-green-500/20 text-green-700 border-green-500/30">
                            In Progress
                          </Badge>
                          <p className="text-sm text-muted-foreground mt-1">$3,200</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 p-4 rounded-lg bg-gradient-to-r from-secondary/5 to-primary/5 border border-secondary/10">
                        <div className="p-2 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-lg">
                          <FileText className="h-5 w-5 text-secondary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">Mobile App UI/UX Design</h4>
                          <p className="text-sm text-muted-foreground">Client: StartupXYZ</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary" className="bg-blue-500/20 text-blue-700 border-blue-500/30">
                            Review
                          </Badge>
                          <p className="text-sm text-muted-foreground mt-1">$2,800</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 p-4 rounded-lg bg-gradient-to-r from-green-500/5 to-blue-500/5 border border-green-500/10">
                        <div className="p-2 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">Brand Identity Package</h4>
                          <p className="text-sm text-muted-foreground">Client: CreativeStudio</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary" className="bg-green-500/20 text-green-700 border-green-500/30">
                            Completed
                          </Badge>
                          <p className="text-sm text-muted-foreground mt-1">$1,500</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Actions & Messages */}
                <div className="space-y-6">
                  {/* Quick Actions */}
                  <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
                    <CardHeader>
                      <CardTitle className="text-lg">Quick Actions</CardTitle>
                      <CardDescription>Common tasks and shortcuts</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button className="w-full justify-start bg-gradient-to-r from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 border border-primary/20">
                        <FileText className="h-4 w-4 mr-3 text-primary" />
                        Send New Proposal
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <MessageCircle className="h-4 w-4 mr-3" />
                        Reply to Messages
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Calendar className="h-4 w-4 mr-3" />
                        Schedule Meeting
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Target className="h-4 w-4 mr-3" />
                        Update Portfolio
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Recent Messages */}
                  <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Recent Messages</CardTitle>
                        <Badge variant="secondary" className="bg-red-500/20 text-red-700 border-red-500/30">
                          3 New
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder-avatar.jpg" />
                          <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-semibold text-xs">SM</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">Sarah Miller</p>
                          <p className="text-xs text-muted-foreground truncate">Thanks for the amazing work on the...</p>
                          <p className="text-xs text-muted-foreground">2 min ago</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder-avatar.jpg" />
                          <AvatarFallback className="bg-gradient-to-br from-secondary/20 to-secondary/10 text-secondary font-semibold text-xs">JD</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">John Davis</p>
                          <p className="text-xs text-muted-foreground truncate">Can we schedule a call to discuss...</p>
                          <p className="text-xs text-muted-foreground">15 min ago</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder-avatar.jpg" />
                          <AvatarFallback className="bg-gradient-to-br from-green-500/20 to-green-500/10 text-green-500 font-semibold text-xs">AC</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">Alex Chen</p>
                          <p className="text-xs text-muted-foreground truncate">The project is looking great! When...</p>
                          <p className="text-xs text-muted-foreground">1 hour ago</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Performance Metrics */}
          <section className="px-6 pb-8">
            <div className="container mx-auto">
              <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
                <CardHeader>
                  <CardTitle className="text-xl">Performance Overview</CardTitle>
                  <CardDescription>Track your progress and achievements this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="mb-4">
                        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mb-2">
                          <Target className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="font-semibold">Project Completion</h3>
                      </div>
                      <Progress value={75} className="mb-2" />
                      <p className="text-sm text-muted-foreground">6 of 8 projects completed</p>
                    </div>

                    <div className="text-center">
                      <div className="mb-4">
                        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-full flex items-center justify-center mb-2">
                          <TrendingUp className="h-8 w-8 text-green-500" />
                        </div>
                        <h3 className="font-semibold">Earnings Goal</h3>
                      </div>
                      <Progress value={83} className="mb-2" />
                      <p className="text-sm text-muted-foreground">$12,450 of $15,000 target</p>
                    </div>

                    <div className="text-center">
                      <div className="mb-4">
                        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-yellow-500/20 to-yellow-500/10 rounded-full flex items-center justify-center mb-2">
                          <Award className="h-8 w-8 text-yellow-500" />
                        </div>
                        <h3 className="font-semibold">Client Satisfaction</h3>
                      </div>
                      <Progress value={98} className="mb-2" />
                      <p className="text-sm text-muted-foreground">4.9/5.0 average rating</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}