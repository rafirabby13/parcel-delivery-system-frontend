export interface ParcelAddress {
  name: string;
  phone: string;
  division: string;
  city: string;
  area: string;
  detailAddress: string;
}

export interface ParcelFee {
  baseRate: number;
  weightCharge: number;
  distanceCharge: number;
  totalFee: number;
}

export interface TrackingEvent {
  status: string;
  updaterId: string;
  location?: string;
  note?: string;
}

export interface Parcel {
  _id: string;
  trackingId: string;
  parcelType: string;
  weight: number;
  senderId: string;
  senderInfo: ParcelAddress;
  receiverInfo: ParcelAddress;

  assignedDeliveryPartner: string | null;

  parcelFee: ParcelFee;
  paymentMethod: string;
  paymentStatus: string;
  paymentId?: string;

  status: string;
  isActive: string; // e.g., "ACTIVE" | "INACTIVE"
  cancelledBy: string | null;

  trackingEvents: TrackingEvent[];

  createdAt: string;
  updatedAt: string;
}
