import React from 'react'
import { 
    Card, 
    CardContent, 
    CardHeader, 
    CardTitle, 
    CardDescription 
} from "@/components/ui/card"
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
    ArrowRight
} from "lucide-react"
import { SectionHeader } from '@/components/shared/sections/SectionHeader';

// --- Types & Data ---
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
        description: "Ultra-fast delivery service within the city limits.",
        icon: <Truck size={28} />,
        stats: "Within 6 Hours",
        benefits: ["Express pickup (2h)", "Priority routing", "Money-back guarantee"]
    },
    {
        id: 2,
        title: "Secure Payments",
        description: "Bank-grade encryption for all transactions.",
        icon: <CreditCard size={28} />,
        stats: "100% Secure",
        benefits: ["SSL Encryption", "Fraud protection", "Instant confirmation"]
    },
    {
        id: 3,
        title: "Live Tracking",
        description: "Real-time GPS updates for every step of the journey.",
        icon: <MapPin size={28} />,
        stats: "Real-time",
        benefits: ["GPS Location", "SMS Updates", "Photo Proof"]
    },
    {
        id: 4,
        title: "Insured & Safe",
        description: "Comprehensive coverage for your peace of mind.",
        icon: <Shield size={28} />,
        stats: "Fully Insured",
        benefits: ["Tamper-proof bags", "Damage compensation", "Vetted drivers"]
    }
]

const additionalFeatures = [
    { icon: <Clock size={20} />, title: "24/7 Support", desc: "Always here for you" },
    { icon: <Smartphone size={20} />, title: "Mobile App", desc: "Book on the go" },
    { icon: <Users size={20} />, title: "Bulk Orders", desc: "Business rates available" },
    { icon: <Award size={20} />, title: "Top Quality", desc: "Satisfaction guaranteed" },
    { icon: <Zap size={20} />, title: "Instant Quotes", desc: "No hidden fees" },
    { icon: <Headphones size={20} />, title: "Premium Care", desc: "Dedicated agents" }
]

const statsData = [
    { label: "Parcels Delivered", value: "50K+" },
    { label: "Districts Covered", value: "64" },
    { label: "Success Rate", value: "99.9%" },
    { label: "Support", value: "24/7" },
]

const Feature = () => {
    return (
        <section className="py-24 bg-background relative overflow-hidden">
            {/* Background Decorator (Optional subtle element) */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                
                {/* 1. Header Section */}
                <div className="max-w-3xl mx-auto mb-20 text-center">
                    <SectionHeader
                        badge="Why Choose Us"
                        icon={Award}
                        title="Delivery Solutions"
                        highlight="Reimagined"
                        description="Experience the difference with our comprehensive delivery ecosystem. Designed for speed, security, and transparency."
                        className="items-center text-center"
                    />
                </div>

                {/* 2. Main Features (Bento Grid Style) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
                    {mainFeatures.map((feature) => (
                        <Card 
                            key={feature.id} 
                            className="group relative overflow-hidden border-border bg-card hover:shadow-xl hover:border-primary/50 transition-all duration-300 flex flex-col"
                        >
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-primary/10 text-primary rounded-xl group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                                        {feature.icon}
                                    </div>
                                    {feature.stats && (
                                        <Badge variant="secondary" className="font-semibold">
                                            {feature.stats}
                                        </Badge>
                                    )}
                                </div>
                                <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                                <CardDescription className="text-muted-foreground/90 mt-2">
                                    {feature.description}
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="mt-auto pt-4">
                                <div className="space-y-2">
                                    {feature.benefits.map((benefit, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <div className="flex-shrink-0 w-1 h-1 rounded-full bg-primary" />
                                            <span>{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                            
                            {/* Decorative bottom gradient line */}
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                        </Card>
                    ))}
                </div>

                {/* 3. Stats Strip (Technical/Clean Look) */}
                <div className="mb-24">
                    <div className="rounded-2xl border bg-card shadow-sm p-8 md:p-12">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x divide-border">
                            {statsData.map((stat, index) => (
                                <div key={index} className="text-center px-4">
                                    <h4 className="text-4xl md:text-5xl font-extrabold text-primary mb-2 tracking-tight">
                                        {stat.value}
                                    </h4>
                                    <p className="text-muted-foreground font-medium text-sm uppercase tracking-wider">
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 4. Additional Services (Compact Grid) */}
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-10">
                        <h3 className="text-2xl font-bold text-foreground">
                            Everything else you need
                        </h3>
                        <p className="text-muted-foreground mt-2">
                            Built for businesses and individuals alike.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {additionalFeatures.map((feature, index) => (
                            <div 
                                key={index}
                                className="group flex items-center gap-4 p-4 rounded-lg border bg-background hover:bg-accent/50 hover:border-accent transition-all duration-200"
                            >
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                    {feature.icon}
                                </div>
                                <div>
                                    <h4 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">
                                        {feature.title}
                                    </h4>
                                    <p className="text-xs text-muted-foreground">
                                        {feature.desc}
                                    </p>
                                </div>
                                <ArrowRight className="ml-auto w-4 h-4 text-muted-foreground/30 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Feature