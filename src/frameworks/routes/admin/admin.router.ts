import express from "express";
import { AdminAuthController } from "../../../adapters/controllers/admin/admin.auth.controller";
import {
  AdminDbService,
  CompanyDbService,
} from "../../services/db.connection.service";
import { AdminRepository } from "../../../adapters/repositories/admin/admin.repository";
import { AdminUseCase } from "../../../useCase/admin/admin.useCase";
import { JwtService } from "../../services/jwt.service";
import { AdminRequestsRepository } from "../../../adapters/repositories/admin/admin.requests.repository";
import { EmailService } from "../../services/email.service";
import { AuthMiddleware } from "../../middleware/auth.middleware";

const router = express.Router();
// Service
const adminDbService = new AdminDbService();
const jwtService = new JwtService();
const companyDbService = new CompanyDbService();
const emailService = new EmailService();
// Repository
const adminRepository = new AdminRepository(adminDbService);
const adminRequestsRepository = new AdminRequestsRepository(
  adminDbService,
  companyDbService
);
// UseCase
const adminUseCase = new AdminUseCase(
  adminRepository,
  jwtService,
  adminRequestsRepository,
  companyDbService,
  emailService,
  adminDbService
);
// Controller
const adminAuthController = new AdminAuthController(adminUseCase);
// Middleware
const authMiddleware = new AuthMiddleware(jwtService);

router.post("/login", adminAuthController.adminLogin.bind(adminAuthController));
router.get(
  "/userRequests",
  authMiddleware.isAdmin.bind(authMiddleware),
  adminAuthController.getUserRequests.bind(adminAuthController)
);
router.post(
  "/approvelRequest",
  adminAuthController.approvelRequest.bind(adminAuthController)
);

export default router;
