import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formSchema, Parcel_Type2, Payment_Method2, type Parcel_Type, type Payment_Method } from "@/formValidationSchema/parcel.schema"
import { cn } from "@/lib/utils"
import { useGetMeQuery } from "@/redux/feature/user/user.api"
import { zodResolver } from "@hookform/resolvers/zod"
import { MapPinIcon, PackageIcon, UserIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { toast } from "sonner"
import type z from "zod"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"




export function CreateParcel({
    className,
    ...props
}: React.ComponentProps<"div">) {


    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const navigate = useNavigate()
    // const [isLoading, setIsLoading] = useState<boolean>(false)

    const { data } = useGetMeQuery(undefined)
    // console.log(data?.data?.user)
    const user = data?.data?.user

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            parcelType: "PACKAGE" as Parcel_Type,
            weight: 0,
            senderDivision: "",
            senderCity: "",
            senderArea: "",
            senderDetailAddress: "",
            receiverName: "",
            receiverPhone: "",
            receiverDivision: "",
            receiverCity: "",
            receiverArea: "",
            receiverDetailAddress: "",
            paymentMethod: "PREPAID" as Payment_Method,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // setIsLoading(true)
        try {
            // Transform form data to match the exact backend structure
            const parcelData = {
                senderId: user?._id,
                parcelType: values.parcelType,
                weight: values.weight,
                senderInfo: {
                    name: user?.name,
                    phone: user?.phone,
                    division: values.senderDivision,
                    city: values.senderCity,
                    area: values.senderArea,
                    detailAddress: values.senderDetailAddress
                },
                receiverInfo: {
                    name: values.receiverName,
                    phone: values.receiverPhone,
                    division: values.receiverDivision,
                    city: values.receiverCity,
                    area: values.receiverArea,
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
                paymentStatus: "PENDING"
            }

            console.log("Parcel Data:", parcelData)
            // console.log("Parcel Data:", parcelData)

            // Here you would make your API call
            // const res = await createParcel(parcelData).unwrap()

            // toast.success("Parcel created successfully")
            // navigate("/dashboard")
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error)
            toast.error(error?.data?.message || "Failed to create parcel")
        } finally {
            // setIsLoading(false)
        }
    }

    return (



        <Dialog >

            <DialogTrigger asChild>
                <Button>Create Parcel</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-fit">

                <div className={cn("flex flex-col gap-6 h-full", className)} {...props}>
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
                                                            <FormLabel>Division</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Enter division" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="senderCity"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>City</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Enter city" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="senderArea"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Area</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Enter area" {...field} />
                                                            </FormControl>
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
                                                <FormField
                                                    control={form.control}
                                                    name="receiverDivision"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Division</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Enter division" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="receiverCity"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>City</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Enter city" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="receiverArea"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Area</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Enter area" {...field} />
                                                            </FormControl>
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
                                    </form>
                                </Form>

                                <Button
                                    type="submit"
                                    className="w-full"
                                    form="create-parcel-form"
                                // disabled={isLoading}
                                >
                                    {/* {isLoading ? "Creating Parcel..." : "Create Parcel"} */}
                                    Create Parcel
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </DialogContent>

        </Dialog>
    )
}