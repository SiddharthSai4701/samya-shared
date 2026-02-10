/**
 * Enum for the different ways of splitting an expense
 */
export enum SplitType {
    EQUAL = "equal",
    AMOUNT = "amount",
    PERCENTAGE = "percentage",
    SHARES = "shares"
}

/**
 * System + Custom categories. System defaults:
- Food & Dining
- Transportation
- Shopping
- Entertainment
- Bills & Utilities
- Health
- Travel
- Education
- Other
 */
export interface Category {
    id: string;
    name: string;
    icon: string | null;
    color: string | null;
    userId: string | null;
    parentCategoryId: string | null;
    createdAt: string;
}

/**
 * Individual expenses.
 */
export interface Expense {
    id: string;
    amount: number;
    currency: string;
    description: string;
    notes: string | null;
    categoryId: string | null;
    paidBy: string;
    createdBy: string;
    groupId: string | null;
    splitType: SplitType;
    date: string;
    receiptUrl: string | null;
    isDeleted: boolean;
    deletedBy: string | null;
    deletedAt: string | null;
    category?: Category;
    createdAt: string;
    updatedAt: string;
}

/**
 * How an expense is split among participants.
 */
export interface ExpenseSplit {
    id: string;
    expenseId: string;
    userId: string;
    shareAmount: number;
    shareValue: number;
    createdAt: string;
}