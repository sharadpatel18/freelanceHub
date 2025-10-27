import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { 
  ArrowRight, 
  CheckCircle, 
  Star, 
  Users, 
  Briefcase, 
  DollarSign, 
  Shield, 
  Zap,
  Globe,
  Award,
  TrendingUp,
  Clock
} from "lucide-react"

export default function HomePage() {
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
          {/* Hero Section */}
          <section className="relative py-20 px-4 overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
            
            <div className="container mx-auto text-center relative z-10">
              <Badge variant="secondary" className="mb-6 bg-gradient-to-r from-primary/20 to-secondary/20 border-primary/30">
                <Zap className="h-4 w-4 mr-2 text-primary" />
                Trusted by 10,000+ freelancers
              </Badge>
              
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                Find Your Next
                <br />
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Freelance Project
                </span>
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                Connect with top clients, showcase your skills, and grow your freelance business 
                with our comprehensive platform designed for modern freelancers.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button size="lg" className="text-lg px-8 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300">
                  Start Freelancing
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 border-2 hover:bg-primary/5 transition-all duration-300">
                  Post a Project
                </Button>
              </div>

              {/* Floating Cards */}
              <div className="relative mt-16">
                <div className="absolute -top-8 -left-8 w-16 h-16 bg-primary/20 rounded-lg rotate-12 animate-bounce" />
                <div className="absolute -top-4 -right-12 w-12 h-12 bg-secondary/20 rounded-lg -rotate-12 animate-bounce delay-500" />
                <div className="absolute -bottom-4 left-1/4 w-10 h-10 bg-primary/30 rounded-lg rotate-45 animate-bounce delay-1000" />
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-20 px-4 relative">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                  Trusted by Freelancers Worldwide
                </h2>
                <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                  Join thousands of successful freelancers who have built their careers with us
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="text-center group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/20">
                  <CardContent className="pt-8 pb-8">
                    <div className="flex items-center justify-center mb-6">
                      <div className="p-4 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full group-hover:scale-110 transition-transform duration-300">
                        <Users className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">50K+</div>
                    <p className="text-muted-foreground font-medium">Active Freelancers</p>
                  </CardContent>
                </Card>
                
                <Card className="text-center group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/20">
                  <CardContent className="pt-8 pb-8">
                    <div className="flex items-center justify-center mb-6">
                      <div className="p-4 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-full group-hover:scale-110 transition-transform duration-300">
                        <Briefcase className="h-8 w-8 text-secondary" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">25K+</div>
                    <p className="text-muted-foreground font-medium">Projects Completed</p>
                  </CardContent>
                </Card>
                
                <Card className="text-center group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/20">
                  <CardContent className="pt-8 pb-8">
                    <div className="flex items-center justify-center mb-6">
                      <div className="p-4 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-full group-hover:scale-110 transition-transform duration-300">
                        <DollarSign className="h-8 w-8 text-green-500" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">$2M+</div>
                    <p className="text-muted-foreground font-medium">Earned by Freelancers</p>
                  </CardContent>
                </Card>
                
                <Card className="text-center group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/20">
                  <CardContent className="pt-8 pb-8">
                    <div className="flex items-center justify-center mb-6">
                      <div className="p-4 bg-gradient-to-br from-yellow-500/20 to-yellow-500/10 rounded-full group-hover:scale-110 transition-transform duration-300">
                        <Star className="h-8 w-8 text-yellow-500" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">4.9</div>
                    <p className="text-muted-foreground font-medium">Average Rating</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/30">
            <div className="container mx-auto">
              <div className="text-center mb-16">
                <Badge variant="outline" className="mb-4 border-primary/30">
                  <Award className="h-4 w-4 mr-2 text-primary" />
                  Why Choose Us
                </Badge>
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                  Everything You Need to Succeed
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  We provide comprehensive tools and features designed to help freelancers thrive in today's competitive market.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-2 hover:border-primary/30 bg-gradient-to-br from-card to-card/50">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                        <Shield className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle>Secure Payments</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      Your payments are protected with our advanced escrow system. Get paid securely and on time for every project with guaranteed payment protection.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-2 hover:border-primary/30 bg-gradient-to-br from-card to-card/50">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                        <Globe className="h-8 w-8 text-blue-500" />
                      </div>
                      <CardTitle>Global Reach</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      Connect with clients from around the world. Expand your business beyond local markets and access international opportunities.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-2 hover:border-primary/30 bg-gradient-to-br from-card to-card/50">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-gradient-to-br from-yellow-500/20 to-yellow-500/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                        <Award className="h-8 w-8 text-yellow-500" />
                      </div>
                      <CardTitle>Quality Assurance</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      Our platform ensures high-quality work through verified freelancers, comprehensive reviews, and quality control measures.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-2 hover:border-primary/30 bg-gradient-to-br from-card to-card/50">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                        <TrendingUp className="h-8 w-8 text-green-500" />
                      </div>
                      <CardTitle>Growth Tools</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      Access powerful analytics, portfolio tools, and marketing resources to grow your freelance business and increase your earnings.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-2 hover:border-primary/30 bg-gradient-to-br from-card to-card/50">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-gradient-to-br from-purple-500/20 to-purple-500/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                        <Clock className="h-8 w-8 text-purple-500" />
                      </div>
                      <CardTitle>24/7 Support</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      Get help whenever you need it with our round-the-clock customer support team, available via chat, email, and phone.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-2 hover:border-primary/30 bg-gradient-to-br from-card to-card/50">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-gradient-to-br from-orange-500/20 to-orange-500/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                        <Zap className="h-8 w-8 text-orange-500" />
                      </div>
                      <CardTitle>Smart Matching</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      Our AI-powered matching system connects you with the most relevant projects instantly, saving you time and increasing success rates.
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-20 px-4 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
            <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-2xl animate-pulse delay-1000" />
            
            <div className="container mx-auto relative z-10">
              <div className="text-center mb-16">
                <Badge variant="outline" className="mb-4 border-primary/30">
                  <Star className="h-4 w-4 mr-2 text-yellow-500" />
                  Success Stories
                </Badge>
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                  What Our Freelancers Say
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Join thousands of successful freelancers who have transformed their careers and increased their earnings with our platform.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 hover:border-primary/30 bg-gradient-to-br from-card to-card/50">
                  <CardContent className="pt-8 pb-8">
                    <div className="flex items-center mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <blockquote className="text-base text-muted-foreground mb-6 leading-relaxed italic">
                      "FreelanceHub has completely transformed my freelance career. The quality of clients 
                      and projects is outstanding, and the payment system gives me complete peace of mind."
                    </blockquote>
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                        <AvatarImage src="/placeholder-avatar.jpg" />
                        <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-semibold">SM</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-base">Sarah Miller</p>
                        <p className="text-sm text-muted-foreground">Web Developer</p>
                        <p className="text-xs text-primary font-medium">$50K+ earned</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 hover:border-primary/30 bg-gradient-to-br from-card to-card/50">
                  <CardContent className="pt-8 pb-8">
                    <div className="flex items-center mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <blockquote className="text-base text-muted-foreground mb-6 leading-relaxed italic">
                      "I've been able to triple my income since joining FreelanceHub. The platform 
                      makes it incredibly easy to find high-paying projects and build lasting client relationships."
                    </blockquote>
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                        <AvatarImage src="/placeholder-avatar.jpg" />
                        <AvatarFallback className="bg-gradient-to-br from-secondary/20 to-secondary/10 text-secondary font-semibold">JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-base">John Davis</p>
                        <p className="text-sm text-muted-foreground">Graphic Designer</p>
                        <p className="text-xs text-primary font-medium">$75K+ earned</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 hover:border-primary/30 bg-gradient-to-br from-card to-card/50">
                  <CardContent className="pt-8 pb-8">
                    <div className="flex items-center mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <blockquote className="text-base text-muted-foreground mb-6 leading-relaxed italic">
                      "The support team is absolutely incredible, and the platform is so user-friendly. 
                      I've found my dream clients here and couldn't be happier with my decision to join."
                    </blockquote>
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                        <AvatarImage src="/placeholder-avatar.jpg" />
                        <AvatarFallback className="bg-gradient-to-br from-green-500/20 to-green-500/10 text-green-500 font-semibold">AC</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-base">Alex Chen</p>
                        <p className="text-sm text-muted-foreground">Content Writer</p>
                        <p className="text-xs text-primary font-medium">$35K+ earned</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 px-4 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            
            <div className="container mx-auto text-center relative z-10">
              <Card className="max-w-5xl mx-auto border-2 border-primary/20 bg-gradient-to-br from-card to-card/50 shadow-2xl">
                <CardContent className="pt-16 pb-16 px-8">
                  <Badge variant="outline" className="mb-6 border-primary/30">
                    <Zap className="h-4 w-4 mr-2 text-primary" />
                    Ready to Get Started?
                  </Badge>
                  
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                    Start Your Freelance Journey Today
                  </h2>
                  
                  <p className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
                    Join thousands of successful freelancers and start earning more today. 
                    It takes less than 5 minutes to get started and begin your path to financial freedom.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                    <Button size="lg" className="text-lg px-10 py-6 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                      Create Your Profile
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    <Button size="lg" variant="outline" className="text-lg px-10 py-6 border-2 hover:bg-primary/5 transition-all duration-300 hover:scale-105">
                      Browse Projects
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="font-medium">Free to join</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="font-medium">No monthly fees</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="font-medium">Secure payments</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="font-medium">24/7 support</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Footer */}
          <footer className="border-t bg-gradient-to-b from-background to-muted/30">
            <div className="container mx-auto px-4 py-16">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="md:col-span-1">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg">
                      <Briefcase className="h-8 w-8 text-primary" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">FreelanceHub</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    The leading platform for freelancers and clients to connect, collaborate, and succeed in the modern economy.
                  </p>
                  <div className="flex space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer">
                      <Briefcase className="h-5 w-5 text-primary" />
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer">
                      <Users className="h-5 w-5 text-secondary" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-base mb-6 text-foreground">For Freelancers</h3>
                  <ul className="space-y-4 text-muted-foreground">
                    <li className="hover:text-primary transition-colors duration-300 cursor-pointer">How to Get Started</li>
                    <li className="hover:text-primary transition-colors duration-300 cursor-pointer">Find Work</li>
                    <li className="hover:text-primary transition-colors duration-300 cursor-pointer">Success Stories</li>
                    <li className="hover:text-primary transition-colors duration-300 cursor-pointer">Freelancer Resources</li>
                    <li className="hover:text-primary transition-colors duration-300 cursor-pointer">Pricing Guide</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-base mb-6 text-foreground">For Clients</h3>
                  <ul className="space-y-4 text-muted-foreground">
                    <li className="hover:text-primary transition-colors duration-300 cursor-pointer">Post a Project</li>
                    <li className="hover:text-primary transition-colors duration-300 cursor-pointer">Find Freelancers</li>
                    <li className="hover:text-primary transition-colors duration-300 cursor-pointer">How it Works</li>
                    <li className="hover:text-primary transition-colors duration-300 cursor-pointer">Client Resources</li>
                    <li className="hover:text-primary transition-colors duration-300 cursor-pointer">Enterprise Solutions</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-base mb-6 text-foreground">Support</h3>
                  <ul className="space-y-4 text-muted-foreground">
                    <li className="hover:text-primary transition-colors duration-300 cursor-pointer">Help Center</li>
                    <li className="hover:text-primary transition-colors duration-300 cursor-pointer">Contact Us</li>
                    <li className="hover:text-primary transition-colors duration-300 cursor-pointer">Community</li>
                    <li className="hover:text-primary transition-colors duration-300 cursor-pointer">Terms of Service</li>
                    <li className="hover:text-primary transition-colors duration-300 cursor-pointer">Privacy Policy</li>
                  </ul>
                </div>
              </div>
              
              <Separator className="my-12" />
              
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-muted-foreground mb-4 md:mb-0">
                  © 2024 FreelanceHub. All rights reserved. Built with ❤️ for freelancers worldwide.
                </p>
                <div className="flex space-x-6">
                  <Button variant="ghost" size="sm" className="hover:text-primary transition-colors duration-300">Privacy Policy</Button>
                  <Button variant="ghost" size="sm" className="hover:text-primary transition-colors duration-300">Terms of Service</Button>
                  <Button variant="ghost" size="sm" className="hover:text-primary transition-colors duration-300">Cookie Policy</Button>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
