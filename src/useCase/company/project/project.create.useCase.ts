import slugify from "slugify";
import { ProjectRepository } from "../../../adapters/repositories/company/project.repository";
import { ProjectEntity } from "../../../entity/project.entity";
import { CompanyDbService } from "../../../frameworks/services/db.connection.service";
import {
  ICreateProjectUseCase,
  IProjectDocument,
} from "../../../interface/company/I_project";
import { IPayload } from "../../../interface/service/I_jwtService";
import { CustomError } from "../../../shared/utils/customError";

export class CreateProjectUseCase implements ICreateProjectUseCase {
  constructor(
    private companyDbService: CompanyDbService,
    private projectRepository: ProjectRepository
  ) {}
  async execute(data: IProjectDocument, user: IPayload): Promise<void> {
    const slug = slugify(data.name);
    const projectEntity = new ProjectEntity(
      data.name,
      slug,
      data.description,
      data.assignedTo as string[],
      data.startDate,
      data.endDate,
      data.priority,
      data.status,
      data.createdAt || new Date(), // Fallback to the current date if createdAt is not provided
      data.updatedAt || new Date() // Fallback to the current date if updatedAt is not provided
    );
    projectEntity.validateData();
    const connection = await this.companyDbService.getConnection(
      user.domainName
    );
    if (!connection) throw new Error("Connection error, try again..");
    const isExist = await this.projectRepository.findOne(connection, slug);
    if (isExist)
      throw new CustomError(
        "Validation Error",
        { isExist: "Project already exist" },
        400
      );
    const projectData = {
      ...data,
      slug,
    };
    await this.projectRepository.create(
      connection,
      projectData as IProjectDocument
    );
  }
}
