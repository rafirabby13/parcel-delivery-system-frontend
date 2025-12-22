/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "sonner";
import { Edit2Icon, Loader2Icon, PencilIcon, PlusIcon } from "lucide-react";

import {
  useGetPricingTiersQuery,
  useUpdateLocationChargeMutation,
  useUpdatePricingTierMutation,
} from "@/features/pricing/api/pricing.api";

import CreatePricingForm from "@/features/pricing/components/CreatePricingForm";
import PricingForms from "@/features/pricing/components/PricingForms";

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import type { IPricingTierResponse } from "@/features/pricing/types/pricing.type";

const BD_DIVISIONS = ["Dhaka", "Chittagong", "Sylhet", "Khulna", "Rajshahi", "Barisal", "Rangpur", "Mymensingh"];

/* -------------------------------------------------------------------------- */
/* TYPES                                   */
/* -------------------------------------------------------------------------- */

type PricingFormValues = {
  title: string;
  description: string;
  basePrice: number | string;
  pricePerKg: number | string;
  features: any[]; // Changed to any[] to be safe against form mismatches
};

const ManagePricings = () => {
  const { data: tiers, isLoading } = useGetPricingTiersQuery(undefined);
  const [updatePricingTier, { isLoading: isUpdating }] = useUpdatePricingTierMutation();
  const [updateLocationCharge] = useUpdateLocationChargeMutation();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<IPricingTierResponse | null>(null);

  const [locationForm, setLocationForm] = useState({
    fromDivision: "",
    toDivision: "",
    charge: "",
  });

  /* ------------------------------- FORM INIT ------------------------------ */
  
  const form = useForm<PricingFormValues>({
    defaultValues: {
      title: "",
      description: "",
      basePrice: 0,
      pricePerKg: 0,
      features: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "features",
  });

  /* ------------------------------- HANDLERS ------------------------------- */

  const handleEditClick = (tier: IPricingTierResponse) => {
    setSelectedTier(tier);

    // Initialize as objects so the fields display correctly initially
    const formFeatures = (tier.features || []).map((f) => ({ value: f }));

    form.reset({
      title: tier.title,
      description: tier.description,
      basePrice: tier.basePrice,
      pricePerKg: tier.pricePerKg,
      features: formFeatures,
    });

    setIsEditOpen(true);
  };

  const handleSaveEdit = async (values: PricingFormValues) => {
    if (!selectedTier) return;

    try {
      // ✅ FIX: Handle both Objects ({value: "text"}) and Strings ("text")
      // If the Input component registered as `features.0`, it returns a string.
      // If registered as `features.0.value`, it returns an object.
      // This line handles BOTH scenarios.
      const apiFeatures = values.features
        .map((f: any) => (typeof f === "object" ? f.value : f))
        .filter((f) => f !== undefined && f !== ""); // Remove empty entries

      const payload = {
        _id: selectedTier._id,
        title: values.title,
        description: values.description,
        basePrice: Number(values.basePrice),
        pricePerKg: Number(values.pricePerKg),
        features: apiFeatures,
      };

      console.log("PAYLOAD:", payload); // Check console, features should be correct now

      const res = await updatePricingTier(payload).unwrap();

      if (res?.success) {
        toast.success("Pricing updated successfully");
        setIsEditOpen(false);
        setSelectedTier(null);
        form.reset();
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.data?.message || "Failed to update");
    }
  };

  const handleUpdateLocation = async () => {
    if (!locationForm.fromDivision || !locationForm.toDivision || !locationForm.charge) {
      return toast.error("Please fill all fields");
    }
    try {
      const res = await updateLocationCharge({
        fromDivision: locationForm.fromDivision,
        toDivision: locationForm.toDivision,
        charge: Number(locationForm.charge),
      }).unwrap();

      if (res?.success) {
        toast.success("Route configured");
        setLocationForm({ fromDivision: "", toDivision: "", charge: "" });
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to configure route");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2Icon className="animate-spin w-8 h-8 text-purple-500" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-500">
      <CreatePricingForm />

      <Tabs defaultValue="tiers">
        <TabsList className="grid w-[400px] grid-cols-2 mb-4">
          <TabsTrigger value="tiers">Pricing Tiers</TabsTrigger>
          <TabsTrigger value="routes">Route Charges</TabsTrigger>
        </TabsList>

        {/* --- TIERS TABLE --- */}
        <TabsContent value="tiers" className="border rounded-lg p-4 bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Base (BDT)</TableHead>
                <TableHead>Per KG</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tiers?.data?.map((tier: IPricingTierResponse) => (
                <TableRow key={tier._id}>
                  <TableCell className="font-medium">{tier.title}</TableCell>
                  <TableCell>{tier.basePrice} ৳</TableCell>
                  <TableCell>{tier.pricePerKg} ৳/kg</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs font-bold ${tier.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {tier.isActive ? "ACTIVE" : "INACTIVE"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="icon" variant="ghost" onClick={() => handleEditClick(tier)}>
                      <PencilIcon size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        {/* --- LOCATION CHARGES --- */}
        <TabsContent value="routes" className="border rounded-lg p-6 bg-card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-medium">Inter-Division Charges</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm"><PlusIcon className="w-4 h-4 mr-2" /> Add Route</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Route Charge</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>From</Label>
                        <Select onValueChange={(v) => setLocationForm({ ...locationForm, fromDivision: v })}>
                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>
                            {BD_DIVISIONS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                        </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>To</Label>
                        <Select onValueChange={(v) => setLocationForm({ ...locationForm, toDivision: v })}>
                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>
                            {BD_DIVISIONS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                        </SelectContent>
                        </Select>
                    </div>
                  </div>
                  <Input 
                    type="number" 
                    placeholder="Charge amount" 
                    onChange={(e) => setLocationForm({ ...locationForm, charge: e.target.value })} 
                  />
                  <Button onClick={handleUpdateLocation} className="w-full">Save</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="text-sm text-muted-foreground bg-muted p-4 rounded">
            Default: <strong>80 BDT</strong> (Inter-division), <strong>20 BDT</strong> (Same-division).
          </div>
        </TabsContent>
      </Tabs>

      {/* --- EDIT FORM --- */}
      <PricingForms
        open={isEditOpen}
        setOpen={setIsEditOpen}
        form={form}
        onSubmit={handleSaveEdit}
        fields={fields}
        append={append}
        remove={remove}
        loading={isUpdating}
        Icon={Edit2Icon}
        formTitle="Edit Tier"
        formDescription="Update pricing details"
        actionBtnText="Update"
        tierData={selectedTier}
        btnText=""
      />
    </div>
  );
};

export default ManagePricings;