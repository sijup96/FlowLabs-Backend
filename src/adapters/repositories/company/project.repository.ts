import { Connection } from "mongoose";
import {
  IProjectDocument,
  IProjectRepository,
} from "../../../interface/company/I_project";
import { COLLECTION_NAME } from "../../../shared/constants";
import { ProjectModel } from "../../../frameworks/database/models/project.model";

export class ProjectRepository implements IProjectRepository {
  constructor() {}
 async create(connection: Connection, data: IProjectDocument): Promise<void> {
    const projectModel = connection.model<IProjectDocument>(
      COLLECTION_NAME.project,
      ProjectModel.schema
    );
    await new projectModel(data).save()
  }
  async findOne(
    connection: Connection,
    slug: string
  ): Promise<IProjectDocument | null> {
    const collection = connection.collection(COLLECTION_NAME.project);
    const data = await collection.findOne({ slug });
    return data ? (data as unknown as IProjectDocument) : null;
  }
}
