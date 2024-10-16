import { IEmployeeDocument } from "../../interface/employee/I_employeeDocument";
import { IEmployeeUseCase } from "../../interface/employee/I_employeeUseCase";


class EmployeeUseCase implements IEmployeeUseCase{
    constructor(){}
    async addEmployee(data: Partial<IEmployeeDocument>): Promise<void> {
       try {
        console.log(data)
       } catch (error) {
        throw error
       } 
    }
}

export default EmployeeUseCase