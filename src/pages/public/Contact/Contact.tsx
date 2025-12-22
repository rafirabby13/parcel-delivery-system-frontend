/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import {
    Phone,
    Mail,
    MapPin,
    MessageSquare,
    Send,
    Loader2,
    CheckCircle,
    HelpCircle,
    Clock
} from "lucide-react"
import { Textarea } from '@/components/ui/textarea'

// --- Configuration & Data ---

const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    phone: z.string().regex(/^01[3-9]\d{8}$/, { message: "Please enter a valid Bangladesh phone number" }),
    subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
    category: z.string().min(1, { message: "Please select a category" }),
    message: z.string().min(10, { message: "Message must be at least 10 characters" }),
})

const contactMethods = [
    {
        icon: <Phone className="w-6 h-6" />,
        title: "Call Us",
        value: "+880 1712-345678",
        subtext: "Sun-Thu, 9am-6pm",
        bg: "bg-blue-100 dark:bg-blue-900/20",
        text: "text-blue-600 dark:text-blue-400",
    },
    {
        icon: <Mail className="w-6 h-6" />,
        title: "Email Us",
        value: "support@parcel.com.bd",
        subtext: "Response within 2 hours",
        bg: "bg-green-100 dark:bg-green-900/20",
        text: "text-green-600 dark:text-green-400",
    },
    {
        icon: <MapPin className="w-6 h-6" />,
        title: "Head Office",
        value: "Banani, Dhaka-1213",
        subtext: "Visit anytime",
        bg: "bg-orange-100 dark:bg-orange-900/20",
        text: "text-orange-600 dark:text-orange-400",
    },
    {
        icon: <MessageSquare className="w-6 h-6" />,
        title: "Live Chat",
        value: "Start Chat",
        subtext: "Online Now",
        bg: "bg-purple-100 dark:bg-purple-900/20",
        text: "text-purple-600 dark:text-purple-400",
    }
]

const faqs = [
    {
        question: "How do I track my parcel?",
        answer: "You can track your parcel using the 'Track Order' link in the navigation menu. Simply enter your consignment ID to see real-time updates."
    },
    {
        question: "What are your delivery hours?",
        answer: "Our standard delivery hours are 9 AM to 8 PM, Saturday through Thursday. We also offer express delivery on Fridays for select locations."
    },
    {
        question: "Do you offer insurance for valuable items?",
        answer: "Yes, we offer parcel insurance for items valued up to 50,000 BDT. You can opt-in for insurance during the booking process."
    },
]

const categories = [
    "General Inquiry",
    "Delivery Issue",
    "Billing Question",
    "Technical Support",
    "Partnership",
    "Complaint",
]

