import express from "express";
import { CompanyUseCase } from "../../useCase/company/company.useCase";
import { CompanyController } from "../../adapters/controllers/company/company.controller";
import { CompanyDbService } from "../services/db.connection.service";
import { CompanyRepository } from "../../adapters/repositories/company/company.repository";
import { JwtService } from "../services/jwt.service";
import { AuthMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

// Service
const companyDbService = new CompanyDbService();
const jwtService = new JwtService();
// Repository
const companyRepository = new CompanyRepository(companyDbService);
// UseCase
const companyUseCase = new CompanyUseCase(
  companyDbService,
  companyRepository,
  jwtService
);
// Middleware
const authMiddleware=new AuthMiddleware(jwtService)
// Controller
const companyController = new CompanyController(companyUseCase);

router.post("/login", companyController.login.bind(companyController));
router.post(
  "/resetPassword",authMiddleware.authUser,
  companyController.companyPasswordReset.bind(companyController)
);

export default router;
