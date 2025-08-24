interface IAddress {
    area: string
    city: string
    division: string
}

interface IAuth {
    provider: string
    providerId: string
}

export interface IUser {
    _id: string
    name: string
    email: string
    password: string
    phone: string
    role: "SENDER" | "SUPER_ADMIN" | "ADMIN" | "RECEIVER" | "DELIVERY_PERSON" // extend as needed
    address: IAddress
    auths: IAuth[]
    isActive: "ACTIVE" | "INACTIVE" | "BLOCKED"
    isDeleted: boolean
    isVerified: boolean
    createdAt: string   // ISO date string
    updatedAt: string   // ISO date string
}
