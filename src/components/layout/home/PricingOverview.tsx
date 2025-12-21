/* eslint-disable @typescript-eslint/no-unused-vars */
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
    Star,
    Loader2,
    AlertCircle
} from "lucide-react"
import { SectionHeader } from '@/components/shared/SectionHeader'
import { useGetPricingTiersQuery } from '@/redux/feature/pricing/pricing.api'

// --- 1. Type Definitions (Matches Backend) ---
interface IPricingTier {
    _id: string;
    title: string;
    description: string;
    basePrice: number;
    pricePerKg: number;
    features: string[];
    isActive: boolean;
}

// --- 2. Visual Configuration (Frontend Only) ---
// This maps backend titles to UI icons/colors so your backend stays clean of UI logic.
const TIER_VISUALS: Record<string, { icon: React.ReactNode; color: string; gradient: string; popular?: boolean }> = {
    "Standard": {
        icon: <Package size={24} />,
        color: "text-blue-600",
        gradient: "from-blue-500/20 to-blue-500/10",
        popular: false
    },
    "Express": {
        icon: <Zap size={24} />,
        color: "text-amber-500",
        gradient: "from-amber-500/30 to-amber-500/15",
        popular: true
    },
    "Premium": {
        icon: <Truck size={24} />,
        color: "text-purple-600",
        gradient: "from-purple-500/40 to-purple-500/20",
        popular: false
    }
}

// Default fallback for unknown tiers
const DEFAULT_VISUAL = {
    icon: <Package size={24} />,
    color: "text-primary",
    gradient: "from-primary/20 to-primary/10",
    popular: false
}

const DIVISIONS = [
    "Dhaka", "Chittagong", "Sylhet", "Khulna", "Barishal",
    "Rangpur", "Rajshahi", "Mymensingh"
]

const getDistanceCharge = (from: string, to: string): number => {
    if (!from || !to) return 0;
    if (from === to) return 20 // Same division
    const majorCities = ["Dhaka", "Chittagong", "Sylhet", "Khulna"]
    if (majorCities.includes(from) && majorCities.includes(to)) return 50
    return 80 // Different divisions
}

const PricingOverview = () => {
    // --- 3. API Query ---
    const { data: apiResponse, isLoading, isError } = useGetPricingTiersQuery(undefined);

    // Access the array safely (handles if response is wrapped in { data: [...] } or just [...])
    const pricingTiers: IPricingTier[] = Array.isArray(apiResponse) 
        ? apiResponse 
        : apiResponse?.data || [];

    // --- 4. State Management ---
    const [selectedTier, setSelectedTier] = useState<IPricingTier | null>(null);
    const [calculatedPrice, setCalculatedPrice] = useState<number>(0);
    const [weight, setWeight] = useState<number>(1);
    const [fromDivision, setFromDivision] = useState<string>("");
    const [toDivision, setToDivision] = useState<string>("");

    // Set default selected tier when data loads
    useEffect(() => {
        if (pricingTiers.length > 0 && !selectedTier) {
            // Try to find "Express" as default, otherwise first item
            const defaultTier = pricingTiers.find(t => t.title === "Express") || pricingTiers[0];
            setSelectedTier(defaultTier);
        }
    }, [pricingTiers, selectedTier]);

    // Calculate Price Effect
    useEffect(() => {
        if (weight && fromDivision && toDivision && selectedTier) {
            const distanceCharge = getDistanceCharge(fromDivision, toDivision);
            const weightCharge = weight * selectedTier.pricePerKg; // Using backend field
            const total = selectedTier.basePrice + weightCharge + distanceCharge; // Using backend field
            setCalculatedPrice(total);
        }
    }, [weight, fromDivision, toDivision, selectedTier]);

    const formatCurrency = (amount: number) => {
        return `৳${amount.toLocaleString('en-BD')}`;
    }

    // --- 5. Loading & Error Handling ---
    if (isLoading) {
        return (
            <div className="py-20 flex justify-center items-center min-h-[400px]">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 animate-spin text-primary" />
                    <p className="text-muted-foreground">Loading pricing options...</p>
                </div>
            </div>
        );
    }

    if (isError || !pricingTiers.length) {
        return (
            <div className="py-20 flex justify-center items-center min-h-[400px]">
                <div className="text-center space-y-3">
                    <AlertCircle className="w-10 h-10 text-destructive mx-auto" />
                    <h3 className="text-lg font-semibold">Unable to load pricing</h3>
                    <p className="text-muted-foreground">Please check your internet connection or try again later.</p>
                </div>
            </div>
        );
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
                
                {/* Tiers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 relative z-10">
                    {pricingTiers.map((tier) => {
                        // Merge API data with Visual Config
                        const visuals = TIER_VISUALS[tier.title] || DEFAULT_VISUAL;
                        const isSelected = selectedTier?._id === tier._id;

                        return (
                            <Card
                                key={tier._id}
                                style={{ clipPath: "polygon(5% 0%, 100% 0%, 100% 95%, 0% 100%)" }} 
                                className={`relative cursor-pointer transition-all duration-300 hover:shadow-xl border-2 shadow-2xl shadow-primary/10 bg-primary/3 hover:bg-primary/5
                                    ${isSelected
                                        ? 'border-primary shadow-lg  ring-2 ring-primary/20'
                                        : 'border-border hover:border-muted-foreground/50 '
                                    }`}
                                onClick={() => setSelectedTier(tier)}
                            >
                                {visuals.popular && (
                                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
                                        <Badge className="bg-primary text-primary-foreground px-4 py-1 text-xs font-semibold shadow-md">
                                            <Star size={12} className="mr-1" />
                                            Most Popular
                                        </Badge>
                                    </div>
                                )}

                                <CardHeader className="text-center pb-4">
                                    <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center text-primary-foreground mb-4 shadow-lg bg-gradient-to-br ${visuals.gradient} ${visuals.color.replace('text-', 'bg-')}`}>
                                        <div className="text-white">
                                            {visuals.icon}
                                        </div>
                                    </div>
                                    <CardTitle className="text-xl font-bold text-card-foreground">
                                        {tier.title}
                                    </CardTitle>
                                    <p className="text-sm text-muted-foreground mt-1 min-h-[40px] line-clamp-2">
                                        {tier.description}
                                    </p>
                                    <div className="mt-4">
                                        <div className="text-3xl font-bold text-card-foreground">
                                            {formatCurrency(tier.basePrice)}
                                            <span className="text-lg text-muted-foreground font-normal ml-1">+ weight</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            {formatCurrency(tier.pricePerKg)} per kg
                                        </p>
                                    </div>
                                </CardHeader>

                                <CardContent>
                                    <ul className="space-y-3">
                                        {tier.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-sm">
                                                <CheckCircle size={16} className={`mt-0.5 flex-shrink-0 ${visuals.color}`} />
                                                <span className="text-muted-foreground">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>

               

                
            </div>
        </section>
    )
}

export default PricingOverview