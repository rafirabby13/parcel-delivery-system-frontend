import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { 
    Calculator, 
    MapPin, 
    Weight,
    DollarSign,
    CheckCircle,
    Clock,
    TruckIcon,
    Zap,
    Package,
    ArrowRight
} from "lucide-react"

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
        color: "text-blue-600",
        gradient: "from-blue-500 to-cyan-500"
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
        color: "text-purple-600",
        gradient: "from-purple-500 to-pink-500",
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
        icon: <TruckIcon size={24} />,
        color: "text-orange-600",
        gradient: "from-orange-500 to-red-500"
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
    const [selectedTier] = useState<PricingTier>(pricingTiers[1]) // Express as default
    const [calculatedPrice, setCalculatedPrice] = useState<number>(0)

    const form = useForm({
        defaultValues: {
            weight: 1,
            fromDivision: "",
            toDivision: ""
        }
    })

    const weight = form.watch("weight")
    const fromDivision = form.watch("fromDivision")
    const toDivision = form.watch("toDivision")

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
        <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto">
                
                {/* Section Header */}
                <div className="text-center mb-16">
                    <Badge className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-4 py-2 text-sm font-medium border-0 mb-4">
                        Transparent Pricing
                    </Badge>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        Simple{" "}
                        <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                            Pricing
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        No hidden fees, no surprises. Calculate your delivery cost instantly 
                        and choose the service that fits your needs.
                    </p>
                </div>

                {/* Pricing Calculator */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                    
                    {/* Calculator */}
                    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-0 shadow-2xl">
                        <CardHeader className="pb-4">
                            <CardTitle className="flex items-center gap-3 text-2xl">
                                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full text-white">
                                    <Calculator size={24} />
                                </div>
                                Price Calculator
                            </CardTitle>
                            <p className="text-gray-600 dark:text-gray-300">
                                Get instant pricing for your delivery
                            </p>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <Form {...form}>
                                <div className="space-y-4">
                                    {/* Weight Input */}
                                    <FormField
                                        control={form.control}
                                        name="weight"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-2">
                                                    <Weight size={16} />
                                                    Parcel Weight (kg)
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        step="0.1"
                                                        min="0.1"
                                                        placeholder="Enter weight"
                                                        className="h-12 text-lg"
                                                        {...field}
                                                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />

                                    {/* From Division */}
                                    <FormField
                                        control={form.control}
                                        name="fromDivision"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-2">
                                                    <MapPin size={16} />
                                                    From Division
                                                </FormLabel>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="h-12">
                                                            <SelectValue placeholder="Select pickup division" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {divisions.map((division) => (
                                                            <SelectItem key={division} value={division}>
                                                                {division}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormItem>
                                        )}
                                    />

                                    {/* To Division */}
                                    <FormField
                                        control={form.control}
                                        name="toDivision"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-2">
                                                    <MapPin size={16} />
                                                    To Division
                                                </FormLabel>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="h-12">
                                                            <SelectValue placeholder="Select delivery division" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {divisions.map((division) => (
                                                            <SelectItem key={division} value={division}>
                                                                {division}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </Form>

                         
                        </CardContent>
                    </Card>

                    {/* Price Breakdown */}
                    <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-0 shadow-2xl">
                        <CardHeader className="pb-4">
                            <CardTitle className="flex items-center gap-3 text-2xl">
                                <div className="bg-gradient-to-r from-green-500 to-blue-600 p-3 rounded-full text-white">
                                    <DollarSign size={24} />
                                </div>
                                Price Breakdown
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {calculatedPrice > 0 ? (
                                <div className="space-y-4">
                                    {/* Service Details */}
                                    <div className="bg-white/60 dark:bg-gray-800/60 p-4 rounded-xl">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className={`${selectedTier.color}`}>
                                                {selectedTier.icon}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900 dark:text-white">
                                                    {selectedTier.name} Service
                                                </h4>
                                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                                    {selectedTier.description}
                                                </p>
                                            </div>
                                        </div>
                                        <ul className="space-y-1">
                                            {selectedTier.features.slice(0, 3).map((feature, idx) => (
                                                <li key={idx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                                    <CheckCircle size={12} className="text-green-500" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Cost Breakdown */}
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center py-2">
                                            <span className="text-gray-600 dark:text-gray-300">Base Rate</span>
                                            <span className="font-medium">{formatCurrency(selectedTier.baseRate)}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2">
                                            <span className="text-gray-600 dark:text-gray-300">
                                                Weight Charge ({weight}kg × {formatCurrency(selectedTier.weightRate)})
                                            </span>
                                            <span className="font-medium">
                                                {formatCurrency(weight * selectedTier.weightRate)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center py-2">
                                            <span className="text-gray-600 dark:text-gray-300">Distance Charge</span>
                                            <span className="font-medium">
                                                {formatCurrency(getDistanceCharge(fromDivision, toDivision))}
                                            </span>
                                        </div>
                                        <hr className="border-gray-300 dark:border-gray-600" />
                                        <div className="flex justify-between items-center py-2">
                                            <span className="text-lg font-semibold text-gray-900 dark:text-white">
                                                Total Cost
                                            </span>
                                            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                                                {formatCurrency(calculatedPrice)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* CTA Button */}
                                    <Button className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                                        <Package size={20} className="mr-2" />
                                        Book This Delivery
                                        <ArrowRight size={16} className="ml-2" />
                                    </Button>
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <Calculator size={48} className="text-gray-400 mx-auto mb-4" />
                                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                        Ready to Calculate?
                                    </h4>
                                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                                        Fill in the weight and locations to see your delivery cost
                                    </p>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        <p>• Base rates start from {formatCurrency(60)}</p>
                                        <p>• Weight charges from {formatCurrency(8)} per kg</p>
                                        <p>• Distance charges vary by location</p>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

              

                {/* Additional Pricing Info */}
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-2xl p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                Pricing Notes
                            </h4>
                            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                                <li className="flex items-start gap-2">
                                    <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                                    <span>Same division delivery: +৳20 distance charge</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                                    <span>Major cities (Dhaka, Chittagong, Sylhet, Khulna): +৳50</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                                    <span>Different divisions: +৳80 distance charge</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                                    <span>No hidden fees or additional charges</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                Special Offers
                            </h4>
                            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                                <li className="flex items-start gap-2">
                                    <Clock size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
                                    <span>Bulk orders (10+ parcels): 15% discount</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <TruckIcon size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
                                    <span>Corporate accounts: Custom pricing available</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Package size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
                                    <span>First-time users: 10% off your first delivery</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Zap size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
                                    <span>Monthly subscription: Up to 25% savings</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PricingOverview