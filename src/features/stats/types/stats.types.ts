export interface UsersStats {
    newUsersInLast7Days: number;
    newUsersInLast30Days: number;
    totalActiveUsers: number;
    totalBlockedUsers: number;
    totalInActiveUsers: number;
    totalUsers: number;
    usersByRole: Array<{
        _id: string;
        count: number;
    }>;
}

// types/stats.types.ts

export interface ParcelsByStatus {
  _id: string;
  count: number;
}

export interface SenderInfo {
  name: string;
  email: string;
  // Add other sender properties as needed
}

export interface ParcelsPerSender {
  _id: string;
  parcelCount: number;
  sender: SenderInfo;
}

export interface ParcelStatss {
  avgWeight: number;
  parcelsByStatus: ParcelsByStatus[];
  parcelsLast7Days: number;
  parcelsLast30Days: number;
  parcelsPerSender: ParcelsPerSender[];
  totalParcels: number;
  uniqueSenders: number;
}

// types/stats.types.ts

export interface PaymentByStatus {
  _id: string; // More flexible for future status types
  count: number;
}

export interface PaymentGateway {
  _id: string;
  count: number;
}

export interface AvgPaymentAmount {
  avgPaymentAMount: number; // Keeping original field name from API
  _id: null;
}

export interface PaymentStatss {
  avgPaymentAmount: AvgPaymentAmount[];
  paymentGatewayData: PaymentGateway[];
  totalPayment: number;
  totalPaymentByStatus: PaymentByStatus[];
  totalRevenue: unknown[]; // Use unknown instead of any for better type safety
}