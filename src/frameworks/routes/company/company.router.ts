import express from "express";
import { CompanyUseCase } from "../../../useCase/company/company.useCase";
import { CompanyController } from "../../../adapters/controllers/company/company.controller";
import { CompanyDbService } from "../../services/db.connection.service";
import { CompanyRepository } from "../../../adapters/repositories/company/company.repository";
import { JwtService } from "../../services/jwt.service";
import { AuthMiddleware } from "../../middleware/auth.middleware";
import multer from "multer";
import { AwsS3Bucket } from "../../services/awsS3Service.service";
import { DepartmentController } from "../../../adapters/controllers/company/department.controller";
import { DepartmentUseCase } from "../../../useCase/company/department.useCase";
import { DepartmentRepository } from "../../../adapters/repositories/company/department.repository";

const router = express.Router();
// Multer
const storage = multer.memoryStorage();
const upload = multer({ storage });
// Service
const companyDbService = new CompanyDbService();
const jwtService = new JwtService();
const s3Bucket = new AwsS3Bucket();
// Repository
const companyRepository = new CompanyRepository(companyDbService);
const departmentRepository = new DepartmentRepository();
// UseCase
const companyUseCase = new CompanyUseCase(
  companyDbService,
  companyRepository,
  jwtService,
  s3Bucket
);
const departmentUseCase = new DepartmentUseCase(
  companyDbService,
  departmentRepository
);
// Middleware
const authMiddleware = new AuthMiddleware(jwtService);
// Controller
const companyController = new CompanyController(companyUseCase, jwtService);
const departmentController = new DepartmentController(departmentUseCase);

router.post("/login", companyController.login.bind(companyController));
router.post('/logout', authMiddleware.isHR.bind(authMiddleware),companyController.logout.bind(companyController))
router.put(
  "/resetPassword",
  authMiddleware.isHR.bind(authMiddleware),
  companyController.companyPasswordReset.bind(companyController)
);
router.get(
  "/getCompanyInfo",
  authMiddleware.isHR.bind(authMiddleware),
  companyController.getCompanyInfo.bind(companyController)
);
router.put(
  "/updateCompany",
  authMiddleware.isHR.bind(authMiddleware),
  companyController.updateCompanyInfo.bind(companyController)
);

router.post(
  "/updateLogo",
  authMiddleware.isHR.bind(authMiddleware),
  upload.single("company_logo"),
  companyController.uploadLogo.bind(companyController)
);

// Department
router.post(
  "/addDepartment",
  authMiddleware.isHR.bind(authMiddleware),
  departmentController.addDepartment.bind(departmentController)
);
router.get(
  "/getAllDepartments",
  authMiddleware.isHR.bind(authMiddleware),
  departmentController.getAllDepartment.bind(departmentController)
);
router.get(
  "/getDepartmentInfo",
  authMiddleware.isHR.bind(authMiddleware),
  departmentController.getDepartmentInfo.bind(departmentController)
);
router.put(
  "/updateDepartment",
  authMiddleware.isHR.bind(authMiddleware),
  departmentController.updateDepartment.bind(departmentController)
);
router.get("/getActiveDepartment");
export default router;
