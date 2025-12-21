/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useCreatePricingTierMutation } from "@/redux/feature/pricing/pricing.api"
import { toast } from "sonner"
import PricingForms from "@/components/shared/forms/PricingForms"
import { Package } from "lucide-react"

// --- Mocking your import for the example ---
// import { PRICING_TIER } from "./pricing.type"
const PRICING_TIER = {
  STANDARD: "Standard",
  EXPRESS: "Express",
  PREMIUM: "Premium",
} as const

// 1. Define Schema
const formSchema = z.object({
  title: z.enum(PRICING_TIER).default(PRICING_TIER.STANDARD),
  description: z.string().min(5, "Description is required"),
  basePrice: z.coerce.number().positive("Must be positive"),
  pricePerKg: z.coerce.number().positive("Must be positive"),
  features: z.array(
    z.object({
      value: z.string().min(1, "Feature cannot be empty"),
    })
  ).min(1, "Add at least one feature"),
})

type PricingFormValues = z.infer<typeof formSchema>

export default function CreatePricingForm() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [createPricingTier] = useCreatePricingTierMutation(undefined)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: PRICING_TIER.STANDARD,
      description: "",
      basePrice: 0,
      pricePerKg: 0,
      features: [{ value: "Real-time GPS tracking" }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "features",
  })

  async function onSubmit(values: PricingFormValues) {
    setLoading(true)
    try {
      const data = {
        ...values,
        features: values.features.map((f) => f.value),
      }
      console.log("Submitting:", data)

      // Simulate API call
      const res = await createPricingTier(data).unwrap()
      console.log("API Response:", res)
      if (res?.success) {

        toast.success("Pricing tier created successfully!")
      }
      // Optionally, you can invalidate the pricing tiers cache here if you have one


      setOpen(false) // Close dialog on success
      form.reset()   // Reset form
    } catch (error: any) {
      console.error("Submission error:", error.data.message || error.message)
      // Optionally show error to user
      toast.error(error?.data?.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <PricingForms
        Icon={Package}
        btnText="Create Package"
        open={open} 
        setOpen={setOpen}
        form={form}
        onSubmit={onSubmit}
        fields={fields}
        formTitle="Create Service Package"
        formDescription="Configure the pricing details and feature set for this tier."
        loading={loading}
        actionBtnText="Create Service"
        append={append}
        remove={remove}

      />
    </div>
    // <Dialog open={open} onOpenChange={setOpen}>
    //   <DialogTrigger asChild>
    //     <Button size="lg" className="gap-2">
    //       <Package className="h-4 w-4" /> Create Package
    //     </Button>
    //   </DialogTrigger>


    //   <DialogContent className="sm:max-w-[600px] flex flex-col gap-0 p-0 overflow-hidden">
    //     <DialogHeader className="p-6 pb-2">
    //       <DialogTitle className="text-xl flex items-center gap-2">
    //         Create Service Package
    //       </DialogTitle>
    //       <DialogDescription>
    //         Configure the pricing details and feature set for this tier.
    //       </DialogDescription>
    //     </DialogHeader>

    //     <Form {...form}>
    //       <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full">

    //         {/* Scrollable Body Area */}
    //         <div className="flex-1 overflow-y-auto max-h-[70vh] p-6 pt-2 space-y-6">

    //           {/* Section 1: Core Details */}
    //           <div className="space-y-4">
    //             <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
    //               <Package className="h-4 w-4" /> Package Details
    //             </div>
    //             <Separator />

    //             <div className="grid gap-4">
    //               <FormField
    //                 control={form.control}
    //                 name="title"
    //                 render={({ field }) => (
    //                   <FormItem>
    //                     <FormLabel>Tier Name</FormLabel>
    //                     <Select onValueChange={field.onChange} defaultValue={field.value}>
    //                       <FormControl>
    //                         <SelectTrigger>
    //                           <SelectValue placeholder="Select a tier" />
    //                         </SelectTrigger>
    //                       </FormControl>
    //                       <SelectContent>
    //                         {Object.values(PRICING_TIER).map((tier) => (
    //                           <SelectItem key={tier} value={tier}>
    //                             {tier}
    //                           </SelectItem>
    //                         ))}
    //                       </SelectContent>
    //                     </Select>
    //                     <FormMessage />
    //                   </FormItem>
    //                 )}
    //               />

    //               <FormField
    //                 control={form.control}
    //                 name="description"
    //                 render={({ field }) => (
    //                   <FormItem>
    //                     <FormLabel>Description</FormLabel>
    //                     <FormControl>
    //                       <Textarea
    //                         placeholder="e.g. Best for small businesses needing fast delivery..."
    //                         className="resize-none h-24"
    //                         {...field}
    //                       />
    //                     </FormControl>
    //                     <FormMessage />
    //                   </FormItem>
    //                 )}
    //               />
    //             </div>
    //           </div>

    //           {/* Section 2: Financials */}
    //           <div className="space-y-4">
    //             <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
    //               <DollarSign className="h-4 w-4" /> Pricing Configuration
    //             </div>
    //             <Separator />

    //             <div className="grid grid-cols-2 gap-4">
    //               <FormField
    //                 control={form.control}
    //                 name="basePrice"
    //                 render={({ field }) => (
    //                   <FormItem>
    //                     <FormLabel>Base Price (৳)</FormLabel>
    //                     <FormControl>
    //                       <div className="relative">
    //                         <Input
    //                           type="number"
    //                           className="pl-8" // Make room for icon
    //                           {...field}
    //                           value={(field.value as number) || ""}
    //                           onChange={(e) => field.onChange(e.target.valueAsNumber)}
    //                         />
    //                         <span className="absolute left-3 top-2.5 text-muted-foreground text-sm">৳</span>
    //                       </div>
    //                     </FormControl>
    //                     <FormMessage />
    //                   </FormItem>
    //                 )}
    //               />
    //               <FormField
    //                 control={form.control}
    //                 name="pricePerKg"
    //                 render={({ field }) => (
    //                   <FormItem>
    //                     <FormLabel>Price / KG (৳)</FormLabel>
    //                     <FormControl>
    //                       <div className="relative">
    //                         <Input
    //                           type="number"
    //                           className="pl-8"
    //                           {...field}
    //                           value={(field.value as number) || ""}
    //                           onChange={(e) => field.onChange(e.target.valueAsNumber)}
    //                         />
    //                         <span className="absolute left-3 top-2.5 text-muted-foreground text-sm">৳</span>
    //                       </div>
    //                     </FormControl>
    //                     <FormMessage />
    //                   </FormItem>
    //                 )}
    //               />
    //             </div>
    //           </div>

    //           {/* Section 3: Features */}
    //           <div className="space-y-4">
    //             <div className="flex items-center justify-between">
    //               <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
    //                 <ListChecks className="h-4 w-4" /> Features Checklist
    //               </div>
    //               <Badge variant="secondary" className="font-normal">
    //                 {fields.length} items
    //               </Badge>
    //             </div>
    //             <Separator />

    //             <div className="bg-muted/30 p-4 rounded-lg space-y-3">
    //               {fields.map((field, index) => (
    //                 <div key={field.id} className="flex gap-2 items-start animate-in fade-in slide-in-from-bottom-2 duration-300">
    //                   <FormField
    //                     control={form.control}
    //                     name={`features.${index}.value`}
    //                     render={({ field }) => (
    //                       <FormItem className="flex-1 space-y-0">
    //                         <FormControl>
    //                           <Input
    //                             className="bg-background"
    //                             placeholder="e.g. Same day delivery"
    //                             {...field}
    //                           />
    //                         </FormControl>
    //                         <FormMessage className="text-xs mt-1" />
    //                       </FormItem>
    //                     )}
    //                   />
    //                   <Button
    //                     type="button"
    //                     variant="ghost"
    //                     size="icon"
    //                     className="text-muted-foreground hover:text-destructive shrink-0"
    //                     onClick={() => remove(index)}
    //                     disabled={fields.length === 1}
    //                   >
    //                     <Trash2 className="h-4 w-4" />
    //                   </Button>
    //                 </div>
    //               ))}

    //               <Button
    //                 type="button"
    //                 variant="outline"
    //                 size="sm"
    //                 className="w-full border-dashed text-muted-foreground hover:text-primary mt-2"
    //                 onClick={() => append({ value: "" })}
    //               >
    //                 <Plus className="mr-2 h-4 w-4" /> Add Feature
    //               </Button>
    //             </div>
    //           </div>

    //         </div>

    //         {/* Footer - Fixed at bottom */}
    //         <DialogFooter className="p-6 pt-2 bg-background z-20">
    //           <Button type="button" variant="outline" onClick={() => setOpen(false)}>
    //             Cancel
    //           </Button>
    //           <Button type="submit" disabled={loading}>
    //             {loading ? (
    //               "Saving..."
    //             ) : (
    //               <>
    //                 <Save className="mr-2 h-4 w-4" /> Create Service
    //               </>
    //             )}
    //           </Button>
    //         </DialogFooter>
    //       </form>
    //     </Form>
    //   </DialogContent>
    // </Dialog>
  )
}