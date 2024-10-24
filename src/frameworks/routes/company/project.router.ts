import express from "express";
import { ProjectController } from "../../../adapters/controllers/company/project.controller";
import { CreateProjectUseCase } from "../../../useCase/company/project/project.create.useCase";
import { CompanyDbService } from "../../services/db.connection.service";
import { ProjectRepository } from "../../../adapters/repositories/company/project.repository";
import { AuthMiddleware } from "../../middleware/auth.middleware";
import { JwtService } from "../../services/jwt.service";

const router = express.Router();

// Service
const companyDbService = new CompanyDbService();
const jwtService = new JwtService();
// Repository
const projectRepository = new ProjectRepository();
// UseCase
const createProjectUseCase = new CreateProjectUseCase(
  companyDbService,
  projectRepository
);
// Controller
const projectController = new ProjectController(createProjectUseCase);
// Middleware
const authMiddleware = new AuthMiddleware(jwtService);

router.post(
  "/create",
  authMiddleware.isHR.bind(authMiddleware),
  projectController.createProject.bind(projectController)
);

export default router;
