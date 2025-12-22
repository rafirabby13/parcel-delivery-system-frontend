import { useState } from 'react'
import { Card, CardContent} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
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
} from "lucide-react"
import { Textarea } from '@/components/ui/textarea'
import { SectionHeader } from '@/components/shared/sections/SectionHeader'

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
        icon: <Phone size={32} />,
        title: "Call Us",
        description: "Speak directly with our support team",
        value: "+880 1XXX-XXXXXX",
        subtext: "Available 24/7",
        color: "text-blue-600",
        bgColor: "bg-blue-100",
        gradient: "from-blue-500 to-cyan-500"
    },
    {
        icon: <Mail size={32} />,
        title: "Email Us",
        description: "Send us a detailed message",
        value: "support@parceldelivery.com",
        subtext: "Response within 2 hours",
        color: "text-green-600",
        bgColor: "bg-green-100",
        gradient: "from-green-500 to-emerald-500"
    },
    {
        icon: <MessageSquare size={32} />,
        title: "Live Chat",
        description: "Instant support through chat",
        value: "Start Chat",
        subtext: "Online now",
        color: "text-purple-600",
        bgColor: "bg-purple-100",
        gradient: "from-purple-500 to-pink-500"
    },
    {
        icon: <MapPin size={32} />,
        title: "Visit Office",
        description: "Meet us at our main office",
        value: "Dhaka, Bangladesh",
        subtext: "Mon-Sat, 9AM-6PM",
        color: "text-orange-600",
        bgColor: "bg-orange-100",
        gradient: "from-orange-500 to-red-500"
    }
]

const categories = [
    "General Inquiry",
    "Delivery Issue",
    "Billing Question",
    "Technical Support",
    "Partnership",
    "Complaint",
    "Feedback",
    "Other"
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
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000))

            console.log("Contact form submission:", values)
            setSubmitted(true)
            toast.success("Message sent successfully! We'll get back to you soon.")
            form.reset()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
        } catch (error: any) {
            toast.error("Failed to send message. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white  dark:from-background  dark:to-card">

            {/* Hero Section */}
            <section className="pt-20 pb-16 bg-gradient-to-br from-white via-blue-50 to-purple-50  dark:from-background dark:via-muted/95 dark:to-card">
                <div className="container mx-auto ">
                    <div className="text-center">
                        <Badge className=" px-4 py-2 text-sm font-medium border-0 mb-6">
                            Contact Us
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 font-bold">
                            Get in Touch
                            <br />
                            <span className="">We're Here to Help</span>
                        </h1>
                        <p className="text-xl max-w-3xl mx-auto leading-relaxed">
                            Have questions about our services? Need support with your delivery?
                            Our dedicated team is available 24/7 to assist you.
                        </p>
                    </div>
                </div>
            </section>


            <div className="container mx-auto ">

                {/* Contact Methods */}
                <section className="py-10">

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                        {contactMethods.map((method, index) => (
                            <Card key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
                                <div className={`h-1 bg-gradient-to-r ${method.gradient}`}></div>
                                <CardContent className="p-8 text-center">
                                    <div className={`${method.bgColor} ${method.color} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        {method.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                        {method.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                                        {method.description}
                                    </p>
                                    <div className="font-semibold text-gray-900 dark:text-white mb-2">
                                        {method.value}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {method.subtext}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                
           
                    
                        <SectionHeader
                            badge="Contact"
                            title="We'd Love to Hear From You"
                            highlight="Get in Touch"
                            description="Whether you have a question about our services, need assistance with a delivery, or just want to provide feedback, our team is here to help. Fill out the form below and we'll respond as soon as possible."
                            className="mb-0"

                        />
                     
                  
              
                <section className="py-10">
                    <div className="grid max-w-3xl mx-auto gap-12">

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-0 shadow-2xl">

                                <CardContent className="space-y-6">
                                    {submitted ? (
                                        <div className="text-center py-12">
                                            <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
                                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                                Message Sent Successfully!
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300 mb-6">
                                                Thank you for contacting us. We'll respond to your inquiry within 2 hours.
                                            </p>
                                            <Button
                                                onClick={() => setSubmitted(false)}
                                                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                                            >
                                                Send Another Message
                                            </Button>
                                        </div>
                                    ) : (
                                        <Form {...form}>
                                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <FormField
                                                        control={form.control}
                                                        name="name"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Full Name</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        placeholder="Enter your full name"
                                                                        className="h-12"
                                                                        {...field}
                                                                    />
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
                                                                    <Input
                                                                        type="email"
                                                                        placeholder="Enter your email"
                                                                        className="h-12"
                                                                        {...field}
                                                                    />
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
                                                                    <Input
                                                                        placeholder="01XXXXXXXXX"
                                                                        className="h-12"
                                                                        {...field}
                                                                    />
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
                                                                <FormLabel>Category</FormLabel>
                                                                <Select onValueChange={field.onChange} value={field.value}>
                                                                    <FormControl>
                                                                        <SelectTrigger className="h-12">
                                                                            <SelectValue placeholder="Select category" />
                                                                        </SelectTrigger>
                                                                    </FormControl>
                                                                    <SelectContent>
                                                                        {categories.map((category) => (
                                                                            <SelectItem key={category} value={category}>
                                                                                {category}
                                                                            </SelectItem>
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
                                                                <Input
                                                                    placeholder="Brief description of your inquiry"
                                                                    className="h-12"
                                                                    {...field}
                                                                />
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
                                                                    placeholder="Please provide detailed information about your inquiry..."
                                                                    className="min-h-32 resize-none"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <Button
                                                    type="submit"
                                                    disabled={isLoading}
                                                    className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-primary/70 hover:from-indigo-700 hover:to-purple-700 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300"
                                                >
                                                    {isLoading ? (
                                                        <div className="flex items-center gap-3">
                                                            <Loader2 size={24} className="animate-spin" />
                                                            <span>Sending Message...</span>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center gap-3">
                                                            <Send size={24} />
                                                            <span>Send Message</span>
                                                        </div>
                                                    )}
                                                </Button>
                                            </form>
                                        </Form>
                                    )}
                                </CardContent>
                            </Card>
                        </div>


                    </div>
                </section>

              
            </div>
        </div>
    )
}

export default Contact