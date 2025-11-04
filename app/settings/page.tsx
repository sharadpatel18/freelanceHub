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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import {
    Mail,
    Phone,
    MapPin,
    Globe,
    Lock,
    Bell,
    CreditCard,
    Shield,
    Eye,
    Download,
    Trash2,
    Save,
    Camera,
    Briefcase,
    DollarSign,
    Palette,
    Languages
} from "lucide-react"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function Page() {
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
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
                                <div>
                                    <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                                        Settings
                                    </h1>
                                    <p className="text-muted-foreground">
                                        Manage your account settings and preferences
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Settings Content */}
                    <section className="px-6 pb-8">
                        <div className="container mx-auto">
                            <Tabs defaultValue="profile" className="w-full">
                                <TabsList className="grid w-full max-w-3xl grid-cols-5 mb-6">
                                    <TabsTrigger value="profile">Profile</TabsTrigger>
                                    <TabsTrigger value="account">Account</TabsTrigger>
                                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                                    <TabsTrigger value="billing">Billing</TabsTrigger>
                                    <TabsTrigger value="security">Security</TabsTrigger>
                                </TabsList>

                                {/* Profile Settings */}
                                <TabsContent value="profile" className="space-y-6">
                                    <Card className="border-2 hover:shadow-xl transition-all duration-300">
                                        <CardHeader>
                                            <CardTitle>Profile Information</CardTitle>
                                            <CardDescription>Update your profile details and public information</CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            {/* Profile Picture */}
                                            <div className="flex items-center gap-6">
                                                <Avatar className="h-24 w-24">
                                                    <AvatarImage src="/placeholder-avatar.jpg" />
                                                    <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary text-2xl font-bold">
                                                        JD
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="space-y-2">
                                                    <h3 className="font-semibold">Profile Photo</h3>
                                                    <div className="flex gap-2">
                                                        <Button size="sm" variant="outline">
                                                            <Camera className="h-4 w-4 mr-2" />
                                                            Upload New
                                                        </Button>
                                                        <Button size="sm" variant="outline" className="text-red-600">
                                                            <Trash2 className="h-4 w-4 mr-2" />
                                                            Remove
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Personal Information */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="firstName">First Name</Label>
                                                    <Input id="firstName" defaultValue="John" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="lastName">Last Name</Label>
                                                    <Input id="lastName" defaultValue="Doe" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="email">Email</Label>
                                                    <div className="relative">
                                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                        <Input id="email" type="email" defaultValue="john@example.com" className="pl-10" />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="phone">Phone Number</Label>
                                                    <div className="relative">
                                                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                        <Input id="phone" defaultValue="+1 (555) 123-4567" className="pl-10" />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="location">Location</Label>
                                                    <div className="relative">
                                                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                        <Input id="location" defaultValue="New York, USA" className="pl-10" />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="website">Website</Label>
                                                    <div className="relative">
                                                        <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                        <Input id="website" defaultValue="www.johndoe.com" className="pl-10" />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Bio */}
                                            <div className="space-y-2">
                                                <Label htmlFor="bio">Bio</Label>
                                                <Textarea
                                                    id="bio"
                                                    placeholder="Tell us about yourself..."
                                                    className="min-h-[100px]"
                                                    defaultValue="Experienced freelance designer and developer with 5+ years in the industry."
                                                />
                                            </div>

                                            {/* Professional Details */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="profession">Profession</Label>
                                                    <div className="relative">
                                                        <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                        <Input id="profession" defaultValue="UI/UX Designer & Developer" className="pl-10" />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="hourlyRate">Hourly Rate</Label>
                                                    <div className="relative">
                                                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                        <Input id="hourlyRate" defaultValue="75" className="pl-10" />
                                                    </div>
                                                </div>
                                            </div>

                                            <Button className="w-full md:w-auto">
                                                <Save className="h-4 w-4 mr-2" />
                                                Save Changes
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                {/* Account Settings */}
                                <TabsContent value="account" className="space-y-6">
                                    <Card className="border-2 hover:shadow-xl transition-all duration-300">
                                        <CardHeader>
                                            <CardTitle>Account Preferences</CardTitle>
                                            <CardDescription>Manage your account settings and preferences</CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between p-4 border rounded-lg">
                                                    <div className="flex items-center gap-3">
                                                        <Languages className="h-5 w-5 text-primary" />
                                                        <div>
                                                            <p className="font-semibold">Language</p>
                                                            <p className="text-sm text-muted-foreground">Select your preferred language</p>
                                                        </div>
                                                    </div>
                                                    <Select defaultValue="en">
                                                        <SelectTrigger className="w-[180px]">
                                                            <SelectValue placeholder="Select language" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="en">English</SelectItem>
                                                            <SelectItem value="es">Spanish</SelectItem>
                                                            <SelectItem value="fr">French</SelectItem>
                                                            <SelectItem value="de">German</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <div className="flex items-center justify-between p-4 border rounded-lg">
                                                    <div className="flex items-center gap-3">
                                                        <Globe className="h-5 w-5 text-primary" />
                                                        <div>
                                                            <p className="font-semibold">Timezone</p>
                                                            <p className="text-sm text-muted-foreground">Set your timezone</p>
                                                        </div>
                                                    </div>
                                                    <Select defaultValue="est">
                                                        <SelectTrigger className="w-[180px]">
                                                            <SelectValue placeholder="Select timezone" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="est">EST (UTC-5)</SelectItem>
                                                            <SelectItem value="pst">PST (UTC-8)</SelectItem>
                                                            <SelectItem value="gmt">GMT (UTC+0)</SelectItem>
                                                            <SelectItem value="cet">CET (UTC+1)</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <div className="flex items-center justify-between p-4 border rounded-lg">
                                                    <div className="flex items-center gap-3">
                                                        <Palette className="h-5 w-5 text-primary" />
                                                        <div>
                                                            <p className="font-semibold">Theme</p>
                                                            <p className="text-sm text-muted-foreground">Choose your interface theme</p>
                                                        </div>
                                                    </div>
                                                    <Select defaultValue="light">
                                                        <SelectTrigger className="w-[180px]">
                                                            <SelectValue placeholder="Select theme" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="light">Light</SelectItem>
                                                            <SelectItem value="dark">Dark</SelectItem>
                                                            <SelectItem value="system">System</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>

                                            <div className="pt-6 border-t">
                                                <h3 className="font-semibold text-red-600 mb-4">Danger Zone</h3>
                                                <div className="space-y-3">
                                                    <Button variant="outline" className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50">
                                                        <Download className="h-4 w-4 mr-2" />
                                                        Download Account Data
                                                    </Button>
                                                    <Button variant="outline" className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50">
                                                        <Trash2 className="h-4 w-4 mr-2" />
                                                        Delete Account
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                {/* Notifications */}
                                <TabsContent value="notifications" className="space-y-6">
                                    <Card className="border-2 hover:shadow-xl transition-all duration-300">
                                        <CardHeader>
                                            <CardTitle>Notification Preferences</CardTitle>
                                            <CardDescription>Manage how you receive notifications</CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between p-4 border rounded-lg">
                                                    <div className="flex items-center gap-3">
                                                        <Bell className="h-5 w-5 text-primary" />
                                                        <div>
                                                            <p className="font-semibold">Email Notifications</p>
                                                            <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                                                        </div>
                                                    </div>
                                                    <Switch defaultChecked />
                                                </div>

                                                <div className="flex items-center justify-between p-4 border rounded-lg">
                                                    <div className="flex items-center gap-3">
                                                        <Mail className="h-5 w-5 text-primary" />
                                                        <div>
                                                            <p className="font-semibold">New Messages</p>
                                                            <p className="text-sm text-muted-foreground">Get notified about new messages</p>
                                                        </div>
                                                    </div>
                                                    <Switch defaultChecked />
                                                </div>

                                                <div className="flex items-center justify-between p-4 border rounded-lg">
                                                    <div className="flex items-center gap-3">
                                                        <Briefcase className="h-5 w-5 text-primary" />
                                                        <div>
                                                            <p className="font-semibold">Project Updates</p>
                                                            <p className="text-sm text-muted-foreground">Updates about your projects</p>
                                                        </div>
                                                    </div>
                                                    <Switch defaultChecked />
                                                </div>

                                                <div className="flex items-center justify-between p-4 border rounded-lg">
                                                    <div className="flex items-center gap-3">
                                                        <DollarSign className="h-5 w-5 text-primary" />
                                                        <div>
                                                            <p className="font-semibold">Payment Alerts</p>
                                                            <p className="text-sm text-muted-foreground">Notifications about payments</p>
                                                        </div>
                                                    </div>
                                                    <Switch defaultChecked />
                                                </div>

                                                <div className="flex items-center justify-between p-4 border rounded-lg">
                                                    <div className="flex items-center gap-3">
                                                        <Bell className="h-5 w-5 text-primary" />
                                                        <div>
                                                            <p className="font-semibold">Marketing Emails</p>
                                                            <p className="text-sm text-muted-foreground">Receive promotional content</p>
                                                        </div>
                                                    </div>
                                                    <Switch />
                                                </div>
                                            </div>

                                            <Button className="w-full md:w-auto">
                                                <Save className="h-4 w-4 mr-2" />
                                                Save Preferences
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                {/* Billing */}
                                <TabsContent value="billing" className="space-y-6">
                                    <Card className="border-2 hover:shadow-xl transition-all duration-300">
                                        <CardHeader>
                                            <CardTitle>Payment Methods</CardTitle>
                                            <CardDescription>Manage your payment methods and billing information</CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between p-4 border-2 border-primary/20 rounded-lg bg-primary/5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg">
                                                            <CreditCard className="h-5 w-5 text-primary" />
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold">Bank Transfer</p>
                                                            <p className="text-sm text-muted-foreground">Chase ****4521</p>
                                                        </div>
                                                    </div>
                                                    <Badge variant="secondary" className="bg-green-500/20 text-green-700 border-green-500/30">
                                                        Primary
                                                    </Badge>
                                                </div>

                                                <div className="flex items-center justify-between p-4 border rounded-lg">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-lg">
                                                            <CreditCard className="h-5 w-5 text-blue-500" />
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold">PayPal</p>
                                                            <p className="text-sm text-muted-foreground">john@example.com</p>
                                                        </div>
                                                    </div>
                                                    <Button variant="outline" size="sm">Edit</Button>
                                                </div>
                                            </div>

                                            <Button variant="outline" className="w-full">
                                                <CreditCard className="h-4 w-4 mr-2" />
                                                Add Payment Method
                                            </Button>

                                            <div className="pt-6 border-t">
                                                <h3 className="font-semibold mb-4">Billing Address</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="street">Street Address</Label>
                                                        <Input id="street" defaultValue="123 Main Street" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="city">City</Label>
                                                        <Input id="city" defaultValue="New York" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="state">State</Label>
                                                        <Input id="state" defaultValue="NY" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="zip">ZIP Code</Label>
                                                        <Input id="zip" defaultValue="10001" />
                                                    </div>
                                                </div>
                                                <Button className="mt-4">
                                                    <Save className="h-4 w-4 mr-2" />
                                                    Update Billing Info
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                {/* Security */}
                                <TabsContent value="security" className="space-y-6">
                                    <Card className="border-2 hover:shadow-xl transition-all duration-300">
                                        <CardHeader>
                                            <CardTitle>Security Settings</CardTitle>
                                            <CardDescription>Manage your account security and authentication</CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            <div className="space-y-4">
                                                <div className="p-4 border rounded-lg">
                                                    <h3 className="font-semibold mb-4">Change Password</h3>
                                                    <div className="space-y-4">
                                                        <div className="space-y-2">
                                                            <Label htmlFor="currentPassword">Current Password</Label>
                                                            <Input id="currentPassword" type="password" />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label htmlFor="newPassword">New Password</Label>
                                                            <Input id="newPassword" type="password" />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                                                            <Input id="confirmPassword" type="password" />
                                                        </div>
                                                        <Button>
                                                            <Lock className="h-4 w-4 mr-2" />
                                                            Update Password
                                                        </Button>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between p-4 border rounded-lg">
                                                    <div className="flex items-center gap-3">
                                                        <Shield className="h-5 w-5 text-primary" />
                                                        <div>
                                                            <p className="font-semibold">Two-Factor Authentication</p>
                                                            <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                                                        </div>
                                                    </div>
                                                    <Button variant="outline">Enable</Button>
                                                </div>

                                                <div className="flex items-center justify-between p-4 border rounded-lg">
                                                    <div className="flex items-center gap-3">
                                                        <Eye className="h-5 w-5 text-primary" />
                                                        <div>
                                                            <p className="font-semibold">Active Sessions</p>
                                                            <p className="text-sm text-muted-foreground">Manage your active sessions</p>
                                                        </div>
                                                    </div>
                                                    <Button variant="outline">View All</Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </section>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}