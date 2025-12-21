import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
    Package, 
    CheckCircle, 
    Truck, 
    MapPin,
    ArrowRight,
    Clock,
    Smartphone,
    Shield
} from "lucide-react"
import { SectionHeader } from '@/components/shared/SectionHeader'

interface Step {
    id: number;
    title: string;
    description: string;
    icon: React.ReactNode;
    details: string[];
}

const steps: Step[] = [
    {
        id: 1,
        title: "Book Your Parcel",
        description: "Fill out sender and receiver details, select parcel type, and get instant pricing",
        icon: <Package size={32} />,
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
        icon: <Truck size={32} />,
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
        <section className="py-20 bg-background">
            <div className="container mx-auto px-6">
                
                {/* Section Header */}
                <SectionHeader
                title='How It'
                highlight='Works'
                description='Send your parcel in 4 simple steps. Our streamlined process ensures 
                fast, secure, and reliable delivery across Bangladesh.'
                className='text-center mb-16'
                badge='Simple Process'
                icon={Package}

                />
              

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    {steps.map((step, index) => (
                        <div key={step.id} className="relative">
                            {/* Connection Line (Desktop Only) */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-24 left-full w-8 h-0.5 bg-border transform -translate-x-4">
                                    <ArrowRight 
                                        size={16} 
                                        className="absolute -top-2 -right-2 text-muted-foreground" 
                                    />
                                </div>
                            )}

                            <Card className="bg-card border shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full">
                                <CardContent className="p-8 text-center">
                                    {/* Step Number & Icon */}
                                    <div className="relative mb-6">
                                        <div className="bg-primary/10 text-primary w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                            {step.icon}
                                        </div>
                                        <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                                            {step.id}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-bold text-card-foreground">
                                            {step.title}
                                        </h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {step.description}
                                        </p>

                                        {/* Details List */}
                                        <ul className="text-sm text-muted-foreground space-y-2 text-left">
                                            {step.details.map((detail, idx) => (
                                                <li key={idx} className="flex items-start gap-2">
                                                    <div className="w-1.5 h-1.5 bg-primary/60 rounded-full mt-2 flex-shrink-0"></div>
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <Card className="bg-card border shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardContent className="p-8 text-center">
                            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Smartphone size={24} className="text-primary" />
                            </div>
                            <h4 className="text-lg font-bold text-card-foreground mb-3">
                                Real-time Tracking
                            </h4>
                            <p className="text-muted-foreground leading-relaxed">
                                Track your parcel every step of the way with live GPS updates and notifications
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-card border shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardContent className="p-8 text-center">
                            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Shield size={24} className="text-primary" />
                            </div>
                            <h4 className="text-lg font-bold text-card-foreground mb-3">
                                Secure & Insured
                            </h4>
                            <p className="text-muted-foreground leading-relaxed">
                                All parcels are fully insured and handled with maximum security protocols
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-card border shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardContent className="p-8 text-center">
                            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Clock size={24} className="text-primary" />
                            </div>
                            <h4 className="text-lg font-bold text-card-foreground mb-3">
                                Same Day Delivery
                            </h4>
                            <p className="text-muted-foreground leading-relaxed">
                                Express delivery options available for urgent parcels within the same city
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Bottom CTA */}
                <div className="text-center">
                    <Card className="bg-primary text-primary-foreground border-0 shadow-2xl">
                        <CardContent className="p-12">
                            <div className="max-w-3xl mx-auto">
                                <h3 className="text-3xl md:text-4xl font-bold mb-6">
                                    Ready to Send Your First Parcel?
                                </h3>
                                <p className="text-lg text-primary-foreground/80 mb-8 leading-relaxed">
                                    Join thousands of satisfied customers who trust us with their deliveries. 
                                    Start your booking now and experience hassle-free parcel delivery.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                                    <Button 
                                        size="lg"
                                        className="bg-background text-foreground hover:bg-background/90 h-14 text-lg font-semibold shadow-lg"
                                    >
                                        <Package size={20} className="mr-2" />
                                        Book Now
                                        <ArrowRight size={18} className="ml-2" />
                                    </Button>
                                    <Button 
                                        size="lg"
                                        variant="outline"
                                        className="border-2 border-primary-foreground text-primary hover:bg-primary-foreground/10 h-14 text-lg font-semibold"
                                    >
                                        <Truck size={20} className="mr-2" />
                                        Track Parcel
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}

export default HowItWorks