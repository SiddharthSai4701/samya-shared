import { SplitType } from "../types";

export interface SplitTypeInfo {
  label: string;
  description: string;
  icon: string;
}

export const SPLIT_TYPE_INFO: Record<SplitType, SplitTypeInfo> = {
  [SplitType.AMOUNT]: {
    label: "Amount",
    description: "Split by amount",
    icon: "",
  },
  [SplitType.EQUAL]:{
    label: "Equal",
    description: "Split equally",
    icon: "",
  },
  [SplitType.PERCENTAGE]:{
    label: "Percentage",
    description: "Split by percentage",
    icon: "",
  },
  [SplitType.SHARES]:{
    label: "Shares",
    description: "Split by shares",
    icon: "",
  }
};