import { NextFunction, Request, Response } from "express";
import { IDepartmentUseCase } from "../../../interface/company/I_department";
import { IPayload } from "../../../interface/service/I_jwtService";

export class DepartmentController {
  constructor(private departmentUseCase: IDepartmentUseCase) {}
  async addDepartment(req: Request, res: Response, next: NextFunction) {
    try {
      await this.departmentUseCase.addDepartment(
        req.body,
        req.user as IPayload
      );
      res.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  }
  async getAllDepartment(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.departmentUseCase.getAllDepartment(
        req.user as IPayload
      );
      res.status(200).json({ departmentList: data });
    } catch (error) {
      next(error);
    }
  }
  async getDepartmentInfo(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.query.id as string;
      const departmentInfo = await this.departmentUseCase.getDepartmentInfo(
        id,
        req.user as IPayload
      );
      res.status(200).json({ departmentInfo });
    } catch (error) {
      next(error);
    }
  }
  async updateDepartment(req: Request, res: Response, next: NextFunction) {
    try {
      await this.departmentUseCase.updateDepartment(
        req.query.id as string,
        req.body,
        req.user as IPayload
      );
      res.status(200).json({success:true})
    } catch (error) {
      console.log(error)
      next(error);
    }
  }
}
