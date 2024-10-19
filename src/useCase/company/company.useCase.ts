import { ICompanyDocument } from "../../interface/company/ICompany.document";
import {
  ICompanyRepository,
  ILoginProps,
} from "../../interface/company/ICompany.repository";
import {
  ICompanyUpdateProps,
  ICompanyUseCase,
} from "../../interface/company/ICompany.useCase";
import { ICompanyDbService } from "../../interface/service/I_dbService";
import { IJwtService, IPayload } from "../../interface/service/I_jwtService";
import { envConfig } from "../../shared/config/env.config";
import { ROLE, S3_BUCKET_IMAGE_URL } from "../../shared/constants";
import bcrypt from "bcrypt";
import { validateFields } from "../../shared/utils/validation";
import { I_S3Bucket } from "../../interface/service/I_s3BucketService";
import { CustomError } from "../../shared/utils/customError";

export class CompanyUseCase implements ICompanyUseCase {
  constructor(
    private companyDbService: ICompanyDbService,
    private companyRepository: ICompanyRepository,
    private jwtService: IJwtService,
    private s3Bucket:I_S3Bucket
  ) {}
  public async login(body: ILoginProps): Promise<{
    refreshToken: string;
    accessToken: string;
    isFirstTime: boolean;
  }> {
    try {
      const connection = await this.companyDbService.getConnection(
        body.domainName
      );
      if (!connection) throw new Error("Invalid URL");
      const companyData = await this.companyRepository.login(connection, body);
      if (!companyData) throw new Error("Invalid Credential");
      let isFirstTime = false;
      if (body.password === envConfig.DEFAULT_PASSWORD) isFirstTime = true;
      const data = {
        userId: "" + companyData._id,
        email: companyData.email,
        role: ROLE.hr,
        domainName: body.domainName,
      };
      const refreshToken = await this.jwtService.generateRefreshToken(data);
      const accessToken = await this.jwtService.generateAccessToken(data);
      return {
        refreshToken: refreshToken,
        accessToken: accessToken,
        isFirstTime,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  public async resetPassword(
    body: { password: string; domainName: string },
    user: IPayload
  ): Promise<void> {
    try {
      if (!user.domainName) throw new Error("Domain Name is not found");
      const connection = await this.companyDbService.getConnection(
        user.domainName
      );
      if (!connection) throw new Error("Invalid dbName");
      const hashedPassword = await bcrypt.hash(body.password, 10);
      await this.companyRepository.resetPassword(connection, {
        hashedPassword: hashedPassword,
        userId: user.userId,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  public async getCompanyInfo(user: IPayload): Promise<ICompanyDocument> {
      if (!user.domainName) throw new Error("Domain Name is not found");
      const connection = await this.companyDbService.getConnection(
        user.domainName
      );
      if (!connection) throw new Error("Invalid dbName");
      const companyData = await this.companyRepository.getCompanyInfo(
        connection,
        user.userId
      );
      if (!companyData) throw new Error("company data not found");
      return companyData;
  }
  public async updateCompanyInfo(
    body: ICompanyUpdateProps,
    user: IPayload
  ): Promise<void> {
    try {
      const { errors, isValid } = validateFields(body);
      if (!isValid) throw validateFields(errors);
      if (!user.domainName) throw new Error("Domain Name is not found");
      const connection = await this.companyDbService.getConnection(
        user.domainName
      );
      if (!connection) throw new Error("Invalid dbName");
      await this.companyRepository.updateCompanyInfo(connection, body, user);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  public async uploadLogo(file:Express.Multer.File,user:IPayload):Promise<void>{
      if(!user.domainName) throw new CustomError('Domain name not found',{dbError:'No domain name'},400)
      const imageName=`logo-${user.domainName}`
      const contentType=file.mimetype
      await this.s3Bucket.uploadCompanyLogo(imageName,file.buffer,contentType)
      const imageUrl=`${S3_BUCKET_IMAGE_URL}/company_logo/logo-broto`
      const connection=await this.companyDbService.getConnection(user.domainName)
      if(!connection) throw new CustomError('Connection Error',{},400)
      await this.companyRepository.updateCompanyLogo(connection,imageUrl,user)
  }
}
