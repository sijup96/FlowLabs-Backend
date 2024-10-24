import { model, Schema } from "mongoose";
import { IProjectDocument } from "../../../interface/company/I_project";

export const ProjectSchema: Schema<IProjectDocument> = new Schema(
  {
    name: { type: String },
    slug: { type: String },
    description: { type: String },
    assignedTo: { type: Object },
    startDate: { type: Date },
    endDate: { type: Date },
    priority: { type: String },
    status: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const ProjectModel=model<IProjectDocument>('Project',ProjectSchema)