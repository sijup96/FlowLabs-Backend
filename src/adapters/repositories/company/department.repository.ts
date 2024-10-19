import mongoose, { Connection } from "mongoose";
import {
  IDepartmentDocument,
  IDepartmentProps,
  IDepartmentRepository,
} from "../../../interface/company/I_department";
import { COLLECTION_NAME } from "../../../shared/constants";
import { DepartmentModel } from "../../../frameworks/database/models/department.model";
import { ObjectId } from "mongodb";

export class DepartmentRepository implements IDepartmentRepository {
  async create(connection: Connection, data: IDepartmentProps): Promise<void> {
    const departmentModel = connection.model(
      COLLECTION_NAME.department,
      DepartmentModel.schema
    );
    const departmentDocument = new departmentModel(data);
    await departmentDocument.save();
  }
  async findBySlug(
    connection: Connection,
    slug: string
  ): Promise<IDepartmentDocument | null> {
    const collection = connection.collection(COLLECTION_NAME.department);
    return (await collection.findOne({ slug })) as IDepartmentDocument | null;
  }
  async findAll(connection: Connection): Promise<IDepartmentDocument[]> {
    const collection = connection.collection(COLLECTION_NAME.department);
    const data = await collection.find().toArray();
    return data as unknown as IDepartmentDocument[];
  }
  async findById(
    connection: Connection,
    id: string
  ): Promise<IDepartmentDocument> {
    const collection = connection.collection(COLLECTION_NAME.department);
    const objectId = new mongoose.Types.ObjectId(id);
    const cursor = await collection.findOne({ _id: objectId });
    return cursor as IDepartmentDocument;
  }
  async findByIdAndUpdate(
    connection: Connection,
    id: string,
    data: IDepartmentProps
  ): Promise<void> {
    const collection = connection.collection(COLLECTION_NAME.department);
    const objectId = new ObjectId(id);
    console.log(data)
    await collection.findOneAndUpdate({ _id: objectId }, { $set: data });
  }
}
