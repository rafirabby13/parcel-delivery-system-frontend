// /* eslint-disable @typescript-eslint/no-explicit-any */


// import { Plus, Trash2, Save, Package, DollarSign, ListChecks } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import {
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form"
// import { Textarea } from "@/components/ui/textarea"
// import { Input } from "@/components/ui/input"
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select"
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogFooter,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "@/components/ui/dialog"
// import { Separator } from "@/components/ui/separator"
// import { Badge } from "@/components/ui/badge"
// import { PRICING_TIER } from "@/components/modules/admin/pricing/pricing.type"

// interface PricingFormsProps{
//   Icon: React.ComponentType<any>;
//   btnText: string;
//   open: boolean;
//   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   form: any;
//   onSubmit: (values: any) => void;
//   fields: any[];
//   formTitle: string;
//   formDescription: string;
//   loading: boolean;
//   actionBtnText: string;
//   append: (value: any) => void;
//   remove: (index: number) => void;
//   tierData?: any;
// }

// const PricingForms = ({Icon,btnText,open, setOpen, form, onSubmit, fields, formTitle, formDescription,loading,actionBtnText,append,remove,tierData}: PricingFormsProps) => {
//     console.log(tierData)
//     return (
//         <Dialog open={open} onOpenChange={setOpen}>
//             <DialogTrigger asChild>
//                 <Button size="lg" className="gap-2">
//                     <Icon className="h-4 w-4" /> {btnText}
//                 </Button>
//             </DialogTrigger>

//             {/* Increased width to sm:max-w-[600px] for better breathing room */}
//             <DialogContent className="sm:max-w-[600px] flex flex-col gap-0 p-0 overflow-hidden">
//                 <DialogHeader className="p-6 pb-2">
//                     <DialogTitle className="text-xl flex items-center gap-2">
//                        {formTitle}
//                     </DialogTitle>
//                     <DialogDescription>
//                         {formDescription}
//                         {/* Configure the pricing details and feature set for this tier. */}
//                     </DialogDescription>
//                 </DialogHeader>

//                 <Form {...form}>
//                     <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full">

//                         {/* Scrollable Body Area */}
//                         <div className="flex-1 overflow-y-auto max-h-[70vh] p-6 pt-2 space-y-6">

//                             {/* Section 1: Core Details */}
//                             <div className="space-y-4">
//                                 <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
//                                     <Package className="h-4 w-4" /> Package Details
//                                 </div>
//                                 <Separator />

//                                 <div className="grid gap-4">
//                                     <FormField
//                                         control={form.control}
//                                         name="title"
//                                         render={({ field }) => (
//                                             <FormItem>
//                                                 <FormLabel>Tier Name</FormLabel>
//                                                 <Select onValueChange={field.onChange} defaultValue={field.value}>
//                                                     <FormControl>
//                                                         <SelectTrigger>
//                                                             <SelectValue placeholder="Select a tier" />
//                                                         </SelectTrigger>
//                                                     </FormControl>
//                                                     <SelectContent>
//                                                         {Object.values(PRICING_TIER).map((tier) => (
//                                                             <SelectItem key={tier} value={tier}>
//                                                                 {tier}
//                                                             </SelectItem>
//                                                         ))}
//                                                     </SelectContent>
//                                                 </Select>
//                                                 <FormMessage />
//                                             </FormItem>
//                                         )}
//                                     />

//                                     <FormField
//                                         control={form.control}
//                                         name="description"
//                                         render={({ field }) => (
//                                             <FormItem>
//                                                 <FormLabel>Description</FormLabel>
//                                                 <FormControl>
//                                                     <Textarea
//                                                         placeholder="e.g. Best for small businesses needing fast delivery..."
//                                                         className="resize-none h-24"
//                                                         {...field}
//                                                     />
//                                                 </FormControl>
//                                                 <FormMessage />
//                                             </FormItem>
//                                         )}
//                                     />
//                                 </div>
//                             </div>

//                             {/* Section 2: Financials */}
//                             <div className="space-y-4">
//                                 <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
//                                     <DollarSign className="h-4 w-4" /> Pricing Configuration
//                                 </div>
//                                 <Separator />

