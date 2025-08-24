import React, { useState } from 'react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { SearchIcon, PackageIcon, TruckIcon, CheckCircleIcon, ClockIcon, Loader2 } from "lucide-react"
import { useTrackParcelStatusQuery } from '@/redux/feature/parcel/parcel.api'

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
    const [parcelDataa, setParcelData] = useState<ParcelData[] | null>(null)
    const [trackingId, setTrackingId] = useState<string | null>(null)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            trackingId: "",
        },
    })
    console.log(trackingId)
    const { data: parcel } = useTrackParcelStatusQuery(trackingId)
    if (isLoading) {
        return <Loader2 />
    }

    console.log(parcel)
    async function onSubmit() {
        setIsLoading(true)
        try {
            // Here you would make your API call to track the parcel
            // const res = await trackParcel(values.trackingId).unwrap()

            // Mock data for demonstration
            // const mockData: ParcelData = {
            //     trackingId: values.trackingId,
            //     status: "IN_TRANSIT",
            //     senderInfo: {
            //         name: "Karim Rahman",
            //         phone: "01787654321",
            //         division: "Khulna",
            //         city: "Khulna",
            //         area: "Sonadanga",
            //         detailAddress: "H#44, R#7, Sector 1"
            //     },
            //     receiverInfo: {
            //         name: "Lima Akter",
            //         phone: "01894356001",
            //         division: "Dhaka",
            //         city: "Narayanganj",
            //         area: "Fatullah",
            //         detailAddress: "Road 2, Plot 3"
            //     },
            //     parcelType: "PACKAGE",
            //     weight: 5,
            //     trackingEvents: [
            //         { status: "REQUESTED", updaterId: "688b750e3f91fd2909891a4e", timestamp: "2025-01-20T10:00:00Z" },
            //         { status: "PICKED_UP", updaterId: "688b750e3f91fd2909891a4e", timestamp: "2025-01-20T14:30:00Z" },
            //         { status: "IN_TRANSIT", updaterId: "688b750e3f91fd2909891a4e", timestamp: "2025-01-21T09:15:00Z" }
            //     ],
            //     parcelFee: {
            //         baseRate: 60,
            //         weightCharge: 40,
            //         distanceCharge: 50,
            //         totalFee: 150
            //     },
            //     paymentMethod: "PREPAID",
            //     paymentStatus: "PAID"
            // }
            if (parcel?.success) {
                setParcelData(parcel?.data?.parcel)
                toast.success("Parcel found successfully")

            }

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error)
            toast.error("Parcel not found or invalid tracking ID")
            setParcelData(null)
        } finally {
            setIsLoading(false)
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "REQUESTED":
                return <ClockIcon size={16} className="text-yellow-500" />
            case "PICKED_UP":
                return <TruckIcon size={16} className="text-blue-500" />
            case "IN_TRANSIT":
                return <TruckIcon size={16} className="text-orange-500" />
            case "DELIVERED":
                return <CheckCircleIcon size={16} className="text-green-500" />
            default:
                return <ClockIcon size={16} className="text-gray-500" />
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "REQUESTED":
                return "text-yellow-600 bg-yellow-50"
            case "PICKED_UP":
                return "text-blue-600 bg-blue-50"
            case "IN_TRANSIT":
                return "text-orange-600 bg-orange-50"
            case "DELIVERED":
                return "text-green-600 bg-green-50"
            default:
                return "text-gray-600 bg-gray-50"
        }
    }

    return (
        <div className={cn("min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4", className)} {...props}>
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Search Section */}
                <Card className="overflow-hidden border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
                        <div className="flex flex-col items-center text-center">
                            <div className="bg-white/20 p-3 rounded-full mb-4">
                                <SearchIcon size={32} />
                            </div>
                            <h1 className="text-3xl font-bold mb-2">Track Your Parcel</h1>
                            <p className="text-indigo-100 text-lg">
                                Enter your tracking ID to get real-time updates
                            </p>
                        </div>
                    </div>

                    <CardContent className="p-8">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" id="track-parcel-form">
                                <FormField
                                    control={form.control}
                                    name="trackingId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-lg font-medium">Tracking ID</FormLabel>
                                            <FormControl>
                                                <div className="flex gap-4">
                                                    <Input

                                                        placeholder="Enter your tracking ID"
                                                        className="border-2 border-gray-200 focus:border-indigo-500 transition-colors duration-200 rounded-lg h-12 text-lg"
                                                        {...field}
                                                        onChange={(e) => {
                                                            field.onChange(e); // keep RHF working
                                                            setTrackingId(e.target.value); // your custom logic
                                                        }}
                                                    />
                                                    <Button
                                                        type="submit"
                                                        className="px-8 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                                                        disabled={isLoading}
                                                    >
                                                        {isLoading ? (
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                                Tracking...
                                                            </div>
                                                        ) : (
                                                            <div className="flex items-center gap-2">
                                                                <SearchIcon size={18} />
                                                                Track
                                                            </div>
                                                        )}
                                                    </Button>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </form>
                        </Form>
                    </CardContent>
                </Card>


                <div className='flex flex-wrap justify-between gap-5'>
                    {parcelDataa?.map(parcelData => (
                        <Card className="overflow-hidden border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl ">
                            <CardContent className="p-8  ">
                                <div className="space-y-8">
                                    {/* Status Header */}
                                    <div className="text-center">
                                        <div className="flex items-center justify-center gap-3 mb-4">
                                            {getStatusIcon(parcelData.status)}
                                            <h2 className="text-2xl font-bold">Parcel Status</h2>
                                        </div>
                                        <div className={cn("inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium", getStatusColor(parcelData.status))}>
                                            <PackageIcon size={16} />
                                            {parcelData?.status.replace('_', ' ')}
                                        </div>
                                    </div>


                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold flex items-center gap-2">
                                            <TruckIcon size={20} />
                                            Tracking Timeline
                                        </h3>
                                        <div className="space-y-3">

                                            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                                {getStatusIcon(parcelData.status)}
                                                <div className="flex-1">
                                                    <p className="font-medium">{parcelData.status.replace('_', ' ')}</p>
                                                    {parcelData.updatedAt && (
                                                        <p className="text-sm text-gray-500">
                                                            {new Date(parcelData.updatedAt).toLocaleString()}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                        </div>
                                    </div>



                                </div>
                            </CardContent>
                        </Card>
                    ))
                    }
                </div>

                {/* Instructions Card
                {!parcelData && (
                    <Card className="overflow-hidden border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl">
                        <CardContent className="p-8">
                            <div className="text-center space-y-4">
                                <h3 className="text-xl font-semibold">How to Track Your Parcel</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                                            <SearchIcon size={24} className="text-blue-600" />
                                        </div>
                                        <div className="text-center">
                                            <h4 className="font-medium">Enter Tracking ID</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Input your unique tracking number</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                                            <TruckIcon size={24} className="text-green-600" />
                                        </div>
                                        <div className="text-center">
                                            <h4 className="font-medium">Get Real-time Updates</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">See current status and location</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
                                            <CheckCircleIcon size={24} className="text-purple-600" />
                                        </div>
                                        <div className="text-center">
                                            <h4 className="font-medium">Track Delivery</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Monitor until delivered</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )} */}
            </div>
        </div>
    )
}

export default TrackParcel