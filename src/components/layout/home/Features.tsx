import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
    Truck, 
    CreditCard, 
    MapPin,
    Shield,
    Clock,
    Smartphone,
    Users,
    Award,
    Zap,
    Headphones,
    CheckCircle
} from "lucide-react"

interface Feature {
    id: number;
    title: string;
    description: string;
    icon: React.ReactNode;
    stats?: string;
    benefits: string[];
}

const mainFeatures: Feature[] = [
    {
        id: 1,
        title: "Same-Day Delivery",
        description: "Ultra-fast delivery service within the same city for urgent parcels",
        icon: <Truck size={32} />,
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
        description: "Round-the-clock customer service"
    },
    {
        icon: <Smartphone size={24} />,
        title: "Mobile App",
        description: "Easy booking via mobile application"
    },
    {
        icon: <Users size={24} />,
        title: "Bulk Orders",
        description: "Special rates for businesses"
    },
    {
        icon: <Award size={24} />,
        title: "Quality Guarantee",
        description: "Satisfaction guaranteed or money back"
    },
    {
        icon: <Zap size={24} />,
        title: "Instant Quotes",
        description: "Get pricing instantly online"
    },
    {
        icon: <Headphones size={24} />,
        title: "Priority Support",
        description: "Dedicated support for premium users"
    }
]

const Feature = () => {
    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-6">
                
                {/* Section Header */}
                <div className="text-center mb-16">
                    <Badge className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2 text-sm font-medium border-0 mb-6 shadow-lg">
                        <Award size={16} />
                        Why Choose Us
                    </Badge>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 tracking-tight">
                        Premium{" "}
                        <span className="text-primary">
                            Features
                        </span>
                    </h2>
                    <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Experience the difference with our comprehensive delivery solutions. 
                        We provide everything you need for hassle-free parcel delivery.
                    </p>
                </div>

                {/* Main Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    {mainFeatures.map((feature) => (
                        <Card 
                            key={feature.id} 
                            className="bg-card border shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group overflow-hidden"
                        >
                            {/* Primary accent bar */}
                            <div className="h-1 bg-primary"></div>
                            
                            <CardContent className="p-8">
                                {/* Icon and Stats */}
                                <div className="flex items-start justify-between mb-6">
                                    <div className="bg-primary/10 text-primary w-16 h-16 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        {feature.icon}
                                    </div>
                                    {feature.stats && (
                                        <Badge className="bg-primary text-primary-foreground border-0 text-xs px-3 py-1">
                                            {feature.stats}
                                        </Badge>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold text-card-foreground group-hover:text-primary transition-colors duration-300">
                                        {feature.title}
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {feature.description}
                                    </p>

                                    {/* Benefits List */}
                                    <ul className="space-y-2">
                                        {feature.benefits.map((benefit, idx) => (
                                            <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <CheckCircle size={14} className="text-primary flex-shrink-0" />
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
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Additional{" "}
                            <span className="text-primary">
                                Services
                            </span>
                        </h3>
                        <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            Discover more ways we make parcel delivery simple, secure, and convenient for you.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {additionalFeatures.map((feature, index) => (
                            <Card 
                                key={index}
                                className="bg-card border hover:shadow-lg transition-all duration-300 hover:border-primary/50"
                            >
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-primary/10 text-primary w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                                            {feature.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-card-foreground mb-2">
                                                {feature.title}
                                            </h4>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
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
                <Card className="bg-primary text-primary-foreground border-0 shadow-2xl">
                    <CardContent className="p-12">
                        <div className="text-center mb-12">
                            <h3 className="text-3xl md:text-4xl font-bold mb-6">
                                Trusted by Thousands
                            </h3>
                            <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg leading-relaxed">
                                Our commitment to excellence shows in our numbers. 
                                Join the growing community of satisfied customers.
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            <div className="text-center">
                                <div className="text-4xl md:text-6xl font-bold mb-3">50K+</div>
                                <div className="text-primary-foreground/70 font-medium">Parcels Delivered</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl md:text-6xl font-bold mb-3">64</div>
                                <div className="text-primary-foreground/70 font-medium">Districts Covered</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl md:text-6xl font-bold mb-3">99.9%</div>
                                <div className="text-primary-foreground/70 font-medium">Success Rate</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl md:text-6xl font-bold mb-3">24/7</div>
                                <div className="text-primary-foreground/70 font-medium">Customer Support</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}

export default Feature