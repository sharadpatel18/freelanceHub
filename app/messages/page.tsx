"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Search,
    Send,
    Paperclip,
    Phone,
    Video,
    MoreVertical,
    Star,
    Archive,
    Trash2,
    CheckCheck,
    Circle
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Page() {
    const [selectedChat, setSelectedChat] = useState(1)

    const conversations = [
        {
            id: 1,
            name: "Sarah Miller",
            avatar: "SM",
            lastMessage: "Thanks for the amazing work on the website! Can we schedule a call?",
            time: "2 min ago",
            unread: 2,
            online: true,
            project: "E-commerce Redesign"
        },
        {
            id: 2,
            name: "John Davis",
            avatar: "JD",
            lastMessage: "I've sent over the final requirements document",
            time: "15 min ago",
            unread: 0,
            online: true,
            project: "Mobile App Development"
        },
        {
            id: 3,
            name: "Alex Chen",
            avatar: "AC",
            lastMessage: "The project is looking great! When can we expect the final delivery?",
            time: "1 hour ago",
            unread: 1,
            online: false,
            project: "Brand Identity"
        },
        {
            id: 4,
            name: "Emily Rodriguez",
            avatar: "ER",
            lastMessage: "Perfect! Let's proceed with this approach",
            time: "3 hours ago",
            unread: 0,
            online: false,
            project: "Dashboard Development"
        },
        {
            id: 5,
            name: "Michael Brown",
            avatar: "MB",
            lastMessage: "Can you send me the invoice for last month?",
            time: "Yesterday",
            unread: 0,
            online: true,
            project: "Website Maintenance"
        }
    ]

    const messages = [
        {
            id: 1,
            sender: "them",
            content: "Hi! I've reviewed the initial designs and they look fantastic!",
            time: "10:30 AM",
            read: true
        },
        {
            id: 2,
            sender: "me",
            content: "Thank you! I'm glad you like them. Do you have any feedback or changes you'd like to make?",
            time: "10:32 AM",
            read: true
        },
        {
            id: 3,
            sender: "them",
            content: "Just a few minor tweaks on the color scheme. Could we make the primary color slightly darker?",
            time: "10:35 AM",
            read: true
        },
        {
            id: 4,
            sender: "me",
            content: "Absolutely! I'll make those adjustments and send over the updated version by tomorrow.",
            time: "10:37 AM",
            read: true
        },
        {
            id: 5,
            sender: "them",
            content: "Thanks for the amazing work on the website! Can we schedule a call?",
            time: "Just now",
            read: false
        }
    ]

    const currentConversation = conversations.find(c => c.id === selectedChat)

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
                                        Messages
                                    </h1>
                                    <p className="text-muted-foreground">
                                        Communicate with your clients in real-time
                                    </p>
                                </div>
                                <Badge variant="secondary" className="mt-4 md:mt-0 bg-gradient-to-r from-red-500/20 to-red-500/10 border-red-500/30">
                                    3 Unread
                                </Badge>
                            </div>
                        </div>
                    </section>

                    {/* Messages Interface */}
                    <section className="px-6 pb-8">
                        <div className="container mx-auto">
                            <Card className="border-2 overflow-hidden">
                                <div className="grid grid-cols-1 md:grid-cols-3 h-[600px]">
                                    {/* Conversations List */}
                                    <div className="border-r">
                                        <div className="p-4 border-b">
                                            <div className="relative">
                                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    placeholder="Search messages..."
                                                    className="pl-10"
                                                />
                                            </div>
                                        </div>
                                        <div className="overflow-y-auto h-[530px]">
                                            {conversations.map((conv) => (
                                                <button
                                                    type="button"
                                                    key={conv.id}
                                                    onClick={() => setSelectedChat(conv.id)}
                                                    className={`p-4 border-b cursor-pointer transition-colors hover:bg-muted/50 ${selectedChat === conv.id ? 'bg-muted' : ''
                                                        }`}
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <div className="relative">
                                                            <Avatar className="h-12 w-12">
                                                                <AvatarImage src="/placeholder-avatar.jpg" />
                                                                <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-semibold">
                                                                    {conv.avatar}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                            {conv.online && (
                                                                <Circle className="absolute bottom-0 right-0 h-3 w-3 fill-green-500 text-green-500" />
                                                            )}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center justify-between mb-1">
                                                                <h4 className="font-semibold text-sm truncate">{conv.name}</h4>
                                                                <span className="text-xs text-muted-foreground">{conv.time}</span>
                                                            </div>
                                                            <p className="text-sm text-muted-foreground truncate mb-1">
                                                                {conv.lastMessage}
                                                            </p>
                                                            <div className="flex items-center justify-between">
                                                                <Badge variant="outline" className="text-xs bg-primary/5">
                                                                    {conv.project}
                                                                </Badge>
                                                                {conv.unread > 0 && (
                                                                    <Badge className="bg-primary text-primary-foreground h-5 w-5 flex items-center justify-center p-0 text-xs">
                                                                        {conv.unread}
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Chat Area */}
                                    <div className="md:col-span-2 flex flex-col">
                                        {/* Chat Header */}
                                        <div className="p-4 border-b flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="relative">
                                                    <Avatar className="h-10 w-10">
                                                        <AvatarImage src="/placeholder-avatar.jpg" />
                                                        <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-semibold">
                                                            {currentConversation?.avatar}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    {currentConversation?.online && (
                                                        <Circle className="absolute bottom-0 right-0 h-3 w-3 fill-green-500 text-green-500" />
                                                    )}
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold">{currentConversation?.name}</h3>
                                                    <p className="text-xs text-muted-foreground">
                                                        {currentConversation?.online ? 'Active now' : 'Offline'}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button variant="ghost" size="sm">
                                                    <Phone className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="sm">
                                                    <Video className="h-4 w-4" />
                                                </Button>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="sm">
                                                            <MoreVertical className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>
                                                            <Star className="h-4 w-4 mr-2" />
                                                            Star Conversation
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <Archive className="h-4 w-4 mr-2" />
                                                            Archive
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="text-red-600">
                                                            <Trash2 className="h-4 w-4 mr-2" />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </div>

                                        {/* Messages */}
                                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
                                            {messages.map((message) => (
                                                <div
                                                    key={message.id}
                                                    className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                                                >
                                                    <div className={`max-w-[70%] ${message.sender === 'me' ? 'order-2' : 'order-1'}`}>
                                                        <div
                                                            className={`rounded-2xl px-4 py-2 ${message.sender === 'me'
                                                                ? 'bg-primary text-primary-foreground'
                                                                : 'bg-background border'
                                                                }`}
                                                        >
                                                            <p className="text-sm">{message.content}</p>
                                                        </div>
                                                        <div className={`flex items-center gap-1 mt-1 ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                                                            <span className="text-xs text-muted-foreground">{message.time}</span>
                                                            {message.sender === 'me' && (
                                                                <CheckCheck className={`h-3 w-3 ${message.read ? 'text-blue-500' : 'text-muted-foreground'}`} />
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Message Input */}
                                        <div className="p-4 border-t">
                                            <div className="flex items-end gap-2">
                                                <Button variant="ghost" size="sm">
                                                    <Paperclip className="h-4 w-4" />
                                                </Button>
                                                <Textarea
                                                    placeholder="Type a message..."
                                                    className="min-h-[44px] max-h-[120px] resize-none"
                                                    rows={1}
                                                />
                                                <Button className="bg-gradient-to-r from-primary to-primary/80">
                                                    <Send className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </section>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}