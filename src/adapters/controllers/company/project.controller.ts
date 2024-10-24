import { NextFunction, Request, Response } from "express";
import { CreateProjectUseCase } from "../../../useCase/company/project/project.create.useCase";
import { IPayload } from "../../../interface/service/I_jwtService";

export class ProjectController {
  constructor(private createProjectUseCase: CreateProjectUseCase) {}
  async createProject(req: Request, res: Response, next: NextFunction) {
    try {
      await this.createProjectUseCase.execute(req.body, req.user as IPayload);
      res.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  }
}