const Contact = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            subject: "",
            category: "",
            message: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        try {
            await new Promise(resolve => setTimeout(resolve, 2000))
            console.log("Contact form submission:", values)
            setSubmitted(true)
            toast.success("Message sent successfully! We'll get back to you soon.")
            form.reset()
        } catch (error) {
            toast.error("Failed to send message. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-background text-foreground pb-20">

            {/* --- Hero Section --- */}
            <section className="relative pt-24 pb-32 bg-slate-50 dark:bg-slate-950 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="container relative mx-auto px-4 text-center">
                    <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm">
                        24/7 Support
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                        We're here to <span className="text-primary">help</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Whether you have a question about our services, pricing, or need technical support, our team is ready to answer all your questions.
                    </p>
                </div>
            </section>

            {/* --- Content Wrapper --- */}
            <div className="container mx-auto px-4 -mt-20 relative z-10">
                
                {/* 1. Contact Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {contactMethods.map((method, index) => (
                        <Card key={index} className="border-0 shadow-lg bg-card/50 backdrop-blur-sm hover:-translate-y-1 transition-transform duration-300">
                            <CardContent className="p-6 flex flex-col items-center text-center">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${method.bg} ${method.text}`}>
                                    {method.icon}
                                </div>
                                <h3 className="font-semibold mb-1">{method.title}</h3>
                                <p className="text-lg font-bold text-primary mb-1">{method.value}</p>
                                <p className="text-sm text-muted-foreground">{method.subtext}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-10">
                    
                    {/* 2. Contact Form (Spans 2 columns) */}
                    <div className="lg:col-span-2">
                        <Card className="border shadow-md h-full">
                            <CardHeader>
                                <CardTitle className="text-2xl">Send us a message</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {submitted ? (
                                    <div className="flex flex-col items-center justify-center h-[400px] text-center p-8 animate-in fade-in zoom-in">
                                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                                            <CheckCircle size={40} />
                                        </div>
                                        <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                                        <p className="text-muted-foreground mb-8 max-w-md">
                                            Thank you for reaching out. We have received your message and will respond to your email within 2 hours.
                                        </p>
                                        <Button variant="outline" onClick={() => setSubmitted(false)}>
                                            Send Another Message
                                        </Button>
                                    </div>
                                ) : (
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {/* Reusable Input Fields to reduce bloat */}
                                                <FormField
                                                    control={form.control}
                                                    name="name"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Full Name</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="John Doe" className="h-11" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="email"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Email Address</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="john@example.com" className="h-11" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <FormField
                                                    control={form.control}
                                                    name="phone"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Phone Number</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="017XXXXXXXX" className="h-11" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="category"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Topic</FormLabel>
                                                            <Select onValueChange={field.onChange} value={field.value}>
                                                                <FormControl>
                                                                    <SelectTrigger className="h-11">
                                                                        <SelectValue placeholder="Select a topic" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    {categories.map((cat) => (
                                                                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            <FormField
                                                control={form.control}
                                                name="subject"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Subject</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="How can we help?" className="h-11" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="message"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Message</FormLabel>
                                                        <FormControl>
                                                            <Textarea 
                                                                placeholder="Tell us more about your inquiry..." 
                                                                className="min-h-[150px] resize-none p-4" 
                                                                {...field} 
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <Button type="submit" disabled={isLoading} className="w-full h-11 text-base">
                                                {isLoading ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Send className="mr-2 h-4 w-4" /> Send Message
                                                    </>
                                                )}
                                            </Button>
                                        </form>
                                    </Form>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* 3. Sidebar (Map & FAQ) */}
                    <div className="space-y-8">
                        {/* Map Placeholder */}
                        <Card className="overflow-hidden border shadow-md">
                            <div className="h-[250px] bg-slate-100 dark:bg-slate-800 relative w-full flex items-center justify-center group cursor-pointer">
                                {/* Simulated Map Image Background */}
                                <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=Dhaka&zoom=13&size=600x300&key=YOUR_API_KEY')] bg-cover bg-center opacity-50 grayscale group-hover:grayscale-0 transition-all duration-500" />
                                <div className="z-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                                    <MapPin className="text-red-500 w-4 h-4" />
                                    <span className="text-sm font-semibold">View on Google Maps</span>
                                </div>
                            </div>
                            <CardContent className="p-5">
                                <h3 className="font-semibold text-lg mb-2">Main Office</h3>
                                <p className="text-muted-foreground text-sm mb-4">
                                    Level 4, Khan Tower, Banani<br/>
                                    Dhaka - 1213, Bangladesh
                                </p>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Clock className="w-4 h-4" />
                                    <span>Mon - Sat: 9:00 AM - 8:00 PM</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* FAQ Section */}
                        <Card className="border shadow-md">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-xl">
                                    <HelpCircle className="w-5 h-5 text-primary" /> 
                                    Common Questions
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Accordion type="single" collapsible className="w-full">
                                    {faqs.map((faq, index) => (
                                        <AccordionItem key={index} value={`item-${index}`}>
                                            <AccordionTrigger className="text-left text-sm font-medium">
                                                {faq.question}
                                            </AccordionTrigger>
                                            <AccordionContent className="text-muted-foreground text-sm">
                                                {faq.answer}
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Contact