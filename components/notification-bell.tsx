import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {
    Bell,
    MessageCircle,
    DollarSign,
    Briefcase,
    CheckCircle,
    AlertCircle,
    Clock,
    Trash2,
    Settings,
    CheckCheck
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function NotificationBellComponent() {
    const [open, setOpen] = useState(false)
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: "message",
            title: "New message from Sarah Miller",
            description: "Thanks for the amazing work on the website!",
            time: "2 min ago",
            read: false,
            avatar: "SM",
            icon: MessageCircle,
            color: "from-blue-500/20 to-blue-500/10"
        },
        {
            id: 2,
            type: "payment",
            title: "Payment Received",
            description: "You received $3,200 from TechCorp Inc.",
            time: "1 hour ago",
            read: false,
            avatar: null,
            icon: DollarSign,
            color: "from-green-500/20 to-green-500/10"
        },
        {
            id: 3,
            type: "project",
            title: "Project Status Updated",
            description: "Mobile App UI/UX Design moved to Review",
            time: "3 hours ago",
            read: false,
            avatar: null,
            icon: Briefcase,
            color: "from-primary/20 to-primary/10"
        },
        {
            id: 4,
            type: "message",
            title: "New message from John Davis",
            description: "Can we schedule a call to discuss the requirements?",
            time: "5 hours ago",
            read: true,
            avatar: "JD",
            icon: MessageCircle,
            color: "from-blue-500/20 to-blue-500/10"
        },
        {
            id: 5,
            type: "project",
            title: "Project Completed",
            description: "Brand Identity Package has been completed",
            time: "Yesterday",
            read: true,
            avatar: null,
            icon: CheckCircle,
            color: "from-green-500/20 to-green-500/10"
        },
        {
            id: 6,
            type: "alert",
            title: "Proposal Expiring Soon",
            description: "E-commerce Platform Redesign proposal expires in 2 days",
            time: "Yesterday",
            read: true,
            avatar: null,
            icon: AlertCircle,
            color: "from-yellow-500/20 to-yellow-500/10"
        },
        {
            id: 7,
            type: "message",
            title: "New message from Alex Chen",
            description: "The project is looking great! When can we expect delivery?",
            time: "2 days ago",
            read: true,
            avatar: "AC",
            icon: MessageCircle,
            color: "from-blue-500/20 to-blue-500/10"
        },
        {
            id: 8,
            type: "payment",
            title: "Invoice Sent",
            description: "Invoice #INV-005 sent to FreshStart Inc.",
            time: "3 days ago",
            read: true,
            avatar: null,
            icon: DollarSign,
            color: "from-green-500/20 to-green-500/10"
        }
    ])

    const unreadCount = notifications.filter(n => !n.read).length

    const markAsRead = (id: number) => {
        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
        ))
    }

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })))
    }

    const deleteNotification = (id: number) => {
        setNotifications(notifications.filter(n => n.id !== id))
    }

    const filterByType = (type: string) => {
        if (type === "all") return notifications
        return notifications.filter(n => n.type === type)
    }

    const NotificationItem = ({ notification }: { notification: any }) => {
        const Icon = notification.icon

        return (
            <button
                type="button"
                className={`group gap-3 p-4 rounded-lg border transition-all cursor-pointer hover:border-primary/20 ${!notification.read ? 'bg-primary/5 border-primary/20' : 'hover:bg-muted/50'
                    }`}
                onClick={() => markAsRead(notification.id)}
            >
                <div className="flex-shrink-0">
                    {notification.avatar ? (
                        <Avatar className="h-10 w-10">
                            <AvatarImage src="/placeholder-avatar.jpg" />
                            <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-semibold text-sm">
                                {notification.avatar}
                            </AvatarFallback>
                        </Avatar>
                    ) : (
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${notification.color} flex items-center justify-center`}>
                            <Icon className="h-5 w-5 text-primary" />
                        </div>
                    )}
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="font-semibold text-sm">{notification.title}</h4>
                        {!notification.read && (
                            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1" />
                        )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-1">
                        {notification.description}
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {notification.time}
                        </span>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7 p-0"
                            onClick={(e) => {
                                e.stopPropagation()
                                deleteNotification(notification.id)
                            }}
                        >
                            <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                    </div>
                </div>
            </button>
        )
    }

    return (
        <div className="flex items-center justify-center">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="relative hover:bg-primary/10"
                    >
                        <Bell className="h-5 w-5" />
                        {unreadCount > 0 && (
                            <Badge
                                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 hover:bg-red-600"
                            >
                                {unreadCount}
                            </Badge>
                        )}
                    </Button>
                </DialogTrigger>

                <DialogContent className="max-w-2xl max-h-[85vh] p-0">
                    <DialogHeader className="px-6 pt-6 pb-4 border-b">
                        <div className="flex items-center justify-between">
                            <div>
                                <DialogTitle className="text-2xl">Notifications</DialogTitle>
                                <DialogDescription>
                                    You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                                </DialogDescription>
                            </div>
                            <div className="flex items-center gap-2">
                                {unreadCount > 0 && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={markAllAsRead}
                                    >
                                        <CheckCheck className="h-4 w-4 mr-2" />
                                        Mark all read
                                    </Button>
                                )}
                                <Button variant="ghost" size="icon">
                                    <Settings className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>
                    </DialogHeader>

                    <Tabs defaultValue="all" className="w-full">
                        <div className="px-6 pt-4">
                            <TabsList className="grid w-full grid-cols-4">
                                <TabsTrigger value="all">
                                    All
                                    {notifications.length > 0 && (
                                        <Badge variant="secondary" className="ml-2">
                                            {notifications.length}
                                        </Badge>
                                    )}
                                </TabsTrigger>
                                <TabsTrigger value="message">Messages</TabsTrigger>
                                <TabsTrigger value="project">Projects</TabsTrigger>
                                <TabsTrigger value="payment">Payments</TabsTrigger>
                            </TabsList>
                        </div>

                        <ScrollArea className="h-[500px]">
                            <TabsContent value="all" className="px-6 pb-6 mt-4 space-y-3">
                                {notifications.length > 0 ? (
                                    notifications.map((notification) => (
                                        <NotificationItem key={notification.id} notification={notification} />
                                    ))
                                ) : (
                                    <div className="text-center py-12">
                                        <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Bell className="h-8 w-8 text-primary" />
                                        </div>
                                        <h3 className="font-semibold mb-2">No notifications</h3>
                                        <p className="text-sm text-muted-foreground">
                                            You're all caught up!
                                        </p>
                                    </div>
                                )}
                            </TabsContent>

                            <TabsContent value="message" className="px-6 pb-6 mt-4 space-y-3">
                                {filterByType("message").map((notification) => (
                                    <NotificationItem key={notification.id} notification={notification} />
                                ))}
                            </TabsContent>

                            <TabsContent value="project" className="px-6 pb-6 mt-4 space-y-3">
                                {filterByType("project").map((notification) => (
                                    <NotificationItem key={notification.id} notification={notification} />
                                ))}
                            </TabsContent>

                            <TabsContent value="payment" className="px-6 pb-6 mt-4 space-y-3">
                                {filterByType("payment").map((notification) => (
                                    <NotificationItem key={notification.id} notification={notification} />
                                ))}
                            </TabsContent>
                        </ScrollArea>
                    </Tabs>
                </DialogContent>
            </Dialog>
        </div>
    )
}