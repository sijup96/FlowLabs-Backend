import { model, Schema } from 'mongoose';
import { IDepartmentDocument } from "../../../interface/company/I_department";

export const DepartmentSchema: Schema<IDepartmentDocument> = new Schema(
  {
    departmentName: { type: String },
    slug:{type:String},
    description: { type: String },
    status: { type: String },
    updatedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const DepartmentModel=model<IDepartmentDocument>("Department",DepartmentSchema)