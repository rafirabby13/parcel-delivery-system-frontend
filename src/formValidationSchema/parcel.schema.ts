import { z } from "zod";

// Parcel type as readonly array
export const ParcelType2 = ["PACKAGE", "DOCUMENT", "FRAGILE", "ELECTRONICS"] as const;
export type ParcelType = (typeof ParcelType2)[number];

// Payment method as readonly array
export const PaymentMethod2 = ["PREPAID", "COD"] as const;
export type PaymentMethod = (typeof PaymentMethod2)[number];

// Bangladesh phone regex
const bangladeshPhoneRegex = /^01[3-9]\d{8}$/;

// Address schema
export const addressSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().regex(bangladeshPhoneRegex, "Invalid Bangladesh phone number"),
  division: z.string().min(1, "Division is required"),
  city: z.string().min(1, "City is required"),
  area: z.string().min(1, "Area is required"),
  detailAddress: z.string().min(5, "Detail address must be at least 5 characters"),
});

// Parcel schema
export const parcelSchema = z.object({
  senderId: z.string().min(1, "Sender ID is required"),
  receiverId: z.string().optional(),
  parcelType: z.enum(ParcelType2, { message: "Please select a parcel type" }),
  weight: z.number().min(0.1, "Weight must be greater than 0").max(50, "Weight cannot exceed 50 kg"),
  description: z.string().max(500, "Description too long").optional(),
  senderInfo: addressSchema,
  receiverInfo: addressSchema,
  paymentMethod: z.enum(PaymentMethod2, { message: "Please select a payment method" }),
  codAmount: z.number().min(0, "COD amount cannot be negative").optional(),
});

// Form schema for frontend
export const formSchema = z.object({
  parcelType: z.enum(ParcelType2, { message: "Please select a parcel type" }),
  weight: z.number().min(0.1, { message: "Weight must be greater than 0" }).max(50, { message: "Weight cannot exceed 50 kg" }),
  senderDivision: z.string().min(1, { message: "Division is required" }),
  senderDistrict: z.string().min(1, { message: "District is required" }),
  senderCity: z.string().min(1, { message: "City is required" }),
  senderArea: z.string().min(1, { message: "Area is required" }),
  senderDetailAddress: z.string().min(5, { message: "Detail address must be at least 5 characters" }),
  receiverName: z.string().min(2, { message: "Receiver name must be at least 2 characters" }),
  receiverPhone: z.string().regex(bangladeshPhoneRegex, "Invalid Bangladesh phone number"),
  receiverDivision: z.string().min(1, { message: "Division is required" }),
  receiverDistrict: z.string().min(1, { message: "District is required" }),
  receiverCity: z.string().min(1, { message: "City is required" }),
  receiverArea: z.string().min(1, { message: "Area is required" }),
  receiverDetailAddress: z.string().min(5, { message: "Detail address must be at least 5 characters" }),
  paymentMethod: z.enum(PaymentMethod2, { message: "Please select a payment method" }),
  codAmount: z.number().min(0, "COD amount cannot be negative").optional(),
});
