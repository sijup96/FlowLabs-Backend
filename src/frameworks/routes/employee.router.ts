import express from "express";
import EmployeeUseCase from "../../useCase/employee/employee.useCase";
import EmployeeController from "../../adapters/controllers/employee/employee.controller";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { JwtService } from "../services/jwt.service";

const router = express.Router();

// Services
const jwtService = new JwtService();

// UseCase
const employeeUseCase = new EmployeeUseCase();

// Middleware
const authMiddleware = new AuthMiddleware(jwtService);
// Controller
const employeeController = new EmployeeController(employeeUseCase);

router.post(
  "/add",
  authMiddleware.isHR.bind(authMiddleware),
  employeeController.addEmployee.bind(employeeController)
);
export default router