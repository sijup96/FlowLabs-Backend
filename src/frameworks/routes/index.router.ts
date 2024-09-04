import express from 'express';
import { CompanyAuthController } from '../../adapters/controllers/company/company.auth.controller';
import { OtpRepository } from '../../adapters/repositories/company/otp.repository';
import { EmailService } from '../services/email.service';
import { CompanySignUpUseCase } from '../../useCase/company/signUp.useCase';
import { CompanyDbService } from '../services/db.connection.service';
import { CompanyRepository } from '../../adapters/repositories/company/company.repository';


const router = express.Router();

// Instantiate CompanyDbService
const companyDbService=new CompanyDbService()

// Repositories
const otpRepository=new OtpRepository();
const companyRepository=new CompanyRepository(companyDbService);

// Services
const emailService=new EmailService()

// UseCases
const companySignUpUseCase =new CompanySignUpUseCase(otpRepository,companyRepository,emailService)

// Controllers
const companyAuthController=new CompanyAuthController(companySignUpUseCase)
router.post('/otp', companyAuthController.generateOtp.bind(companyAuthController))

export default router