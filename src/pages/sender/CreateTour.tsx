/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useNavigate } from "react-router"
import { toast } from "sonner"
import { useState } from "react"
import { PackageIcon, UserIcon, MapPinIcon } from "lucide-react"
import { tourSchema } from "@/formValidationSchema/parcel.schema"



export function CreateTour({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<z.infer<typeof tourSchema>>({
    resolver: zodResolver(tourSchema),
    defaultValues: {
      senderId: "",
      parcelType: "PACKAGE",
      weight: 0,
      senderName: "",
      senderPhone: "",
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
      paymentMethod: "",
    },
  })

  async function onSubmit(values: z.infer<typeof tourSchema>) {
    setIsLoading(true)
    try {
      // Transform form data to match the JSON structure
      const parcelData = {
        senderId: values.senderId,
        parcelType: values.parcelType,
        weight: values.weight,
        senderInfo: {
          name: values.senderName,
          phone: values.senderPhone,
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
            updaterId: values.senderId,
            status: "REQUESTED",
            timestamp: new Date().toISOString()
          }
        ],
        parcelFee: {
          baseRate: 60,
          weightCharge: values.weight * 8, // 8 per kg
          distanceCharge: 50, // Default distance charge
          totalFee: 60 + (values.weight * 8) + 50
        },
        paymentMethod: values.paymentMethod,
        paymentStatus: "PENDING"
      }

      // console.log("Parcel Data:", parcelData)

      // Here you would make your API call
      // const res = await createParcel(parcelData).unwrap()

      // toast.success("Parcel created successfully")
      // navigate("/dashboard")
    } catch (error: any) {
      console.log(error)
      toast.error(error?.data?.message || "Failed to create parcel")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="p-6 md:p-8">
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
                      name="senderId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sender ID</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter sender ID" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

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
                              <SelectItem value="PACKAGE">Package</SelectItem>
                              <SelectItem value="DOCUMENT">Document</SelectItem>
                              <SelectItem value="FRAGILE">Fragile</SelectItem>
                              <SelectItem value="ELECTRONICS">Electronics</SelectItem>
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
                    <FormField
                      control={form.control}
                      name="senderName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter sender name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="senderPhone"
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
                            <SelectItem value="PREPAID">Prepaid</SelectItem>
                            <SelectItem value="POSTPAID">Postpaid</SelectItem>
                            <SelectItem value="COD">Cash on Delivery</SelectItem>
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
              disabled={isLoading}
            >
              {isLoading ? "Creating Parcel..." : "Create Parcel"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}