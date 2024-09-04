import { Document } from "mongoose";
import { CompanyEntity } from "../../entity/company.entity";

export interface ICompanyDocument extends Document{
    firstName: string;
    lastName: string;
    phone: string;
    companyName: string;
    email: string;
    password: string;
    domain?: string;
    orderNo?: string;
    orderDate?: Date;
    plan?: string;
    serviceStatus?: string;
    paymentId?: string;
    isApproved?: boolean;
    createdAt?: Date;
    expiryDate?: Date;
    updatedAt?: Date;
}