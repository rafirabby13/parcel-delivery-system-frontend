/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Badge } from "@/components/ui/badge" // Assuming you have this, otherwise standard div with classes works
import { Separator } from "@/components/ui/separator" // Optional, using border classes if not available
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import {
    SearchIcon,
    PackageIcon,
    TruckIcon,
    MapPinIcon,
    ArrowRight,
    WalletCards,
    WeightIcon,
    CheckCircle2,
    Clock
} from "lucide-react"
import { useTrackParcelStatusQuery } from '@/features/parcel/api/parcel.api'

// --- Schema and Interfaces (Unchanged) ---
const formSchema = z.object({
    trackingId: z.string().min(1, { message: "Tracking ID is required" }),
})

interface ParcelData {
    trackingId: string;
    status: string;
    senderInfo: {
        name: string;
        phone: string;
        division: string;
        city: string;
        area: string;
        detailAddress: string;
    };
    receiverInfo: {
        name: string;
        phone: string;
        division: string;
        city: string;
        area: string;
        detailAddress: string;
    };
    parcelType: string;
    weight: number;
    trackingEvents: Array<{
        status: string;
        updaterId: string;
        timestamp?: string;
    }>;
    parcelFee: {
        baseRate: number;
        weightCharge: number;
        distanceCharge: number;
        totalFee: number;
    };
    paymentMethod: string;
    paymentStatus: string;
    updatedAt: string
}

