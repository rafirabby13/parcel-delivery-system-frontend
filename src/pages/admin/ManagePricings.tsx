/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useGetPricingTiersQuery,
  useUpdateLocationChargeMutation,
  useUpdatePricingTierMutation
} from "@/redux/feature/pricing/pricing.api";
import { Edit2Icon, Loader2Icon, PencilIcon, PlusIcon } from "lucide-react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreatePricingForm from "@/components/modules/admin/pricing/CreatePricingForm";
import { PRICING_TIER, type IPricingTierResponse } from "@/components/modules/admin/pricing/pricing.type";
import { Label } from "@/components/ui/label";
import PricingForms from "@/components/shared/forms/PricingForms";
import { useFieldArray, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Hardcoded Divisions for the Location Form
const BD_DIVISIONS = ["Dhaka", "Chittagong", "Sylhet", "Khulna", "Rajshahi", "Barisal", "Rangpur", "Mymensingh"];
const formSchema = z.object({
  title: z.enum(PRICING_TIER).default(PRICING_TIER.STANDARD).optional(),
  description: z.string().min(5, "Description is required").optional(),
  basePrice: z.coerce.number().positive("Must be positive").optional(),
  pricePerKg: z.coerce.number().positive("Must be positive").optional(),
  features: z.array(
      z.string().min(1, "Feature cannot be empty")
  ).optional(),
})

type PricingFormValues = z.infer<typeof formSchema>
const ManagePricings = () => {
  const { data: tiers, isLoading } = useGetPricingTiersQuery(undefined);
  const [updatePricingTier, { isLoading: isUpdating }] = useUpdatePricingTierMutation();
  const [updateLocationCharge] = useUpdateLocationChargeMutation();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: PRICING_TIER.STANDARD,
      description: "",
      basePrice: 0,
      pricePerKg: 0,
      features: ["Real-time GPS tracking"],
    },
  })
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "features",
  })

  // --- STATE: Edit Modal ---
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<IPricingTierResponse | null>(null);


  // --- STATE: Location Charge Form ---
  const [locationForm, setLocationForm] = useState({
    fromDivision: "",
    toDivision: "",
    charge: "",
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2Icon className="animate-spin w-6 h-6 text-purple-500" />
      </div>
    );
  }

  // --- HANDLER: Open Edit Modal ---
  const handleEditClick = (tier: IPricingTierResponse) => {
    console.log({ tier })
    setSelectedTier(tier);

    setIsEditModalOpen(true);
  };

  // --- HANDLER: Submit Update Tier ---
  const handleSaveEdit = async (values: PricingFormValues) => {
    if (!selectedTier) return;

    try {
      const payload = {...values, _id: selectedTier._id };
      console.log(payload)
      const res = await updatePricingTier(payload).unwrap();

      if (res?.success) {
        toast.success("Pricing tier updated successfully");
        setIsEditModalOpen(false);
        setSelectedTier(null);
      }
    } catch (error: any) {
      console.log("oops", error)
      toast.error(error?.data?.message || "Failed to update tier");
    }
  };

  // --- HANDLER: Add/Update Location Charge ---
  const handleUpdateLocation = async () => {
    if (!locationForm.fromDivision || !locationForm.toDivision || !locationForm.charge) {
      return toast.error("Please fill all fields");
    }
    try {
      const payload = {
        fromDivision: locationForm.fromDivision,
        toDivision: locationForm.toDivision,
        charge: Number(locationForm.charge),
      };
      const res = await updateLocationCharge(payload).unwrap();
      if (res?.success) {
        toast.success("Location charge configured successfully");
        setLocationForm({ fromDivision: "", toDivision: "", charge: "" }); // Reset
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to configure route");
    }
  };

  return (
    <div className="p-6 space-y-8">
      <div>
        <CreatePricingForm />
      </div>

      <Tabs defaultValue="tiers" className="w-full">
        <div className="flex justify-between items-center mb-6">
          <TabsList className="grid w-[400px] grid-cols-2">
            <TabsTrigger value="tiers">Pricing Tiers</TabsTrigger>
            <TabsTrigger value="locations">Route Charges</TabsTrigger>
          </TabsList>
        </div>

        {/* --- TAB 1: PRICING TIERS --- */}
        <TabsContent value="tiers" className="border border-muted rounded-lg">
          <Table className="px-10">
            <TableHeader className="bg-purple-100 dark:bg-background">
              <TableRow>
                <TableHead>Tier Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Base Rate (BDT)</TableHead>
                <TableHead>Per KG Rate (BDT)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tiers?.data?.map((tier: IPricingTierResponse) => (
                <TableRow key={tier._id}>
                  <TableCell className="font-medium">{tier.title}</TableCell>
                  <TableCell className="max-w-[200px] truncate" title={tier.description}>
                    {tier.description}
                  </TableCell>
                  <TableCell className="font-bold text-slate-600">
                    {tier.basePrice} ৳
                  </TableCell>
                  <TableCell>
                    {tier.pricePerKg} ৳ / kg
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${tier.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {tier.isActive ? "ACTIVE" : "INACTIVE"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right" >
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditClick(tier)}

                    >
                      <PencilIcon size={16} className="text-muted-foreground hover:text-purple-600" />

                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>


        {/* --- TAB 2: LOCATION CHARGES --- */}
        <TabsContent value="locations">
          <div className="border border-muted rounded-lg p-6 bg-card">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-medium">Inter-Division Charges</h3>
                <p className="text-sm text-muted-foreground">Set custom prices for specific routes.</p>
              </div>

              {/* Add New Route Modal */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <PlusIcon size={16} /> Add Route Charge
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Configure Route Price</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>From</Label>
                        <Select onValueChange={(val) => setLocationForm({ ...locationForm, fromDivision: val })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Division" />
                          </SelectTrigger>
                          <SelectContent>
                            {BD_DIVISIONS.map(div => <SelectItem key={div} value={div}>{div}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>To</Label>
                        <Select onValueChange={(val) => setLocationForm({ ...locationForm, toDivision: val })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Division" />
                          </SelectTrigger>
                          <SelectContent>
                            {BD_DIVISIONS.map(div => <SelectItem key={div} value={div}>{div}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Extra Charge (BDT)</Label>
                      <Input
                        type="number"
                        placeholder="e.g. 100"
                        onChange={(e) => setLocationForm({ ...locationForm, charge: e.target.value })}
                      />
                    </div>
                    <Button onClick={handleUpdateLocation} className="w-full mt-2">
                      Save Route Configuration
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Hint Box */}
            <div className="bg-yellow-50 dark:bg-yellow-900/10 border-l-4 border-yellow-400 p-4 mb-6">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Note:</strong> If no specific route is found, the system defaults to <strong>80 BDT</strong> for inter-division and <strong>20 BDT</strong> for same-division.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <PricingForms
        Icon={Edit2Icon}
        btnText=""
        open={isEditModalOpen}
        setOpen={setIsEditModalOpen}
        form={form}
        onSubmit={handleSaveEdit}
        fields={fields}
        formTitle="Edit Pricing Tier"
        formDescription="Modify the details of the selected pricing tier."
        loading={isUpdating}
        actionBtnText="Save Changes"
        append={append}
        remove={remove}
        tierData={selectedTier ? selectedTier : null}
      />

    </div>
  );
};

export default ManagePricings;