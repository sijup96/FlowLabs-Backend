import { Connection, Document } from "mongoose";
import { IPayload } from "../service/I_jwtService";

// Document
export interface IProjectDocument extends Document {
  name: string;
  slug: string;
  description: string;
  assignedTo: object;
  startDate: Date;
  endDate: Date;
  priority: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// UseCase
export interface ICreateProjectUseCase {
  execute(data: IProjectDocument, user: IPayload): Promise<void>;
}

// Repository
export interface IProjectRepository {
  create(connection: Connection, data: IProjectDocument): Promise<void>;
  findOne(connection:Connection,slug:string):Promise<IProjectDocument|null>
}