const TrackParcel = ({
    className,
    ...props
}: React.ComponentProps<"div">) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [parcelResults, setParcelResults] = useState<ParcelData[] | null>(null)
    const [trackingId, setTrackingId] = useState<string | null>(null)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            trackingId: "",
        },
    })

    const { data: parcel } = useTrackParcelStatusQuery(trackingId)

    async function onSubmit() {
        setIsLoading(true)
        try {
            // Logic preserved
            if (parcel?.success) {
                setParcelResults(parcel?.data?.parcel)
                toast.success("Parcel found successfully")
            }
        } catch (error: any) {
            console.log(error)
            toast.error("Parcel not found or invalid tracking ID")
            setParcelResults(null)
        } finally {
            setIsLoading(false)
        }
    }

    // Map status to semantic colors using Shadcn-like utility classes
    // Note: We use specific colors (green/yellow) for statuses as "Primary/Secondary" 
    // can be confusing for status contexts, but we use the design system's utility classes.
    const getStatusStyles = (status: string) => {
        switch (status) {
            case "REQUESTED":
                return "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            case "PICKED_UP":
                return "bg-blue-500/15 text-blue-700 dark:text-blue-400 hover:bg-blue-500/25 border-transparent"
            case "IN_TRANSIT":
                return "bg-orange-500/15 text-orange-700 dark:text-orange-400 hover:bg-orange-500/25 border-transparent"
            case "DELIVERED":
                return "bg-green-500/15 text-green-700 dark:text-green-400 hover:bg-green-500/25 border-transparent"
            default:
                return "bg-muted text-muted-foreground hover:bg-muted/80"
        }
    }

    return (
        <div className={cn("min-h-screen bg-background font-sans", className)} {...props}>

            {/* --- Hero / Search Section --- */}
            <div className="border-b border-border bg-card pb-12 pt-16 px-4">
                <div className="max-w-3xl mx-auto space-y-8 text-center">
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
                            Track Your <span className="text-primary">Shipment</span>
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                            Enter your tracking ID below to see real-time updates, delivery estimates, and shipment details.
                        </p>
                    </div>

                    <Card className="border-border shadow-2xl shadow-primary/5 bg-background/50 backdrop-blur-sm">
                        <CardContent className="p-2">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-2">
                                    <FormField
                                        control={form.control}
                                        name="trackingId"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormControl>
                                                    <div className="relative">
                                                        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                                                        <Input
                                                            placeholder="Ex: TRK-123456789"
                                                            className="h-14 pl-12 border-transparent bg-muted/50 text-lg placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:bg-background transition-colors"
                                                            {...field}
                                                            onChange={(e) => {
                                                                field.onChange(e);
                                                                setTrackingId(e.target.value);
                                                            }}
                                                        />
                                                    </div>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="h-14 px-8 rounded-lg font-semibold text-primary-foreground shadow-lg shadow-primary/20"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                                <span>Searching...</span>
                                            </div>
                                        ) : (
                                            <span className="flex items-center gap-2">Track Parcel <ArrowRight size={18} /></span>
                                        )}
                                    </Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* --- Results Section --- */}
            <div className="max-w-6xl mx-auto px-4 py-12">
                {parcelResults?.map((parcelData, index) => (
                    <div key={index} className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-6 duration-700">

                        {/* 1. Main Status & Timeline Card */}
                        <Card className="lg:col-span-2 shadow-sm overflow-hidden border-border">
                            <div className="h-1.5 bg-gradient-to-r from-primary to-secondary" />
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-xl font-bold flex items-center gap-2 text-foreground">
                                    <TruckIcon className="text-primary" /> Shipment Status
                                </CardTitle>
                                <Badge variant="outline" className={cn("px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider", getStatusStyles(parcelData.status))}>
                                    {parcelData.status.replace('_', ' ')}
                                </Badge>
                            </CardHeader>
                            <CardContent className="p-6 md:p-8">
                                <div className="mb-8">
                                    <h3 className="text-4xl font-bold text-foreground mb-2">{parcelData.status.replace('_', ' ')}</h3>
                                    <p className="text-muted-foreground flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        Last updated: {new Date(parcelData.updatedAt).toLocaleString()}
                                    </p>
                                </div>

                                {/* Timeline Construction */}
                                <div className="relative pl-4 border-l border-border space-y-8">
                                    {parcelData.trackingEvents && parcelData.trackingEvents.length > 0 ? (
                                        [...parcelData.trackingEvents].reverse().map((event, idx) => (
                                            <div key={idx} className="relative pl-6">
                                                <div className={cn(
                                                    "absolute -left-[6.5px] top-1.5 w-3 h-3 rounded-full ring-4 ring-background",
                                                    idx === 0 ? "bg-primary" : "bg-muted-foreground/30"
                                                )} />
                                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                                                    <div>
                                                        <p className={cn("font-medium text-base", idx === 0 ? "text-foreground" : "text-muted-foreground")}>
                                                            {event.status.replace('_', ' ')}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground font-mono mt-0.5">ID: {event.updaterId.slice(0, 8)}...</p>
                                                    </div>
                                                    {event.timestamp && (
                                                        <span className="text-xs font-medium text-muted-foreground bg-secondary/50 px-2 py-1 rounded-md">
                                                            {new Date(event.timestamp).toLocaleDateString()}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        // Fallback
                                        <div className="relative pl-6">
                                            <div className="absolute -left-[6.5px] top-1.5 w-3 h-3 rounded-full bg-primary ring-4 ring-background" />
                                            <div>
                                                <p className="font-medium text-foreground">{parcelData.status.replace('_', ' ')}</p>
                                                <p className="text-sm text-muted-foreground">Current Status</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* 2. Details Sidebar */}
                        <div className="space-y-6">

                            {/* Route Info */}
                            <Card className="shadow-sm">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-base font-semibold flex items-center gap-2">
                                        <MapPinIcon size={18} className="text-primary" /> Route Details
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 text-sm">
                                    <div className="relative pl-6 border-l border-dashed border-muted-foreground/30">
                                        <div className="mb-6">
                                            <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-muted-foreground/30 ring-4 ring-background" />
                                            <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">From</p>
                                            <p className="font-medium text-foreground text-base">{parcelData.senderInfo.city}</p>
                                            <p className="text-muted-foreground">{parcelData.senderInfo.area}</p>
                                        </div>
                                        <div>
                                            <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-background" />
                                            <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">To</p>
                                            <p className="font-medium text-foreground text-base">{parcelData.receiverInfo.city}</p>
                                            <p className="text-muted-foreground">{parcelData.receiverInfo.detailAddress}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Payment Info */}
                            <Card className="shadow-sm bg-accent/20">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-base font-semibold flex items-center gap-2">
                                        <WalletCards size={18} className="text-primary" /> Payment Info
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex justify-between items-center p-3 bg-background rounded-lg border border-border">
                                        <span className="text-sm text-muted-foreground">Total Fee</span>
                                        <span className="font-bold text-lg text-foreground">৳ {parcelData.parcelFee.totalFee}</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        <div className="p-2 rounded bg-background border border-border">
                                            <p className="text-xs text-muted-foreground">Method</p>
                                            <p className="font-medium text-foreground">{parcelData.paymentMethod}</p>
                                        </div>
                                        <div className="p-2 rounded bg-background border border-border">
                                            <p className="text-xs text-muted-foreground">Status</p>
                                            <div className="flex items-center gap-1.5">
                                                {parcelData.paymentStatus === "PAID" ? (
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                                                ) : null}
                                                <p className={cn("font-bold text-xs uppercase", parcelData.paymentStatus === "PAID" ? "text-green-600" : "text-orange-600")}>
                                                    {parcelData.paymentStatus}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Package Specs */}
                            <Card className="shadow-sm">
                                <CardContent className="p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 bg-primary/10 rounded-full text-primary">
                                            <WeightIcon size={18} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground uppercase">Weight</p>
                                            <p className="font-medium text-foreground">{parcelData.weight} KG</p>
                                        </div>
                                    </div>
                                    <Separator orientation="vertical" className="h-8" />
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 bg-primary/10 rounded-full text-primary">
                                            <PackageIcon size={18} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground uppercase">Type</p>
                                            <p className="font-medium text-foreground">{parcelData.parcelType}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                        </div>
                    </div>
                ))}

                {/* --- Empty State / Placeholder --- */}
                {!parcelResults && !isLoading && (
                    <div className="flex flex-col items-center justify-center py-20 opacity-60">
                        <div className="p-4 bg-muted rounded-full mb-4">
                            <PackageIcon className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-medium text-foreground">Ready to track</h3>
                        <p className="text-muted-foreground text-center max-w-sm">
                            Enter a parcel tracking ID in the search bar above to view the shipment timeline.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TrackParcel