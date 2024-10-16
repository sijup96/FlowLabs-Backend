import { NextFunction, Request, Response } from "express";
import { IEmployeeUseCase } from "../../../interface/employee/I_employeeUseCase";
import { IEmployeeDocument } from "../../../interface/employee/I_employeeDocument";


class EmployeeController{
constructor(private employeeUseCase:IEmployeeUseCase){}
async addEmployee(req:Request,res:Response,next:NextFunction){
    try {
        const data:Partial<IEmployeeDocument>=req.body
        await this.employeeUseCase.addEmployee(data)
    } catch (error) {
        next(error)
    }
}
}

export default EmployeeController