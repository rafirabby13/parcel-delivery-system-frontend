import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import {
    Calculator,
    MapPin,
    Weight,
    DollarSign,
    CheckCircle,
    Truck,
    Zap,
    Package,
    ArrowRight,
    Star
} from "lucide-react"
import { SectionHeader } from '@/components/shared/SectionHeader'

interface PricingTier {
    name: string;
    description: string;
    baseRate: number;
    weightRate: number;
    features: string[];
    icon: React.ReactNode;
    color: string;
    gradient: string;
    popular?: boolean;
}

const pricingTiers: PricingTier[] = [
    {
        name: "Standard",
        description: "Perfect for regular deliveries",
        baseRate: 60,
        weightRate: 8,
        features: [
            "2-3 day delivery",
            "Basic tracking",
            "SMS notifications",
            "Standard packaging",
            "Email support"
        ],
        icon: <Package size={24} />,
        color: "text-primary",
        gradient: "from-primary/20 to-primary/10"
    },
    {
        name: "Express",
        description: "Fast delivery when you need it",
        baseRate: 100,
        weightRate: 12,
        features: [
            "Same day delivery",
            "Real-time GPS tracking",
            "SMS + Email alerts",
            "Priority handling",
            "Phone support"
        ],
        icon: <Zap size={24} />,
        color: "text-primary",
        gradient: "from-primary/30 to-primary/15",
        popular: true
    },
    {
        name: "Premium",
        description: "Premium service with extra care",
        baseRate: 150,
        weightRate: 15,
        features: [
            "Same day delivery",
            "Live tracking + photos",
            "Multi-channel alerts",
            "Special packaging",
            "24/7 dedicated support",
            "Insurance included"
        ],
        icon: <Truck size={24} />,
        color: "text-primary",
        gradient: "from-primary/40 to-primary/20"
    }
]

const divisions = [
    "Dhaka", "Chittagong", "Sylhet", "Khulna", "Barishal",
    "Rangpur", "Rajshahi", "Mymensingh"
]

const getDistanceCharge = (from: string, to: string): number => {
    if (from === to) return 20 // Same division
    const majorCities = ["Dhaka", "Chittagong", "Sylhet", "Khulna"]
    if (majorCities.includes(from) && majorCities.includes(to)) return 50
    return 80 // Different divisions
}

