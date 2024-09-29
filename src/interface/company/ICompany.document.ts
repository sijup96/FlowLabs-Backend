import { Document } from "mongoose";
export interface ICompanyDocument extends Document {
  companyName: string;
  companySlug: string;
  industry: string;
  phone: string;
  email: string;
  password: string;
  logo?: string;
  description?: string;
  foundedDate?: Date;
  orderNo?: string;
  orderDate?: Date;
  plan?: string;
  serviceStatus?: string;
  paymentId?: string;
  isApproved?: string;
  createdAt?: Date;
  expiryDate?: Date;
  updatedAt?: Date;
}
