import { IEmployeeDocument } from "./I_employeeDocument";

export interface IEmployeeUseCase{
    addEmployee(data:Partial<IEmployeeDocument>):Promise<void>
}