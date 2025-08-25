import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
    TruckIcon, 
    CreditCard, 
    MapPin,
    Shield,
    Clock,
    Smartphone,
    Users,
    Award,
    Zap,
    HeadphonesIcon,
    Package,
    CheckCircle
} from "lucide-react"

interface Feature {
    id: number;
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    bgColor: string;
    gradient: string;
    stats?: string;
    benefits: string[];
}

const mainFeatures: Feature[] = [
    {
        id: 1,
        title: "Same-Day Delivery",
        description: "Ultra-fast delivery service within the same city for urgent parcels",
        icon: <TruckIcon size={32} />,
        color: "text-blue-600",
        bgColor: "bg-blue-100",
        gradient: "from-blue-500 to-cyan-500",
        stats: "Within 6 Hours",
        benefits: [
            "Express pickup within 2 hours",
            "Priority handling and routing",
            "Real-time delivery tracking",
            "Money-back guarantee"
        ]
    },
    {
        id: 2,
        title: "Secure Online Payment",
        description: "Multiple secure payment options with full transaction protection",
        icon: <CreditCard size={32} />,
        color: "text-green-600",
        bgColor: "bg-green-100",
        gradient: "from-green-500 to-emerald-500",
        stats: "100% Secure",
        benefits: [
            "SSL encrypted transactions",
            "Multiple payment gateways",
            "Instant payment confirmation",
            "Fraud protection included"
        ]
    },
    {
        id: 3,
        title: "Real-time Tracking",
        description: "Track your parcel location and status updates in real-time",
        icon: <MapPin size={32} />,
        color: "text-purple-600",
        bgColor: "bg-purple-100",
        gradient: "from-purple-500 to-pink-500",
        stats: "Live Updates",
        benefits: [
            "GPS location tracking",
            "Status change notifications",
            "Delivery time predictions",
            "Photo proof of delivery"
        ]
    },
    {
        id: 4,
        title: "Safe & Reliable",
        description: "Comprehensive insurance coverage and secure handling protocols",
        icon: <Shield size={32} />,
        color: "text-orange-600",
        bgColor: "bg-orange-100",
        gradient: "from-orange-500 to-red-500",
        stats: "99.9% Success",
        benefits: [
            "Full insurance coverage",
            "Tamper-proof packaging",
            "Trained delivery personnel",
            "Damage compensation policy"
        ]
    }
]

const additionalFeatures = [
    {
        icon: <Clock size={24} />,
        title: "24/7 Support",
        description: "Round-the-clock customer service",
        color: "text-indigo-600",
        bgColor: "bg-indigo-50"
    },
    {
        icon: <Smartphone size={24} />,
        title: "Mobile App",
        description: "Easy booking via mobile application",
        color: "text-pink-600", 
        bgColor: "bg-pink-50"
    },
    {
        icon: <Users size={24} />,
        title: "Bulk Orders",
        description: "Special rates for businesses",
        color: "text-teal-600",
        bgColor: "bg-teal-50"
    },
    {
        icon: <Award size={24} />,
        title: "Quality Guarantee",
        description: "Satisfaction guaranteed or money back",
        color: "text-yellow-600",
        bgColor: "bg-yellow-50"
    },
    {
        icon: <Zap size={24} />,
        title: "Instant Quotes",
        description: "Get pricing instantly online",
        color: "text-violet-600",
        bgColor: "bg-violet-50"
    },
    {
        icon: <HeadphonesIcon size={24} />,
        title: "Priority Support",
        description: "Dedicated support for premium users",
        color: "text-rose-600",
        bgColor: "bg-rose-50"
    }
]

const Feature = () => {
    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Header */}
                <div className="text-center mb-16">
                    <Badge className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 text-sm font-medium border-0 mb-4">
                        Why Choose Us
                    </Badge>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        Premium{" "}
                        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Features
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Experience the difference with our comprehensive delivery solutions. 
                        We provide everything you need for hassle-free parcel delivery.
                    </p>
                </div>

                {/* Main Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    {mainFeatures.map((feature) => (
                        <Card 
                            key={feature.id} 
                            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group overflow-hidden"
                        >
                            {/* Gradient Top Border */}
                            <div className={`h-1 bg-gradient-to-r ${feature.gradient}`}></div>
                            
                            <CardContent className="p-8">
                                {/* Icon and Stats */}
                                <div className="flex items-start justify-between mb-6">
                                    <div className={`${feature.bgColor} ${feature.color} w-16 h-16 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        {feature.icon}
                                    </div>
                                    {feature.stats && (
                                        <Badge className={`bg-gradient-to-r ${feature.gradient} text-white border-0 text-xs px-2 py-1`}>
                                            {feature.stats}
                                        </Badge>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-indigo-600 group-hover:to-purple-600 transition-all duration-300">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                        {feature.description}
                                    </p>

                                    {/* Benefits List */}
                                    <ul className="space-y-2">
                                        {feature.benefits.map((benefit, idx) => (
                                            <li key={idx} className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                                <CheckCircle size={14} className={feature.color} />
                                                <span>{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Additional Features */}
                <div className="mb-16">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            Additional{" "}
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Services
                            </span>
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Discover more ways we make parcel delivery simple, secure, and convenient for you.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {additionalFeatures.map((feature, index) => (
                            <Card 
                                key={index}
                                className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:bg-white/80 dark:hover:bg-gray-800/80 hover:shadow-lg transition-all duration-300"
                            >
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className={`${feature.bgColor} ${feature.color} w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0`}>
                                            {feature.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                                                {feature.title}
                                            </h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Stats Section */}
                <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 text-white">
                    <div className="text-center mb-8">
                        <h3 className="text-3xl font-bold mb-4">
                            Trusted by Thousands
                        </h3>
                        <p className="text-indigo-100 max-w-2xl mx-auto">
                            Our commitment to excellence shows in our numbers. 
                            Join the growing community of satisfied customers.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-bold mb-2">10K+</div>
                            <div className="text-indigo-200 text-sm">Parcels Delivered</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-bold mb-2">64</div>
                            <div className="text-indigo-200 text-sm">Districts Covered</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-bold mb-2">99.9%</div>
                            <div className="text-indigo-200 text-sm">Success Rate</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-bold mb-2">24/7</div>
                            <div className="text-indigo-200 text-sm">Support Available</div>
                        </div>
                    </div>
                </div>

                {/* Feature Comparison */}
                <div className="mt-20 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            Why We're Different
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Compare our service with traditional delivery methods
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                            <Package size={32} className="text-gray-400 mx-auto mb-3" />
                            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Traditional</h4>
                            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                <li>• No real-time tracking</li>
                                <li>• Limited payment options</li>
                                <li>• Uncertain delivery times</li>
                                <li>• Manual processes</li>
                            </ul>
                        </div>

                        <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border-2 border-blue-200 dark:border-blue-700">
                            <Award size={32} className="text-blue-600 mx-auto mb-3" />
                            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Our Service</h4>
                            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                <li>• Live GPS tracking</li>
                                <li>• Multiple secure payments</li>
                                <li>• Guaranteed time slots</li>
                                <li>• Fully automated system</li>
                            </ul>
                        </div>

                        <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                            <CheckCircle size={32} className="text-green-600 mx-auto mb-3" />
                            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Premium Plus</h4>
                            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                <li>• Priority handling</li>
                                <li>• Dedicated support</li>
                                <li>• Insurance included</li>
                                <li>• Special packaging</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Feature