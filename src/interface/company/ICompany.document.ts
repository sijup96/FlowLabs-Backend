import { Document } from "mongoose";
import { CompanyEntity } from "../../entity/company.entity";

export interface ICompanyDocument extends Document{
    companyName: string;
    companySlug:string;
    industry: string;
    phone: string;
    email: string;
    Password?:string;
    logo?: string;
    description?:string;
    foundedDate?:Date;
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