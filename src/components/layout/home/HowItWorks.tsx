import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
    Package, 
    CheckCircle, 
    TruckIcon, 
    MapPin,
    ArrowRight,
    Clock,
    Smartphone,
    Shield
} from "lucide-react"

interface Step {
    id: number;
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    bgColor: string;
    details: string[];
}

const steps: Step[] = [
    {
        id: 1,
        title: "Book Your Parcel",
        description: "Fill out sender and receiver details, select parcel type, and get instant pricing",
        icon: <Package size={32} />,
        color: "text-blue-600",
        bgColor: "bg-blue-100",
        details: [
            "Enter pickup and delivery addresses",
            "Choose parcel type and weight",
            "Get instant price quote",
            "Select payment method"
        ]
    },
    {
        id: 2,
        title: "Get Approved",
        description: "Our team reviews and approves your booking within minutes",
        icon: <CheckCircle size={32} />,
        color: "text-green-600",
        bgColor: "bg-green-100",
        details: [
            "Automated verification process",
            "Instant booking confirmation",
            "Tracking ID generation",
            "SMS & email notifications"
        ]
    },
    {
        id: 3,
        title: "Pickup & Transit",
        description: "Our delivery partner picks up your parcel and begins the journey",
        icon: <TruckIcon size={32} />,
        color: "text-orange-600",
        bgColor: "bg-orange-100",
        details: [
            "Scheduled pickup from sender",
            "Real-time GPS tracking",
            "Status updates at each hub",
            "Secure handling throughout"
        ]
    },
    {
        id: 4,
        title: "Safe Delivery",
        description: "Your parcel reaches the receiver safely with proof of delivery",
        icon: <MapPin size={32} />,
        color: "text-purple-600",
        bgColor: "bg-purple-100",
        details: [
            "Direct delivery to receiver",
            "Digital proof of delivery",
            "Signature confirmation",
            "Completion notification"
        ]
    }
]

const HowItWorks = () => {
    return (
        <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Header */}
                <div className="text-center mb-16">
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 text-sm font-medium border-0 mb-4">
                        Simple Process
                    </Badge>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        How It{" "}
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Works
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Send your parcel in 4 simple steps. Our streamlined process ensures 
                        fast, secure, and reliable delivery across Bangladesh.
                    </p>
                </div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    {steps.map((step, index) => (
                        <div key={step.id} className="relative">
                            {/* Connection Line (Desktop Only) */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-24 left-full w-8 h-0.5 bg-gradient-to-r from-gray-300 to-gray-200 dark:from-gray-600 dark:to-gray-700 transform -translate-x-4">
                                    <ArrowRight 
                                        size={16} 
                                        className="absolute -top-2 -right-2 text-gray-400 dark:text-gray-600" 
                                    />
                                </div>
                            )}

                            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full">
                                <CardContent className="p-8 text-center">
                                    {/* Step Number */}
                                    <div className="relative mb-6">
                                        <div className={`${step.bgColor} ${step.color} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                                            {step.icon}
                                        </div>
                                        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                                            {step.id}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                            {step.description}
                                        </p>

                                        {/* Details List */}
                                        <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-2 text-left">
                                            {step.details.map((detail, idx) => (
                                                <li key={idx} className="flex items-start gap-2">
                                                    <div className={`w-1.5 h-1.5 ${step.bgColor} rounded-full mt-2 flex-shrink-0`}></div>
                                                    <span>{detail}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>

                {/* Additional Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-0 shadow-lg">
                        <CardContent className="p-6 text-center">
                            <div className="bg-blue-100 dark:bg-blue-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Smartphone size={24} className="text-blue-600 dark:text-blue-400" />
                            </div>
                            <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                                Real-time Tracking
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                Track your parcel every step of the way with live GPS updates and notifications
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-0 shadow-lg">
                        <CardContent className="p-6 text-center">
                            <div className="bg-green-100 dark:bg-green-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Shield size={24} className="text-green-600 dark:text-green-400" />
                            </div>
                            <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                                Secure & Insured
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                All parcels are fully insured and handled with maximum security protocols
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 border-0 shadow-lg">
                        <CardContent className="p-6 text-center">
                            <div className="bg-purple-100 dark:bg-purple-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Clock size={24} className="text-purple-600 dark:text-purple-400" />
                            </div>
                            <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                                Same Day Delivery
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                Express delivery options available for urgent parcels within the same city
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                        <h3 className="text-2xl font-bold mb-4">
                            Ready to Send Your First Parcel?
                        </h3>
                        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                            Join thousands of satisfied customers who trust us with their deliveries. 
                            Start your booking now and experience hassle-free parcel delivery.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2">
                                <Package size={20} />
                                Book Now
                            </button>
                            <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors duration-200 flex items-center justify-center gap-2">
                                <TruckIcon size={20} />
                                Track Parcel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HowItWorks