//                                 <div className="grid grid-cols-2 gap-4">
//                                     <FormField
//                                         control={form.control}
//                                         name="basePrice"
//                                         render={({ field }) => (
//                                             <FormItem>
//                                                 <FormLabel>Base Price (৳)</FormLabel>
//                                                 <FormControl>
//                                                     <div className="relative">
//                                                         <Input
//                                                             type="number"
//                                                             className="pl-8" // Make room for icon
//                                                             {...field}
//                                                             value={(field.value as number) || ""}
//                                                             onChange={(e) => field.onChange(e.target.valueAsNumber)}
//                                                         />
//                                                         <span className="absolute left-3 top-2.5 text-muted-foreground text-sm">৳</span>
//                                                     </div>
//                                                 </FormControl>
//                                                 <FormMessage />
//                                             </FormItem>
//                                         )}
//                                     />
//                                     <FormField
//                                         control={form.control}
//                                         name="pricePerKg"
//                                         render={({ field }) => (
//                                             <FormItem>
//                                                 <FormLabel>Price / KG (৳)</FormLabel>
//                                                 <FormControl>
//                                                     <div className="relative">
//                                                         <Input
//                                                             type="number"
//                                                             className="pl-8"
//                                                             {...field}
//                                                             value={(field.value as number) || ""}
//                                                             onChange={(e) => field.onChange(e.target.valueAsNumber)}
//                                                         />
//                                                         <span className="absolute left-3 top-2.5 text-muted-foreground text-sm">৳</span>
//                                                     </div>
//                                                 </FormControl>
//                                                 <FormMessage />
//                                             </FormItem>
//                                         )}
//                                     />
//                                 </div>
//                             </div>

//                             {/* Section 3: Features */}
//                             <div className="space-y-4">
//                                 <div className="flex items-center justify-between">
//                                     <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
//                                         <ListChecks className="h-4 w-4" /> Features Checklist
//                                     </div>
//                                     <Badge variant="secondary" className="font-normal">
//                                         {fields.length} items
//                                     </Badge>
//                                 </div>
//                                 <Separator />

//                                 <div className="bg-muted/30 p-4 rounded-lg space-y-3">
//                                     {fields.map((field, index) => (
//                                         <div key={field.id} className="flex gap-2 items-start animate-in fade-in slide-in-from-bottom-2 duration-300">
//                                             <FormField
//                                                 control={form.control}
//                                                 name={`features.${index}.value`}
//                                                 render={({ field }) => (
//                                                     <FormItem className="flex-1 space-y-0">
//                                                         <FormControl>
//                                                             <Input
//                                                                 className="bg-background"
//                                                                 placeholder="e.g. Same day delivery"
//                                                                 {...field}
//                                                             />
//                                                         </FormControl>
//                                                         <FormMessage className="text-xs mt-1" />
//                                                     </FormItem>
//                                                 )}
//                                             />
//                                             <Button
//                                                 type="button"
//                                                 variant="ghost"
//                                                 size="icon"
//                                                 className="text-muted-foreground hover:text-destructive shrink-0"
//                                                 onClick={() => remove(index)}
//                                                 disabled={fields.length === 1}
//                                             >
//                                                 <Trash2 className="h-4 w-4" />
//                                             </Button>
//                                         </div>
//                                     ))}

//                                     <Button
//                                         type="button"
//                                         variant="outline"
//                                         size="sm"
//                                         className="w-full border-dashed text-muted-foreground hover:text-primary mt-2"
//                                         onClick={() => append({ value: "" })}
//                                     >
//                                         <Plus className="mr-2 h-4 w-4" /> Add Feature
//                                     </Button>
//                                 </div>
//                             </div>

//                         </div>

//                         {/* Footer - Fixed at bottom */}
//                         <DialogFooter className="p-6 pt-2 bg-background z-20">
//                             <Button type="button" variant="outline" onClick={() => setOpen(false)}>
//                                 Cancel
//                             </Button>
//                             <Button type="submit" disabled={loading}>
//                                 {loading ? (
//                                     "Saving..."
//                                 ) : (
//                                     <>
//                                         <Save className="mr-2 h-4 w-4" /> {actionBtnText}
//                                     </>
//                                 )}
//                             </Button>
//                         </DialogFooter>
//                     </form>
//                 </Form>
//             </DialogContent>
//         </Dialog>
//     )
// }

// export default PricingForms
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react" // 1. Import useEffect
import { Plus, Trash2, Save, Package, DollarSign, ListChecks } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { PRICING_TIER } from "@/components/modules/admin/pricing/pricing.type"

interface PricingFormsProps {
    Icon: React.ComponentType<any>;
    btnText: string;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    form: any;
    onSubmit: (values: any) => void;
    fields: any[];
    formTitle: string;
    formDescription: string;
    loading: boolean;
    actionBtnText: string;
    append: (value: any) => void;
    remove: (index: number) => void;
    tierData?: any; // The data passed for editing
}

