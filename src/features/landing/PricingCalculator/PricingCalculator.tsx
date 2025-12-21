/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Calculator,
    MapPin,
    Weight,
    DollarSign,
    Package,
    ArrowRight,
    Truck,
    Zap,
    Box,
    Star,
    CheckCircle
} from "lucide-react"
import { SectionHeader } from '@/components/shared/sections/SectionHeader'
import { useGetPricingTiersQuery } from '@/features/pricing/api/pricing.api'
import { Badge } from '@/components/ui/badge'

// --- Types (Reused or Imported) ---
export interface IPricingTier {
    _id: string;
    title: string;
    basePrice: number;
    pricePerKg: number;
    description?: string;
}

interface PricingCalculatorProps {
    tiers: IPricingTier[];
}

// --- Visual Config (You can move this to a constants file) ---
const TIER_VISUALS: Record<string, { icon: React.ReactNode; color: string }> = {
    "Standard": { icon: <Package size={20} />, color: "text-blue-600" },
    "Express": { icon: <Zap size={20} />, color: "text-amber-500" },
    "Premium": { icon: <Truck size={20} />, color: "text-purple-600" }
}

const DIVISIONS = [
    "Dhaka", "Chittagong", "Sylhet", "Khulna", "Barishal",
    "Rangpur", "Rajshahi", "Mymensingh"
]

