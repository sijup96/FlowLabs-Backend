import { Document, Schema, model } from 'mongoose';
import { ICompanyDocument } from '../../../interface/company/ICompany.document';
import bcrypt from 'bcrypt'

const CompanySchema: Schema<ICompanyDocument> = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    companyName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    domain: {
        type: String,
        trim: true,
    },
    orderNo: {
        type: String,
        trim: true,
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
    plan: {
        type: String,
        trim: true,
        default: "Trail",
    },
    serviceStatus: {
        type: String,
        trim: true,
        default: "Active",
    },
    paymentId: {
        type: String,
        trim: true,
    },
    isApproved: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    expiryDate: {
        type: Date,
        default: () => new Date(+new Date() + 30*24*60*60*1000), // 30 days from now
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

// Method to compare the password
CompanySchema.methods.comparePassword=async function (enteredPassword:string) {
return bcrypt.compare(enteredPassword,this.password);
}

export const CompanyModel = model<ICompanyDocument>('Company', CompanySchema);
