import { Connection } from "mongoose";
import { IEmployeeDocument } from "./I_employeeDocument";



export interface IEmployeeRepository{
    add(connection:Connection,data:Partial<IEmployeeDocument>):Promise<void>
}