const PricingOverview = () => {
    const [selectedTier, setSelectedTier] = useState<PricingTier>(pricingTiers[1]) // Express as default
    const [calculatedPrice, setCalculatedPrice] = useState<number>(0)
    const [weight, setWeight] = useState<number>(1)
    const [fromDivision, setFromDivision] = useState<string>("")
    const [toDivision, setToDivision] = useState<string>("")

    useEffect(() => {
        if (weight && fromDivision && toDivision) {
            const distanceCharge = getDistanceCharge(fromDivision, toDivision)
            const weightCharge = weight * selectedTier.weightRate
            const total = selectedTier.baseRate + weightCharge + distanceCharge
            setCalculatedPrice(total)
        }
    }, [weight, fromDivision, toDivision, selectedTier])

    const formatCurrency = (amount: number) => {
        return `৳${amount.toLocaleString('en-BD')}`
    }

    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-6">
                <SectionHeader
                    badge="Transparent Pricing"
                    icon={Calculator}
                    title="Simple & Fair"
                    highlight="Pricing"
                    description="Calculate your delivery cost instantly. No hidden fees, just transparent pricing for reliable parcel delivery across Bangladesh."
                />

                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 -z-10" style={{ filter: "drop-shadow(0 10px 10px rgba(0,0,0,0.1))" }} >
                    {pricingTiers.map((tier) => (
                        <Card
                        
                        style={{ clipPath: "polygon(0px 0, 100% 0, 70% 100%, 0 100%, 0 40px)" }}
                            key={tier.name}
                            className={`relative cursor-pointer transition-all duration-300 hover:shadow-xl border-2 ${selectedTier.name === tier.name
                                    ? 'border-primary shadow-lg bg-card'
                                    : 'border-border hover:border-muted-foreground bg-card'
                                }`}
                            onClick={() => setSelectedTier(tier)}
                        >
                            {tier.popular && (
                                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                    <Badge className="bg-primary text-primary-foreground px-4 py-3 text-xs font-semibold border-0 shadow-md">
                                        <Star size={12} className="mr-1" />
                                        Most Popular
                                    </Badge>
                                </div>
                            )}

                            <CardHeader className="text-center pb-4">
                                <div className={`mx-auto w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground mb-4 shadow-lg`}>
                                    {tier.icon}
                                </div>
                                <CardTitle className="text-xl font-bold text-card-foreground">
                                    {tier.name}
                                </CardTitle>
                                <p className="text-sm text-muted-foreground mt-1">
                                    {tier.description}
                                </p>
                                <div className="mt-4">
                                    <div className="text-3xl font-bold text-card-foreground">
                                        {formatCurrency(tier.baseRate)}
                                        <span className="text-lg text-muted-foreground font-normal">+ weight</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        {formatCurrency(tier.weightRate)} per kg
                                    </p>
                                </div>
                            </CardHeader>

                            <CardContent>
                                <ul className="space-y-3">
                                    {tier.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-sm">
                                            <CheckCircle size={16} className="text-primary mt-0.5 flex-shrink-0" />
                                            <span className="text-muted-foreground">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Calculator and Results */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">

                    {/* Calculator Form */}
                    <Card className="bg-card border shadow-xl">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-2xl font-bold text-card-foreground">
                                <div className="bg-primary p-3 rounded-xl text-primary-foreground shadow-lg">
                                    <Calculator size={24} />
                                </div>
                                Calculate Your Cost
                            </CardTitle>
                            <p className="text-muted-foreground">
                                Get instant pricing for your {selectedTier.name.toLowerCase()} delivery
                            </p>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-6">
                                {/* Weight Input */}
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-card-foreground mb-2">
                                        <Weight size={16} className="text-primary" />
                                        Package Weight
                                    </label>
                                    <div className="relative">
                                        <Input
                                            type="string"
                                            step="0.1"
                                            min="0.1"
                                            placeholder="0.0"
                                            className="h-14 text-lg pl-4 pr-12 border-2 focus:border-primary"
                                            value={weight}
                                            onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
                                        />
                                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground font-medium">
                                            kg
                                        </span>
                                    </div>
                                </div>

                                {/* From Division */}
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-card-foreground mb-2">
                                        <MapPin size={16} className="text-primary" />
                                        Pickup Location
                                    </label>
                                    <Select onValueChange={setFromDivision} value={fromDivision}>
                                        <SelectTrigger className="h-14 text-lg border-2 focus:border-primary">
                                            <SelectValue placeholder="Select pickup division" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {divisions.map((division) => (
                                                <SelectItem key={division} value={division} className="py-3">
                                                    {division}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* To Division */}
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-card-foreground mb-2">
                                        <MapPin size={16} className="text-primary" />
                                        Delivery Location
                                    </label>
                                    <Select onValueChange={setToDivision} value={toDivision}>
                                        <SelectTrigger className="h-14 text-lg border-2 focus:border-primary">
                                            <SelectValue placeholder="Select delivery division" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {divisions.map((division) => (
                                                <SelectItem key={division} value={division} className="py-3">
                                                    {division}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Results Panel */}
                    <Card className="bg-card border shadow-xl">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-2xl font-bold text-card-foreground">
                                <div className="bg-primary p-3 rounded-xl text-primary-foreground shadow-lg">
                                    <DollarSign size={24} />
                                </div>
                                Cost Breakdown
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {calculatedPrice > 0 ? (
                                <div className="space-y-6">
                                    {/* Selected Service */}
                                    <div className="bg-muted/50 p-5 rounded-xl border border-border">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className={`p-2 rounded-lg bg-primary text-primary-foreground`}>
                                                {selectedTier.icon}
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-bold text-card-foreground">
                                                    {selectedTier.name} Service
                                                </h4>
                                                <p className="text-sm text-muted-foreground">
                                                    {selectedTier.description}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {selectedTier.features.slice(0, 4).map((feature, idx) => (
                                                <div key={idx} className="flex items-center gap-2 text-sm">
                                                    <CheckCircle size={14} className="text-primary flex-shrink-0" />
                                                    <span className="text-muted-foreground">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Price Details */}
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center py-3 border-b border-border">
                                            <span className="text-muted-foreground font-medium">Base Rate</span>
                                            <span className="text-lg font-semibold text-card-foreground">
                                                {formatCurrency(selectedTier.baseRate)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center py-3 border-b border-border">
                                            <span className="text-muted-foreground font-medium">
                                                Weight ({weight}kg × {formatCurrency(selectedTier.weightRate)})
                                            </span>
                                            <span className="text-lg font-semibold text-card-foreground">
                                                {formatCurrency(weight * selectedTier.weightRate)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center py-3 border-b border-border">
                                            <span className="text-muted-foreground font-medium">Distance Charge</span>
                                            <span className="text-lg font-semibold text-card-foreground">
                                                {formatCurrency(getDistanceCharge(fromDivision, toDivision))}
                                            </span>
                                        </div>

                                        {/* Total */}
                                        <div className="bg-primary/10 p-5 rounded-xl">
                                            <div className="flex justify-between items-center">
                                                <span className="text-xl font-bold text-card-foreground">
                                                    Total Cost
                                                </span>
                                                <span className="text-3xl font-bold text-primary">
                                                    {formatCurrency(calculatedPrice)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Book Button */}
                                    <Button className="w-full h-16 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl">
                                        <Package size={20} className="mr-3" />
                                        Book This Delivery
                                        <ArrowRight size={18} className="ml-3" />
                                    </Button>
                                </div>
                            ) : (
                                <div className="text-center py-16">
                                    <div className="bg-muted w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Calculator size={40} className="text-muted-foreground" />
                                    </div>
                                    <h4 className="text-xl font-bold text-card-foreground mb-3">
                                        Calculate Your Cost
                                    </h4>
                                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                                        Enter your package details and locations to get an instant price quote
                                    </p>
                                    <div className="space-y-2 text-sm text-muted-foreground">
                                        <p>✓ Base rates from {formatCurrency(60)}</p>
                                        <p>✓ Weight-based pricing</p>
                                        <p>✓ Distance-based charges</p>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Additional Information */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Pricing Info */}
                    <Card className="bg-card border shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-xl font-bold text-card-foreground flex items-center gap-3">
                                <CheckCircle size={24} className="text-primary" />
                                Pricing Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-xl">
                                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                                    <span className="text-muted-foreground">
                                        Same division delivery: <strong>+৳20</strong>
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-xl">
                                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                                    <span className="text-muted-foreground">
                                        Major cities: <strong>+৳50</strong>
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-xl">
                                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                                    <span className="text-muted-foreground">
                                        Different divisions: <strong>+৳80</strong>
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
                                    <CheckCircle size={16} className="text-primary" />
                                    <span className="text-muted-foreground">
                                        <strong>No hidden fees</strong> or surprises
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Special Offers */}
                    <Card className="bg-card border shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-xl font-bold text-card-foreground flex items-center gap-3">
                                <Star size={24} className="text-primary" />
                                Special Offers
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
                                    <Badge className="bg-primary text-primary-foreground border-0">10%</Badge>
                                    <span className="text-muted-foreground">
                                        First-time user discount
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
                                    <Badge className="bg-primary text-primary-foreground border-0">15%</Badge>
                                    <span className="text-muted-foreground">
                                        Bulk orders (10+ parcels)
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
                                    <Badge className="bg-primary text-primary-foreground border-0">25%</Badge>
                                    <span className="text-muted-foreground">
                                        Monthly subscription plans
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
                                    <Truck size={16} className="text-primary" />
                                    <span className="text-muted-foreground">
                                        Corporate custom pricing
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}

export default PricingOverview