export const PricingCalculator = () => {
    // State
    const [selectedTierId, setSelectedTierId] = useState<string>("");
    const [weight, setWeight] = useState<number>(1);
    const [fromDivision, setFromDivision] = useState<string>("");
    const [toDivision, setToDivision] = useState<string>("");
    const [calculatedPrice, setCalculatedPrice] = useState<number>(0);
    const { data: apiResponse, isLoading, isError } = useGetPricingTiersQuery(undefined);
    const tiers: IPricingTier[] = Array.isArray(apiResponse)
        ? apiResponse
        : apiResponse?.data || [];
    // Helpers
    const formatCurrency = (amount: number) => `৳${amount.toLocaleString('en-BD')}`;

    const getDistanceCharge = (from: string, to: string): number => {
        if (!from || !to) return 0;
        if (from === to) return 20;
        const majorCities = ["Dhaka", "Chittagong", "Sylhet", "Khulna"];
        if (majorCities.includes(from) && majorCities.includes(to)) return 50;
        return 80;
    };

    // Set default tier on load
    useEffect(() => {
        if (tiers.length > 0 && !selectedTierId) {
            setSelectedTierId(tiers.find(t => t.title === "Standard")?._id || tiers[0]._id);
        }
    }, [tiers, selectedTierId]);

    // Derived State: The currently selected tier object
    const selectedTier = tiers.find(t => t._id === selectedTierId);
    const visuals = selectedTier ? (TIER_VISUALS[selectedTier.title] || { icon: <Box />, color: "text-primary" }) : null;

    // Calculation Effect
    useEffect(() => {
        if (weight && fromDivision && toDivision && selectedTier) {
            const distanceCharge = getDistanceCharge(fromDivision, toDivision);
            const weightCharge = weight * selectedTier.pricePerKg;
            const total = selectedTier.basePrice + weightCharge + distanceCharge;
            setCalculatedPrice(total);
        } else {
            setCalculatedPrice(0);
        }
    }, [weight, fromDivision, toDivision, selectedTierId, selectedTier]);

    return (
        <div>
            <SectionHeader
                badge='Your simple shipping'
                icon={Calculator}
                highlight='Calculator'



                title="Pricing "
                description="Estimate your shipping costs quickly and easily with our pricing calculator."


            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 animate-in slide-in-from-bottom-4 duration-500 fade-in">

                {/* --- LEFT: Input Form --- */}
                <Card className="bg-card border shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-2xl font-bold text-card-foreground">
                            <div className="bg-primary/10 p-3 rounded-xl text-primary shadow-sm">
                                <Calculator size={24} />
                            </div>
                            Calculate Shipping
                        </CardTitle>
                        <p className="text-muted-foreground">
                            Select a package type and route to estimate costs.
                        </p>
                    </CardHeader>
                    <CardContent className="space-y-6">

                        {/* 1. Service/Package Selection */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-card-foreground mb-2">
                                <Package size={16} className="text-primary" />
                                Service Type
                            </label>
                            <Select onValueChange={setSelectedTierId} value={selectedTierId}>
                                <SelectTrigger className="h-14 text-lg border-input focus:border-primary">
                                    <SelectValue placeholder="Select Service" />
                                </SelectTrigger>
                                <SelectContent>
                                    {tiers.map((tier) => (
                                        <SelectItem key={tier._id} value={tier._id} className="py-3 cursor-pointer">
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold">{tier.title}</span>
                                                <span className="text-muted-foreground text-xs">
                                                    (Base: {formatCurrency(tier.basePrice)})
                                                </span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* 2. Weight Input */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-card-foreground mb-2">
                                <Weight size={16} className="text-primary" />
                                Package Weight
                            </label>
                            <div className="relative">
                                <Input
                                    type="number"
                                    step="0.5"
                                    min="0.5"
                                    placeholder="0.0"
                                    className="h-14 text-lg pl-4 pr-12 border-input focus:border-primary transition-colors"
                                    value={weight}
                                    onChange={(e) => setWeight(Math.max(0, parseFloat(e.target.value) || 0))}
                                />
                                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground font-medium">
                                    kg
                                </span>
                            </div>
                        </div>

                        {/* 3. Location Inputs */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-card-foreground mb-2">
                                    <MapPin size={16} className="text-primary" />
                                    Pickup
                                </label>
                                <Select onValueChange={setFromDivision} value={fromDivision}>
                                    <SelectTrigger className="h-14 text-lg border-input focus:border-primary">
                                        <SelectValue placeholder="Select Area" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {DIVISIONS.map((div) => (
                                            <SelectItem key={div} value={div}>{div}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-card-foreground mb-2">
                                    <MapPin size={16} className="text-primary" />
                                    Delivery
                                </label>
                                <Select onValueChange={setToDivision} value={toDivision}>
                                    <SelectTrigger className="h-14 text-lg border-input focus:border-primary">
                                        <SelectValue placeholder="Select Area" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {DIVISIONS.map((div) => (
                                            <SelectItem key={div} value={div}>{div}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* --- RIGHT: Results Panel --- */}
                <Card className="bg-card border shadow-lg flex flex-col relative overflow-hidden">
                    {/* Decorative BG */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10" />

                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-2xl font-bold text-card-foreground">
                            <div className="bg-green-500/10 p-3 rounded-xl text-green-600 shadow-sm">
                                <DollarSign size={24} />
                            </div>
                            Cost Breakdown
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="flex-1 flex flex-col">
                        {calculatedPrice > 0 && selectedTier ? (
                            <div className="space-y-6 flex-1 flex flex-col">

                                {/* Summary Box */}
                                <div className="bg-muted/30 p-4 rounded-xl border border-border">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-lg bg-background shadow-sm border ${visuals?.color}`}>
                                            {visuals?.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-card-foreground">
                                                {selectedTier.title} Package
                                            </h4>
                                            <div className="text-sm text-muted-foreground flex gap-2 items-center mt-1">
                                                <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs font-medium">
                                                    {weight} kg
                                                </span>
                                                <span className="text-xs">•</span>
                                                <span className="text-xs">{fromDivision} <span className="text-muted-foreground/50">→</span> {toDivision}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Detailed Math */}
                                <div className="space-y-3 flex-1 px-1">
                                    <div className="flex justify-between items-center text-sm group">
                                        <span className="text-muted-foreground group-hover:text-foreground transition-colors">Base Rate</span>
                                        <span className="font-semibold font-mono">{formatCurrency(selectedTier.basePrice)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm group">
                                        <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                                            Weight ({formatCurrency(selectedTier.pricePerKg)} × {weight})
                                        </span>
                                        <span className="font-semibold font-mono">{formatCurrency(weight * selectedTier.pricePerKg)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm group">
                                        <span className="text-muted-foreground group-hover:text-foreground transition-colors">Route Distance Charge</span>
                                        <span className="font-semibold font-mono">{formatCurrency(getDistanceCharge(fromDivision, toDivision))}</span>
                                    </div>
                                    <div className="my-2 border-t border-dashed border-border"></div>
                                </div>

                                {/* Total & Action */}
                                <div className="bg-primary p-6 rounded-xl text-primary-foreground shadow-lg mt-auto relative overflow-hidden">
                                    <div className="relative z-10 flex justify-between items-center">
                                        <div>
                                            <p className="text-primary-foreground/80 text-xs font-medium uppercase tracking-wider">Estimated Total</p>
                                            <p className="text-3xl font-bold tracking-tight">{formatCurrency(calculatedPrice)}</p>
                                        </div>
                                        <Button variant="secondary" className="h-12 px-6 font-semibold shadow-xl hover:translate-x-1 transition-all">
                                            Book Now <ArrowRight size={16} className="ml-2" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            // Empty State
                            <div className="flex-1 flex flex-col justify-center items-center text-center py-8 opacity-80">
                                <div className="bg-muted/50 w-20 h-20 rounded-full flex items-center justify-center mb-4">
                                    <Calculator size={32} className="text-muted-foreground" />
                                </div>
                                <h4 className="text-xl font-bold text-card-foreground mb-2">
                                    Ready to Calculate
                                </h4>
                                <p className="text-muted-foreground max-w-[250px] mx-auto text-sm">
                                    Select a service type, weight, and location to see your price instantly.
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Additional Information (Static Content) */}

            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Pricing Info */}
                <Card className="bg-card border shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold text-card-foreground flex items-center gap-3">
                            <CheckCircle size={24} className="text-primary" />
                            Additional Route Charges
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-transparent hover:border-border transition-colors">
                                <span className="text-muted-foreground">Same division delivery</span>
                                <span className="font-bold text-card-foreground">+৳20</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-transparent hover:border-border transition-colors">
                                <span className="text-muted-foreground">Major cities Inter-district</span>
                                <span className="font-bold text-card-foreground">+৳50</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-transparent hover:border-border transition-colors">
                                <span className="text-muted-foreground">Cross-division delivery</span>
                                <span className="font-bold text-card-foreground">+৳80</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Special Offers */}
                <Card className="bg-card border shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold text-card-foreground flex items-center gap-3">
                            <Star size={24} className="text-amber-500" />
                            Active Discounts
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                                <Badge className="bg-amber-500 hover:bg-amber-600 border-0 h-8 px-3">10% OFF</Badge>
                                <span className="text-muted-foreground text-sm font-medium">First-time user discount</span>
                            </div>
                            <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                                <Badge className="bg-primary hover:bg-primary/90 border-0 h-8 px-3">15% OFF</Badge>
                                <span className="text-muted-foreground text-sm font-medium">Bulk orders (10+ parcels)</span>
                            </div>
                            <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                                <Badge className="bg-blue-600 hover:bg-blue-700 border-0 h-8 px-3">Custom</Badge>
                                <span className="text-muted-foreground text-sm font-medium">Corporate & Merchant Plans</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}