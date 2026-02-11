/**
 * Enum for the various possible statuses of a settlement
 */
export enum SettlementStatus {
    PENDING = "pending",
    CONFIRMED = "confirmed",
    REJECTED = "rejected"
}

/**
 * Enum for different payment methods
 */
export enum PaymentMethod {
    UPI = "upi",
    CASH = "cash",
    BANK = "bank",
    OTHER = "other"
}

/**
 * Payment records between users.
 */
export interface Settlement {
    id: string;
    fromUserId: string;
    toUserId: string;
    amount: number;
    currency: string;
    groupId: string | null;
    status: SettlementStatus;
    paymentMethod: PaymentMethod | null;
    paymentProofUrl: string | null;
    notes: string | null;
    createdAt: string;
    settledAt: string | null;
    confirmedAt: string | null;
}

/**
 * Represents a calculated balance between two users
 * (Not stored in DB - computed from expenses and settlements)
 */
export interface Balance {
    userId: string;
    otherUserId: string;
    amount: number;
    currency: string;
}