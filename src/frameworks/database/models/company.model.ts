import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { ICompanyDocument } from "../../../interface/company/ICompany.document";

export const CompanySchema: Schema<ICompanyDocument> = new Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    companySlug: {
      type: String,
      required: true,
      trim: true,
    },
    industry: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
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
    logo: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    foundedDate: {
      type: Date,
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
      type: String,
      enum: ["pending", "approved", "declined"],
      default: "pending",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    expiryDate: {
      type: Date,
      default: () => new Date(+new Date() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Method to compare the password
CompanySchema.methods.comparePassword = async function (
  enteredPassword: string
) {
  return bcrypt.compare(enteredPassword, this.password);
};

export const CompanyModel = model<ICompanyDocument>("Company", CompanySchema);
