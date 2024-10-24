import { CompanyEntity } from "../../entity/company.entity";
import { OtpEntities } from "../../entity/otp.entity";
import { generateOtpCode } from "../../frameworks/services/generateOtp.service";
import {
  ICompanyGoogleSignUp,
  ICompanySignUpOtp,
  ICompanySignUpUseCase,
} from "../../interface/company/ICompany.signUp";
import { IOtpRepository } from "../../interface/company/IOtp.repository";
import { CustomError } from "../../shared/utils/customError";
import bcrypt from "bcrypt";
import { EmailService } from "../../frameworks/services/email.service";
import slugify from "slugify";
import { SIGNUP_EMAIL_BODY } from "../../shared/constants";
import { GoogleService } from "../../frameworks/services/google.service";
import { envConfig } from "../../shared/config/env.config";
import { ICompanyRepository } from "../../interface/company/ICompany.repository";

export class CompanySignUpUseCase implements ICompanySignUpUseCase {
  constructor(
    private otpRepository: IOtpRepository,
    private companyRepository: ICompanyRepository,
    private emailService: EmailService,
    private googleService: GoogleService
  ) {
    this.otpRepository = otpRepository;
    this.companyRepository = companyRepository;
  }
  public async generateOtp(data: { email: string }): Promise<void> {
    const { email } = data;
    const otpCode = generateOtpCode();
    const otp = new OtpEntities(email, otpCode);
    await this.otpRepository.saveOtp(otp);
    await this.emailService.sendMail({
      to: email,
      subject: "Flow Labs OTP",
      body: ` <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
        <h2 style="color: #007BFF;">Verify Your Email</h2>
        <p>Please use the following OTP to verify your email:</p>
        <div style="background-color: #f0f0f0; padding: 10px; border-radius: 5px; margin-bottom: 20px;">
            <h3 style="margin: 0; color: #007BFF;">${otpCode}</h3>
        </div>
        <p>This OTP is valid for a short period. Do not share it with anyone.</p>
        <p>If you did not request this verification, please ignore this email.</p>
        <P style="color: #007BFF;">From Flow Labs </p>
    </div>`,
    });
  }
  public async validateOtp(email: string, otpCode: string): Promise<boolean> {
    const otp = await this.otpRepository.verifyOtp(email, otpCode);
    if (otp && !otp.isExpired() && !otp.isUsed) {
      otp.markAsUsed();
      return true;
    }
    return false;
  }
  async signUp(reqBody: ICompanySignUpOtp): Promise<void> {
    try {
      const { companyName, industry, phone, email, otp } = reqBody;
      const errorObject: { [key: string]: string } = {};
      const defaultPassword = envConfig.DEFAULT_PASSWORD;
      if (!defaultPassword) throw new Error("Default Password error");

      // Check for existing company
      const existingCompany = await this.companyRepository.isExistingCompany(
        companyName
      );
      if (existingCompany) {
        errorObject.companyNameError = "Company already exists";
      }

      // Verify OTP
      const isOtpVerified = await this.otpRepository.verifyOtp(email, otp);
      if (!isOtpVerified) {
        errorObject.otpError = "OTP verification failed.";
      }

      // Log errors and throw validation error if any
      if (Object.keys(errorObject).length > 0) {
        throw new CustomError("Validation Error", errorObject, 400);
        return;
      }
      // Hash password
      const password = await bcrypt.hash(defaultPassword, 10);
      const companySlug = slugify(companyName, { lower: true });
      // Create company data
      const companyData = new CompanyEntity(
        companyName,
        companySlug,
        industry,
        phone,
        email,
        password
      );
      // Save the new company
      await this.companyRepository.save(companyData);
      // Send welcome email
      await this.emailService.sendMail({
        to: email,
        subject: "Welcome to FlowLabs! Your Login Link",
        body: SIGNUP_EMAIL_BODY(),
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async googleAuth(signUpData: ICompanyGoogleSignUp): Promise<void> {
    const { companyName, industry, phone, tokenResponse } = signUpData;
    const errorObject: { [key: string]: string } = {};
    const defaultPassword = envConfig.DEFAULT_PASSWORD;
    if (!defaultPassword) throw new Error("default Password error");
    // Check for existing company
    const existingCompany = await this.companyRepository.isExistingCompany(
      companyName
    );
    if (existingCompany) {
      errorObject.companyNameError = "Company already exists";
    }
    const userData = await this.googleService.verifyGoogleToken(
      tokenResponse.access_token
    );
    const email = userData?.email || "";
    const logo = userData?.picture;

    if (Object.keys(errorObject).length > 0) {
      throw new CustomError("Validation Error", errorObject, 400);
    }
    // Hash password
    const password = await bcrypt.hash(defaultPassword, 10);
    const companySlug = slugify(companyName, { lower: true });
    const companyData = new CompanyEntity(
      companyName,
      companySlug,
      industry,
      phone,
      email,
      password,
      logo
    );
    // Save the new company
    await this.companyRepository.save(companyData);
    // Send welcome email
    await this.emailService.sendMail({
      to: email,
      subject: "Welcome to FlowLabs! Your Login Link",
      body: SIGNUP_EMAIL_BODY(),
    });
  }
}
