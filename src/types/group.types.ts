import { SplitType } from "./expense.types";

/**
 * Defines the possible roles that a user may have in a group
 * Defaults to member
 */
export enum GroupRole {
    ADMIN = "admin",
    MEMBER = "member"
}

/**
 * Expense sharing groups.
 */
export interface Group {
    id: string;
    name: string;
    description: string | null;
    imageUrl: string | null;
    createdBy: string;
    defaultSplitType: SplitType;
    members?: GroupMember[];
    simplifyDebts: boolean;
    createdAt: string;
    updatedAt: string;
    archivedAt: string | null;
}

/**
 * Group membership.
 */
export interface GroupMember {
  id: string;
  groupId: string;
  userId: string;
  role: GroupRole;
  defaultShare: number;
  joinedAt: string;
  leftAt: string | null;
}