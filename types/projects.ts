import { userType } from "./auth-types";

export type ProjectType = {
  id: string;
  clientId: string;
  title: string;
  description: string;
  category: string;
  subCategory: string;
  budgetType: string;
  minBudget: number;
  maxBudget: number;
  expectedDuration: number;
  locationPreference: string;
  skills: string[];
  attachments: string[];
  status: string;
  user: userType;
  createdAt: Date;
  updatedAt: Date;
};