const PricingForms = ({
    Icon,
    btnText,
    open,
    setOpen,
    form,
    onSubmit,
    fields,
    formTitle,
    formDescription,
    loading,
    actionBtnText,
    append,
    remove,
    tierData
}: PricingFormsProps) => {

    // 2. Add this useEffect to handle Form Population
    useEffect(() => {
        if (open) {
            if (tierData) {
                // --- EDIT MODE ---
                // We need to transform features from ["a", "b"] to [{value: "a"}, {value: "b"}]
                // because useFieldArray expects an array of objects
                const formattedFeatures = tierData.features && Array.isArray(tierData.features)
                    ? tierData.features.map((f: string) => ( f ))
                    : [""];

                form.reset({
                    title: tierData.title,
                    description: tierData.description,
                    basePrice: tierData.basePrice,
                    pricePerKg: tierData.pricePerKg,
                    features: formattedFeatures,
                    // Add other fields if necessary
                });
            } else {
                // --- CREATE MODE ---
                // Reset to empty default values
                form.reset({
                    title: "",
                    description: "",
                    basePrice: 0,
                    pricePerKg: 0,
                    features: [ "" ],
                });
            }
        }
    }, [tierData, open, form]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {
                btnText && <DialogTrigger asChild>
                    <Button size="lg" className="gap-2">
                        <Icon className="h-4 w-4" /> {btnText}
                    </Button>
                </DialogTrigger>
            }


            <DialogContent className="sm:max-w-[600px] flex flex-col gap-0 p-0 overflow-hidden">
                <DialogHeader className="p-6 pb-2">
                    <DialogTitle className="text-xl flex items-center gap-2">
                        {formTitle}
                    </DialogTitle>
                    <DialogDescription>
                        {formDescription}
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full">

                        {/* Scrollable Body Area */}
                        <div className="flex-1 overflow-y-auto max-h-[70vh] p-6 pt-2 space-y-6">

                            {/* Section 1: Core Details */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                                    <Package className="h-4 w-4" /> Package Details
                                </div>
                                <Separator />

                                <div className="grid gap-4">
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Tier Name</FormLabel>
                                                <Select onValueChange={field.onChange} value={field.value || ""}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a tier" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {Object.values(PRICING_TIER).map((tier) => (
                                                            <SelectItem key={tier} value={tier}>
                                                                {tier}
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
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Description</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="e.g. Best for small businesses..."
                                                        className="resize-none h-24"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            {/* Section 2: Financials */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                                    <DollarSign className="h-4 w-4" /> Pricing Configuration
                                </div>
                                <Separator />

                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="basePrice"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Base Price (৳)</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input
                                                            type="number"
                                                            className="pl-8"
                                                            {...field}
                                                            // Handle 0 or empty string correctly for number inputs
                                                            value={field.value}
                                                            onChange={(e) => field.onChange(e.target.value === "" ? "" : Number(e.target.value))}
                                                        />
                                                        <span className="absolute left-3 top-2.5 text-muted-foreground text-sm">৳</span>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="pricePerKg"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Price / KG (৳)</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input
                                                            type="number"
                                                            className="pl-8"
                                                            {...field}
                                                            value={field.value}
                                                            onChange={(e) => field.onChange(e.target.value === "" ? "" : Number(e.target.value))}
                                                        />
                                                        <span className="absolute left-3 top-2.5 text-muted-foreground text-sm">৳</span>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            {/* Section 3: Features */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                                        <ListChecks className="h-4 w-4" /> Features Checklist
                                    </div>
                                    <Badge variant="secondary" className="font-normal">
                                        {fields.length} items
                                    </Badge>
                                </div>
                                <Separator />

                                <div className="bg-muted/30 p-4 rounded-lg space-y-3">
                                    {fields.map((field, index) => (
                                        <div key={field.id} className="flex gap-2 items-start animate-in fade-in slide-in-from-bottom-2 duration-300">
                                            <FormField
                                                control={form.control}
                                                name={`features.${index}`}
                                                render={({ field }) => (
                                                    <FormItem className="flex-1 space-y-0">
                                                        <FormControl>
                                                            <Input
                                                                className="bg-background"
                                                                placeholder="e.g. Same day delivery"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage className="text-xs mt-1" />
                                                    </FormItem>
                                                )}
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="text-muted-foreground hover:text-destructive shrink-0"
                                                onClick={() => remove(index)}
                                                disabled={fields.length === 1}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}

                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        className="w-full border-dashed text-muted-foreground hover:text-primary mt-2"
                                        onClick={() => append({ value: "" })}
                                    >
                                        <Plus className="mr-2 h-4 w-4" /> Add Feature
                                    </Button>
                                </div>
                            </div>

                        </div>

                        {/* Footer - Fixed at bottom */}
                        <DialogFooter className="p-6 pt-2 bg-background z-20">
                            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={loading}>
                                {loading ? (
                                    "Saving..."
                                ) : (
                                    <>
                                        <Save className="mr-2 h-4 w-4" /> {actionBtnText}
                                    </>
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default PricingForms