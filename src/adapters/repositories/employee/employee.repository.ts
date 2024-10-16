import { Connection } from "mongoose";
import { IEmployeeDocument } from "../../../interface/employee/I_employeeDocument";
import { IEmployeeRepository } from "../../../interface/employee/I_employeeRepository";
import { COLLECTION_NAME } from "../../../shared/constants";
import EmployeeModel from "../../../frameworks/database/models/employeeModel";

class EmployeeRepository implements IEmployeeRepository {
  constructor() {}
  async add(
    connection: Connection,
    data: Partial<IEmployeeDocument>
  ): Promise<void> {
    try {
      const employeeModel = connection.model<IEmployeeDocument>(
        COLLECTION_NAME.employees,
        EmployeeModel.schema
      );
      employeeModel&& (await new employeeModel(data).save())
    } catch (error) {
      throw error;
    }
  }
}
