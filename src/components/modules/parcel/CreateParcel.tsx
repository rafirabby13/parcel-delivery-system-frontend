import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formSchema, Parcel_Type2, Payment_Method2, type Parcel_Type, type Payment_Method } from "@/formValidationSchema/parcel.schema"
import { useGetMeQuery } from "@/redux/feature/user/user.api"
import { zodResolver } from "@hookform/resolvers/zod"
import { MapPinIcon, PackageIcon, PlusCircle, UserIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { toast } from "sonner"
import type z from "zod"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useCreateparcelMutation } from "@/redux/feature/parcel/parcel.api"

import { useGetAllAreasQuery, useGetAllDistrictsQuery, useGetAllDivisionsQuery, useGetAllUpazillasQuery } from "@/redux/feature/BDAPI/bd.api"
import { useEffect, useState } from "react"
import ImageUpload from "@/components/comp-544"
import { Spinner } from "@/components/ui/shadcn-io/spinner"




export function CreateParcel() {
    const [image, setImage] = useState<File | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [division, setDivision] = useState<string>("")
    const [district, setDistrict] = useState<string>("")
    const [city, setCity] = useState<string>("")
    const [, setArea] = useState<string>("")
    const [receiverDivision, setReceiverDivision] = useState<string>("")
    const [receiverDistrict, setReceiverDistrict] = useState<string>("")
    const [receiverCity, setReceiverCity] = useState<string>("")
    const [, setReceiverArea] = useState<string>("")

    const [createparcel] = useCreateparcelMutation(undefined)

    const { data: divisions } = useGetAllDivisionsQuery(undefined)
    const { data: districts } = useGetAllDistrictsQuery(division)
    const { data: cities } = useGetAllUpazillasQuery(district)
    const { data: areas } = useGetAllAreasQuery(city)
    const { data: receiverDivisions } = useGetAllDivisionsQuery(undefined)
    const { data: receiverDistricts } = useGetAllDistrictsQuery(receiverDivision)
    const { data: receiverCities } = useGetAllUpazillasQuery(receiverDistrict)
    const { data: receiverAreas } = useGetAllAreasQuery(receiverCity)

    const navigate = useNavigate()
    // const [isLoading, setIsLoading] = useState<boolean>(false)

    const { data } = useGetMeQuery(undefined)
    // console.log(data?.data?.user)
    const user = data?.data?.user
    useEffect(() => {
        console.log("division", division)
        console.log("districts", district)
        console.log("cities", city)

    }, [division, district, city])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            parcelType: "PACKAGE" as Parcel_Type,
            weight: 0,
            senderDivision: "",
            senderDistrict: "",
            senderCity: "",
            senderArea: "",
            senderDetailAddress: "",
            receiverName: "",
            receiverPhone: "",
            receiverDivision: "",
            receiverDistrict: "",
            receiverCity: "",
            receiverArea: "",
            receiverDetailAddress: "",

            paymentMethod: "PREPAID" as Payment_Method,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const divisionName = divisions.data.find((d: { id: string }) => d.id === values.senderDivision)?.name
        const districtName = districts.data.find((d: { id: string }) => d.id === values.senderDistrict)?.name
        const cityName = cities.data.find((c: { id: string }) => c.id === values.senderCity)?.name
        const areaName = areas.data.find((a: { id: string }) => a.id === values.senderArea)?.name
        const receiverDivisionName = receiverDivisions?.data?.find((d: { id: string }) => d.id === values.receiverDivision)?.name
        const receiverDistrictName = receiverDistricts?.data?.find((d: { id: string }) => d.id === values.receiverDistrict)?.name
        const receiverCityName = receiverCities?.data?.find((c: { id: string }) => c.id === values.receiverCity)?.name
        const receiverAreaName = receiverAreas?.data?.find((a: { id: string }) => a.id === values.receiverArea)?.name
        setLoading(true)

        // setIsLoading(true)
        try {
            // Transform form data to match the exact backend structure
            const data = {
                senderId: user?._id,
                parcelType: values.parcelType,
                weight: values.weight,
                senderInfo: {
                    name: user?.name,
                    phone: user?.phone,
                    division: divisionName,
                    district: districtName,
                    city: cityName,
                    area: areaName,
                    detailAddress: values.senderDetailAddress
                },
                receiverInfo: {
                    name: values.receiverName,
                    phone: values.receiverPhone,
                    division: receiverDivisionName,
                    district: receiverDistrictName,
                    city: receiverCityName,
                    area: receiverAreaName,
                    detailAddress: values.receiverDetailAddress
                },
                trackingEvents: [
                    {
                        updaterId: user._id,
                        status: "REQUESTED"
                    }
                ],
                parcelFee: {
                    baseRate: 60,
                    weightCharge: values.weight * 8, // 8 per kg (can be adjusted)
                    distanceCharge: 50, // Default distance charge
                    totalFee: 60 + (values.weight * 8) + 50
                },
                paymentMethod: values.paymentMethod,
                paymentStatus: "PENDING",

            }
           
            const formData = new FormData()
            formData.append('data', JSON.stringify(data));
            formData.append('file', image as File);
            console.log(formData)


            // console.log("Parcel Data:", parcelData)
            // console.log("Parcel Data:", parcelData)

            // Here you would make your API call
            const res = await createparcel(formData).unwrap()
            // console.log(res)
            if (res?.success) {
                // setLoading(false)
                toast.success("Parcel created successfully")
                navigate("/dashboard/sender/create-parcel")
                form.reset()
            }

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            // console.log(error)
            toast.error(error?.data?.message || "Failed to create parcel")
        } finally {
            setLoading(false)
        }
    }

    // console.log(divisions)

    return (



        <Dialog >

            <DialogTrigger asChild>
                <Button><PlusCircle />Create Parcel</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-fit">

                <div >
                    <Card className="overflow-hidden p-0">
                        <CardContent className="p-6 md:p-8 overflow-y-auto max-h-[70vh]">
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col items-center text-center">
                                    <h1 className="text-2xl font-bold">Create New Parcel</h1>
                                    <p className="text-muted-foreground text-balance">
                                        Fill out the details to create a new parcel delivery
                                    </p>
                                </div>

                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" id="create-parcel-form">

                                        {/* Basic Parcel Information */}
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                                                <PackageIcon size={16} />
                                                <span>Parcel Information</span>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                                                <FormField
                                                    control={form.control}
                                                    name="parcelType"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Parcel Type</FormLabel>
                                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                <FormControl>
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder="Select parcel type" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    {Parcel_Type2.map((type) => (
                                                                        <SelectItem key={type} value={type}>
                                                                            {type.charAt(0) + type.slice(1).toLowerCase()}
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="weight"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Weight (kg)</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    type="number"
                                                                    step="0.1"
                                                                    placeholder="Enter weight"
                                                                    {...field}
                                                                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>

                                        {/* Sender Information */}
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                                                <UserIcon size={16} />
                                                <span>Sender Information</span>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                                                <FormField
                                                    control={form.control}
                                                    name="senderDivision"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Select Division</FormLabel>
                                                            <Select onValueChange={(value) => {
                                                                field.onChange(value)
                                                                setDivision(value)
                                                            }
                                                            } defaultValue={field.value}>
                                                                <FormControl>
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder="S" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    {
                                                                        divisions?.data?.map((division: { name: string, id: string }) =>
                                                                            <SelectItem value={division.id}>{division.name}</SelectItem>
                                                                        )
                                                                    }
                                                                </SelectContent>
                                                            </Select>

                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="senderDistrict"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Select District</FormLabel>
                                                            <Select onValueChange={(value) => {
                                                                field.onChange(value)
                                                                setDistrict(value)
                                                            }
                                                            } defaultValue={field.value}>
                                                                <FormControl>
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder="S" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    {
                                                                        districts?.data?.map((division: { name: string, id: string }) =>
                                                                            <SelectItem value={division.id}>{division.name}</SelectItem>
                                                                        )
                                                                    }
                                                                </SelectContent>
                                                            </Select>

                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="senderCity"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Select City</FormLabel>
                                                            <Select onValueChange={(value) => {
                                                                field.onChange(value)
                                                                setCity(value)
                                                            }
                                                            } defaultValue={field.value}>
                                                                <FormControl>
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder="S" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    {
                                                                        cities?.data?.map((division: { name: string, id: string }) =>
                                                                            <SelectItem value={division.id}>{division.name}</SelectItem>
                                                                        )
                                                                    }
                                                                </SelectContent>
                                                            </Select>

                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="senderArea"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Select Area</FormLabel>
                                                            <Select onValueChange={(value) => {
                                                                field.onChange(value)
                                                                setArea(value)
                                                            }
                                                            } defaultValue={field.value}>
                                                                <FormControl>
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder="S" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    {
                                                                        areas?.data?.map((division: { name: string, id: string }) =>
                                                                            <SelectItem value={division.id}>{division.name}</SelectItem>
                                                                        )
                                                                    }
                                                                </SelectContent>
                                                            </Select>

                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />




                                            </div>

                                            <FormField
                                                control={form.control}
                                                name="senderDetailAddress"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Detail Address</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Enter detailed address" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        {/* Receiver Information */}
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                                                <MapPinIcon size={16} />
                                                <span>Receiver Information</span>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <FormField
                                                    control={form.control}
                                                    name="receiverName"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Name</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Enter receiver name" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="receiverPhone"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Phone</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Enter phone number" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>


                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                {/* Receiver Division */}
                                                <FormField
                                                    control={form.control}
                                                    name="receiverDivision"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Division</FormLabel>
                                                            <Select
                                                                value={field.value}
                                                                onValueChange={(value) => {
                                                                    field.onChange(value)
                                                                    setReceiverDivision(value)
                                                                }}
                                                            >
                                                                <FormControl>
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder="Select Division" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    {receiverDivisions?.data?.map((d: { id: string; name: string }) => (
                                                                        <SelectItem key={d.id} value={d.id}>
                                                                            {d.name}
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                {/* Receiver District */}
                                                <FormField
                                                    control={form.control}
                                                    name="receiverDistrict"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>District</FormLabel>
                                                            <Select
                                                                value={field.value}
                                                                onValueChange={(value) => {
                                                                    field.onChange(value)
                                                                    setReceiverDistrict(value)
                                                                }}
                                                            >
                                                                <FormControl>
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder="Select District" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    {receiverDistricts?.data?.map((d: { id: string; name: string }) => (
                                                                        <SelectItem key={d.id} value={d.id}>
                                                                            {d.name}
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                {/* Receiver City */}
                                                <FormField
                                                    control={form.control}
                                                    name="receiverCity"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>City</FormLabel>
                                                            <Select
                                                                value={field.value}
                                                                onValueChange={(value) => {
                                                                    field.onChange(value)
                                                                    setReceiverCity(value)
                                                                }}
                                                            >
                                                                <FormControl>
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder="Select City" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    {receiverCities?.data?.map((c: { id: string; name: string }) => (
                                                                        <SelectItem key={c.id} value={c.id}>
                                                                            {c.name}
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                {/* Receiver Area */}
                                                <FormField
                                                    control={form.control}
                                                    name="receiverArea"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Area</FormLabel>
                                                            <Select
                                                                value={field.value}
                                                                onValueChange={(value) => {
                                                                    field.onChange(value)
                                                                    setReceiverArea(value)
                                                                }}
                                                            >
                                                                <FormControl>
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder="Select Area" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    {receiverAreas?.data?.map((a: { id: string; name: string }) => (
                                                                        <SelectItem key={a.id} value={a.id}>
                                                                            {a.name}
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>



                                            <FormField
                                                control={form.control}
                                                name="receiverDetailAddress"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Detail Address</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Enter detailed address" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        {/* Payment Information */}
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                                                <span>Payment Information</span>
                                            </div>

                                            <FormField
                                                control={form.control}
                                                name="paymentMethod"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Payment Method</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select payment method" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                {Payment_Method2.map((method) => (
                                                                    <SelectItem key={method} value={method}>
                                                                        {method === "COD" ? "Cash on Delivery" : method.charAt(0) + method.slice(1).toLowerCase()}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <ImageUpload setImage={setImage} />
                                    </form>
                                </Form>

                                <Button
                                    // onClick={() => setLoading(true)}
                                    type="submit"
                                    className="w-full"
                                    form="create-parcel-form"
                                    disabled={loading}
                                >
                                    {loading ? <Spinner /> : "Create Parcel"}
                                    {/* Create Parcel */}

                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <DialogFooter className="w-fit ml-auto">
                    <DialogClose asChild>
                        <Button type="button">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>

        </Dialog>
    )
}