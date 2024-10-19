import slugify from "slugify";
import { CompanyDbService } from "../../frameworks/services/db.connection.service";
import {
  IDepartmentDocument,
  IDepartmentProps,
  IDepartmentRepository,
  IDepartmentUseCase,
} from "../../interface/company/I_department";
import { IPayload } from "../../interface/service/I_jwtService";
import { CustomError } from "../../shared/utils/customError";
import { validate } from "../../shared/utils/validation";
import { isObjectIdOrHexString } from "mongoose";
import { ObjectId } from "mongodb";

export class DepartmentUseCase implements IDepartmentUseCase {
  constructor(
    private companyDbService: CompanyDbService,
    private departmentRepository: IDepartmentRepository
  ) {}
  // Add Department
  async addDepartment(data: IDepartmentProps, user: IPayload): Promise<void> {
    const errorObject: { [key: string]: string } = {};
    if (!validate.departmentName(data.departmentName))
      errorObject.departmentNameError = "Invalid department name";
    if (validate.description(data.description))
      errorObject.descriptionError = "Invalid description";
    if (Object.keys(errorObject).length > 0) {
      throw new CustomError("Validation Error", errorObject, 400);
    }
    const connection = await this.companyDbService.getConnection(
      user.domainName
    );
    if (!connection) throw new CustomError("connection error", {}, 400);
    const slug = slugify(data.departmentName);
    const isExist = await this.departmentRepository.findBySlug(
      connection,
      slug
    );
    if (isExist)
      throw new CustomError(
        "validation error",
        { departmentNameError: "Department name already exist" },
        400
      );
    const values = { ...data, slug };
    await this.departmentRepository.create(connection, values);
  }
  // Get all department
  async getAllDepartment(user: IPayload): Promise<IDepartmentDocument[]> {
    const connection = await this.companyDbService.getConnection(
      user.domainName
    );
    if (!connection) throw new CustomError("Connection Error", {}, 400);
    return await this.departmentRepository.findAll(connection);
  }
  // Department Info
  async getDepartmentInfo(
    id: string,
    user: IPayload
  ): Promise<IDepartmentDocument> {
    console.log(isObjectIdOrHexString(id));
    if (!isObjectIdOrHexString(id))
      throw new CustomError("Invalid ID", {}, 400);
    const connection = await this.companyDbService.getConnection(
      user.domainName
    );
    if (!connection) throw new CustomError("Connection Error", {}, 400);
    return await this.departmentRepository.findById(connection, id);
  }
  // Update Department
  async updateDepartment(
    id: string,
    body: IDepartmentProps,
    user: IPayload
  ): Promise<void> {
    const errorObject: { [key: string]: string } = {};
    if (!validate.departmentName(body.departmentName))
      errorObject.departmentNameError = "Invalid department name";
    if (validate.description(body.description))
      errorObject.descriptionError = "Invalid description";
    if (Object.keys(errorObject).length > 0) {
      throw new CustomError("Validation Error", errorObject, 400);
    }
    const connection = await this.companyDbService.getConnection(
      user.domainName
    );
    if (!connection) throw new CustomError("Connection Error", {}, 500);
    const slug = slugify(body.departmentName);
    const isExist = (await this.departmentRepository.findBySlug(
      connection,
      slug
    )) as IDepartmentDocument | null;
    const exisitingId = isExist?._id as ObjectId;
    const exisitingCompanyName = isExist?.departmentName;
    if (
      isExist &&
      !exisitingId.equals(new ObjectId(id)) &&
      exisitingCompanyName === body.departmentName
    )
      throw new CustomError(
        "validation error",
        { departmentNameError: "Name already exist." },
        400
      );
      const data={
        departmentName:body.departmentName,
        description:body.description,
        status:body.status
      }
      await this.departmentRepository.findByIdAndUpdate(connection,id,data)
  }
}
