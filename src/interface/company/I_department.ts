import { Document } from "mongoose";
import { Connection } from "mongoose";
import { IPayload } from "../service/I_jwtService";

export interface IDepartmentProps {
  departmentName: string;
  description: string;
  status: string;
}
// Document
export interface IDepartmentDocument extends Document {
  departmentName: string;
  slug: string;
  description: string;
  status: string;
  updatedAt?: Date;
  createdAt?: Date;
}

// Repository
export interface IDepartmentRepository {
  create(connection: Connection, data: IDepartmentProps): Promise<void>;
  findBySlug(
    connection: Connection,
    slug: string
  ): Promise<IDepartmentDocument | null>;
  findAll(connection: Connection): Promise<IDepartmentDocument[]>;
  findById(connection: Connection, id: string): Promise<IDepartmentDocument>;
  findByIdAndUpdate(
    connection: Connection,
    id: string,
    data: IDepartmentProps
  ): Promise<void>;
  findActive(connection: Connection): Promise<IDepartmentDocument[]>;
}

// UseCase
export interface IDepartmentUseCase {
  addDepartment(data: IDepartmentProps, user: IPayload): Promise<void>;
  getAllDepartment(user: IPayload): Promise<IDepartmentDocument[]>;
  getDepartmentInfo(id: string, user: IPayload): Promise<IDepartmentDocument>;
  updateDepartment(
    id: string,
    body: IDepartmentProps,
    user: IPayload
  ): Promise<void>;
  findActiveDepartment(user: IPayload): Promise<IDepartmentDocument[]>;
}
