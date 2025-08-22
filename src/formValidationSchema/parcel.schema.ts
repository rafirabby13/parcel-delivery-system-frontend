import z from "zod";

// Define enums as readonly arrays
export const Parcel_Type2 = ["PACKAGE", "DOCUMENT", "FRAGILE", "ELECTRONICS"] as const;
export type Parcel_Type = (typeof Parcel_Type2)[number];

export const Payment_Method2 = ["PREPAID" , "COD"] as const;
export type Payment_Method = (typeof Payment_Method2)[number];

// Bangladesh phone regex
const bangladeshPhoneRegex = /^01[3-9]\d{8}$/;

// Sender/Receiver address schema
export const addressSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    phone: z.string().regex(bangladeshPhoneRegex, "Invalid Bangladesh phone number"),
    division: z.string().min(1, "Division is required"),
    city: z.string().min(1, "City is required"),
    area: z.string().min(1, "Area is required"),
    detailAddress: z.string().min(5, "Detail address must be at least 5 characters"),
});

// Main parcel schema
export const parcelSchema = z.object({
    senderId: z.string().min(1, "Sender ID is required"),
    receiverId: z.string().optional(),
    parcelType: z.enum(Parcel_Type2, { required_error: "Please select a parcel type" }),
    weight: z.number().min(0.1, "Weight must be greater than 0"),
    description: z.string().max(500, "Description too long").optional(),
    senderInfo: addressSchema,
    receiverInfo: addressSchema,
    paymentMethod: z.enum(Payment_Method2, { required_error: "Please select a payment method" }),
    codAmount: z.number().min(0, "COD amount cannot be negative").optional(),
});

// Form schema that matches the component structure
export const formSchema = z.object({
    parcelType: z.enum(Parcel_Type2, {
        required_error: "Please select a parcel type"
    }),
    weight: z.number().min(0.1, { message: "Weight must be greater than 0" }).max(50, 'Weight cannot exceed 50 kg'),
    senderDivision: z.string().min(1, { message: "Division is required" }),
    senderCity: z.string().min(1, { message: "City is required" }),
    senderArea: z.string().min(1, { message: "Area is required" }),
    senderDetailAddress: z.string().min(5, { message: "Detail address must be at least 5 characters" }),
    receiverName: z.string().min(2, { message: "Receiver name must be at least 2 characters" }),
    receiverPhone: z.string().regex(bangladeshPhoneRegex, "Invalid Bangladesh phone number"),
    receiverDivision: z.string().min(1, { message: "Division is required" }),
    receiverCity: z.string().min(1, { message: "City is required" }),
    receiverArea: z.string().min(1, { message: "Area is required" }),
    receiverDetailAddress: z.string().min(5, { message: "Detail address must be at least 5 characters" }),
    paymentMethod: z.enum(Payment_Method2, {
        required_error: "Please select a payment method"
    }),
})