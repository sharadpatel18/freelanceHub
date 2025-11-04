import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Search,
    HelpCircle,
    BookOpen,
    Video,
    MessageCircle,
    Mail,
    Phone,
    ChevronRight,
    ExternalLink,
    Lightbulb,
    Users,
    Zap,
    DollarSign,
    Settings,
    BarChart,
    Briefcase
} from "lucide-react"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default function Page() {
    const popularTopics = [
        {
            icon: Zap,
            title: "Getting Started",
            description: "Learn the basics of FreelanceHub",
            articles: 12,
            color: "from-yellow-500/20 to-yellow-500/10"
        },
        {
            icon: Briefcase,
            title: "Managing Projects",
            description: "How to create and manage projects",
            articles: 18,
            color: "from-primary/20 to-primary/10"
        },
        {
            icon: DollarSign,
            title: "Payments & Invoicing",
            description: "Everything about payments",
            articles: 15,
            color: "from-green-500/20 to-green-500/10"
        },
        {
            icon: MessageCircle,
            title: "Client Communication",
            description: "Best practices for messaging clients",
            articles: 10,
            color: "from-blue-500/20 to-blue-500/10"
        },
        {
            icon: BarChart,
            title: "Analytics & Reports",
            description: "Understanding your metrics",
            articles: 8,
            color: "from-purple-500/20 to-purple-500/10"
        },
        {
            icon: Settings,
            title: "Account Settings",
            description: "Customize your profile and preferences",
            articles: 14,
            color: "from-gray-500/20 to-gray-500/10"
        }
    ]

    const faqs = [
        {
            question: "How do I create a new project?",
            answer: "To create a new project, go to the Projects page and click the 'New Project' button. Fill in the project details including name, client, budget, and deadline. You can also add project milestones and tasks to keep track of your progress."
        },
        {
            question: "How do I send a proposal to a client?",
            answer: "Navigate to the Proposals page and click 'Create Proposal'. Fill in the project details, add line items, set your pricing, and customize the template. Once ready, you can send it directly to your client via email or generate a shareable link."
        },
        {
            question: "What payment methods are supported?",
            answer: "FreelanceHub supports multiple payment methods including Bank Transfer, PayPal, and Stripe. You can manage your payment methods in Settings > Billing. Set your preferred primary payment method for faster transactions."
        },
        {
            question: "How do I track my time on projects?",
            answer: "Use the built-in time tracker in each project. Click the timer icon to start tracking, add notes about what you're working on, and stop when you're done. All tracked time is automatically logged and can be included in your invoices."
        },
        {
            question: "Can I export my financial data?",
            answer: "Yes! Go to Earnings > Export Report to download your financial data. You can choose different date ranges and export formats (CSV, PDF, Excel) for accounting purposes or tax filing."
        },
        {
            question: "How do I set up notifications?",
            answer: "Visit Settings > Notifications to customize your notification preferences. You can choose to receive email notifications, push notifications, or both for different events like new messages, project updates, and payment receipts."
        }
    ]

    const resources = [
        {
            icon: BookOpen,
            title: "Documentation",
            description: "Complete guides and tutorials",
            link: "#"
        },
        {
            icon: Video,
            title: "Video Tutorials",
            description: "Watch step-by-step guides",
            link: "#"
        },
        {
            icon: Users,
            title: "Community Forum",
            description: "Connect with other freelancers",
            link: "#"
        },
        {
            icon: Lightbulb,
            title: "Best Practices",
            description: "Tips and tricks from experts",
            link: "#"
        }
    ]

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
                    {/* Header Section */}
                    <section className="py-8 px-6 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />

                        <div className="container mx-auto relative z-10">
                            <div className="text-center max-w-2xl mx-auto mb-8">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full mb-4">
                                    <HelpCircle className="h-8 w-8 text-primary" />
                                </div>
                                <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                                    How can we help you?
                                </h1>
                                <p className="text-muted-foreground mb-6">
                                    Search our knowledge base or browse popular topics below
                                </p>

                                {/* Search Bar */}
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <Input
                                        placeholder="Search for help articles..."
                                        className="pl-12 h-12 text-base border-2"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Popular Topics */}
                    <section className="px-6 pb-8">
                        <div className="container mx-auto">
                            <h2 className="text-2xl font-bold mb-6">Popular Topics</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                {popularTopics.map((topic) => (
                                    <Card key={topic.title} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/20 cursor-pointer">
                                        <CardContent className="pt-6">
                                            <div className={`w-12 h-12 bg-gradient-to-br ${topic.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                                <topic.icon className="h-6 w-6 text-primary" />
                                            </div>
                                            <h3 className="font-semibold text-lg mb-2">{topic.title}</h3>
                                            <p className="text-sm text-muted-foreground mb-3">{topic.description}</p>
                                            <div className="flex items-center justify-between">
                                                <Badge variant="secondary" className="bg-primary/10">
                                                    {topic.articles} articles
                                                </Badge>
                                                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* FAQs */}
                    <section className="px-6 pb-8">
                        <div className="container mx-auto">
                            <Card className="border-2 hover:shadow-xl transition-all duration-300">
                                <CardHeader>
                                    <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
                                    <CardDescription>Quick answers to common questions</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Accordion type="single" collapsible className="w-full">
                                        {faqs.map((faq, idx) => (
                                            <AccordionItem key={faq.question} value={`item-${idx}`}>
                                                <AccordionTrigger className="text-left">
                                                    {faq.question}
                                                </AccordionTrigger>
                                                <AccordionContent className="text-muted-foreground">
                                                    {faq.answer}
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                </CardContent>
                            </Card>
                        </div>
                    </section>

                    {/* Resources */}
                    <section className="px-6 pb-8">
                        <div className="container mx-auto">
                            <h2 className="text-2xl font-bold mb-6">Learning Resources</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                {resources.map((resource) => (
                                    <Card key={resource.title} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/20 cursor-pointer">
                                        <CardContent className="pt-6 text-center">
                                            <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                                <resource.icon className="h-8 w-8 text-primary" />
                                            </div>
                                            <h3 className="font-semibold text-lg mb-2">{resource.title}</h3>
                                            <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
                                            <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                                                Explore
                                                <ExternalLink className="h-4 w-4 ml-2" />
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Contact Support */}
                    <section className="px-6 pb-8">
                        <div className="container mx-auto">
                            <Card className="border-2 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
                                <CardHeader className="text-center">
                                    <CardTitle className="text-2xl">Still need help?</CardTitle>
                                    <CardDescription>Our support team is here to assist you</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                                            <CardContent className="pt-6 text-center">
                                                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <MessageCircle className="h-6 w-6 text-primary" />
                                                </div>
                                                <h3 className="font-semibold mb-2">Live Chat</h3>
                                                <p className="text-sm text-muted-foreground mb-4">Chat with our support team</p>
                                                <Button className="w-full bg-gradient-to-r from-primary to-primary/80">
                                                    Start Chat
                                                </Button>
                                            </CardContent>
                                        </Card>

                                        <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                                            <CardContent className="pt-6 text-center">
                                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <Mail className="h-6 w-6 text-blue-500" />
                                                </div>
                                                <h3 className="font-semibold mb-2">Email Support</h3>
                                                <p className="text-sm text-muted-foreground mb-4">Get help via email</p>
                                                <Button variant="outline" className="w-full">
                                                    Send Email
                                                </Button>
                                            </CardContent>
                                        </Card>

                                        <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                                            <CardContent className="pt-6 text-center">
                                                <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <Phone className="h-6 w-6 text-green-500" />
                                                </div>
                                                <h3 className="font-semibold mb-2">Phone Support</h3>
                                                <p className="text-sm text-muted-foreground mb-4">Call us directly</p>
                                                <Button variant="outline" className="w-full">
                                                    Call Now
                                                </Button>
                                            </CardContent>
                                        </Card>
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