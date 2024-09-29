import { JwtService } from "../../frameworks/services/jwt.service";
import { IAdminLoginCredentials } from "../../interface/admin/IAdmin.credentials";
import { IAdminRepository } from "../../interface/admin/IAdmin.repository";
import {
  IAdminUseCase,
  IRequestApprovelProps,
} from "../../interface/admin/IAdmin.useCase";
import { AdminRequestsRepository } from "../../adapters/repositories/admin/admin.requests.repository";
import { AdminDbService, CompanyDbService } from "../../frameworks/services/db.connection.service";
import { EmailService } from "../../frameworks/services/email.service";
import {
  APPROVED_EMAIL_BODY,
  DECLINE_EMAIL_BODY,
  ROLE,
} from "../../shared/constants";
import { envConfig } from "../../shared/config/env.config";

export class AdminUseCase implements IAdminUseCase {
  constructor(
    private adminRepository: IAdminRepository,
    private jwtService: JwtService,
    private adminRequestsRepository: AdminRequestsRepository,
    private companyDbService: CompanyDbService,
    private emailService: EmailService,
    private adminDbService:AdminDbService,
  ) {
    (this.adminRepository = adminRepository),
      (this.adminRequestsRepository = adminRequestsRepository);
    this.jwtService = jwtService;
    this.emailService = emailService;
  }
  public async login(
    loginCredentials: IAdminLoginCredentials
  ): Promise<string> {
    try {
      const { email, password } = loginCredentials;
      const admin = await this.adminRepository.verifyAdmin(email, password);
      const token = await this.jwtService.generateRefreshToken(
        admin._id,
        admin.email,
        ROLE.admin
      );
      return token;
    } catch (error) {
      throw error;
    }
  }
  public async getUserRequests(): Promise<Record<string, unknown[]> | null> {
    try {
      return await this.adminRequestsRepository.getUnapprovedCompanies();
    } catch (error) {
      throw error;
    }
  }
  public async requestApproval(body: IRequestApprovelProps): Promise<void> {
    try {
      const defaultPassword = envConfig.DEFAULT_PASSWORD || "";
      if (!body.companySlug) throw new Error("No dbName ");
      const isValidDb = await this.companyDbService.checkExistingDb(
        body.companySlug
      );
      if (!isValidDb) throw new Error("Invalid db");
      const response = await this.adminRequestsRepository.requestApprovel(body);
      if (response.isApproved) {
        await this.emailService.sendMail({
          to: response.email,
          subject: "Welcome to FlowLabs! Your Company is Approved ",
          body: APPROVED_EMAIL_BODY(
            body.companySlug,
            response.companyName,
            defaultPassword
          ),
        });
      } else {
        await this.adminDbService.dropDatabase(body.companySlug)
        await this.emailService.sendMail({
          to: response.email,
          subject:
            "Important Update: Your FlowLabs Company Registration Request",
          body: DECLINE_EMAIL_BODY(response.companyName),
        });
      }
    } catch (error) {
      throw error;
    }
  }
}
