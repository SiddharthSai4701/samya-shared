/**
 * Represents a user in the Samya app
 * Core user entity
 */
export interface User {
    id: string;
    phoneNumber: string;
    name: string;
    email: string | null;
    profilePictureUrl: string | null;
    defaultCurrency: string;
    language: string;
    createdAt: string;
    updatedAt: string;
}

/**
 * Represents a user's UPI ID
 */
export interface UserUpiId {
    id: string;
    userId: string;
    upiId: string;
    label: string | null;
    isPrimary: boolean;
    createdAt: string;
}

/**
 * Represents a device used by a user
 */
export interface UserDevice {
    id: string;
    userId: string;
    deviceToken: string;
    deviceType: 'ios' | 'android' | 'web';
    isActive: boolean;
    lastUsedAt: string | null;
    createdAt: string;
}

/**
 * Represents a contact in a user's contacts
 */
export interface UserContact {
    id: string;
    userId: string;
    contactUserId: string | null;
    contactName: string | null;
    contactPhone: string | null;
    createdAt: string;
    updatedAt: string;
}

/**
 * Represents the notification preferences of a user
 */
export interface NotificationPreferences {
    id: string;
    userId: string;
    pushEnabled: boolean;
    emailEnabled: boolean;
    reminderEnabled: boolean;
    quietHoursStart: string | null;
    quietHoursEnd: string | null;
    createdAt: string;
    updatedAt: string;
}