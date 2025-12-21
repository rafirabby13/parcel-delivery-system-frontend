// src/types/pricing.types.ts

export type Pricing_Tier = "Standard" | "Express" | "Premium";

export const PRICING_TIER = {
    STANDARD: "Standard",
    EXPRESS: "Express",
    PREMIUM: "Premium",
} as const;

export interface IPricingTier {
    _id: string;

    name: Pricing_Tier;
    description: string;

    baseRate: number;     // BDT
    weightRate: number;   // per KG

    isActive: boolean;
}
export interface IPricingTierResponse {
    _id: string;

    title: string;
    description: string;
    features: string[];
    basePrice: number;     // BDT
    pricePerKg: number;   // per KG

    isActive: boolean;
}

export interface ILocationCharge {
    _id: string;

    fromDivision: string;
    toDivision: string;

    charge: number;       // BDT
}

/* Optional – used for price preview */
export type RouteType = "INTRA" | "ADJACENT" | "INTER";

export interface IPriceBreakdown {
    baseRate: number;
    weightCharge: number;
    distanceCharge: number;
    totalFee: number;
    currency: "BDT";
    routeType: RouteType;
}
