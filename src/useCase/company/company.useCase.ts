import {
  ICompanyRepository,
  ILoginProps,
} from "../../interface/company/ICompany.repository";
import { ICompanyUseCase } from "../../interface/company/ICompany.useCase";
import { ICompanyDbService } from "../../interface/service/I_dbService";
import { IJwtService } from "../../interface/service/I_jwtService";
import { envConfig } from "../../shared/config/env.config";
import { ROLE } from "../../shared/constants";
import bcrypt from 'bcrypt';

export class CompanyUseCase implements ICompanyUseCase {
  constructor(
    private companyDbService: ICompanyDbService,
    private companyRepository: ICompanyRepository,
    private jwtService:IJwtService
  ) {}
  public async login(body: ILoginProps): Promise<{refreshToken:string,accessToken:string,isFirstTime:boolean}> {
    try {
      const connection = await this.companyDbService.getConnection(
        body.domainName
      );
      if (!connection) throw new Error("Invalid URL");
      const companyData = await this.companyRepository.login(connection, body);
      if (!companyData) throw new Error("Invalid Credential");
      let isFirstTime = false;
      if (body.password === envConfig.DEFAULT_PASSWORD) isFirstTime = true;
      const userId=""+companyData._id
      const refreshToken=await this.jwtService.generateRefreshToken(userId,companyData.email,ROLE.company)
      const accessToken=await this.jwtService.generateAccessToken(userId,companyData.email,ROLE.company)
      return {refreshToken:refreshToken,accessToken:accessToken, isFirstTime };
    } catch (error) {
        console.log(error)
      throw error;
    }
  }
  public async resetPassword(body:{password:string,domainName:string,email:string}):Promise<void>{
    try {
        console.log(body)
        const connection=await this.companyDbService.getConnection(body.domainName);
        if(!connection) throw new Error('Invalid URL');
        const hashedPassword=await bcrypt.hash(body.password, 10);
        await this.companyRepository.resetPassword(connection,{hashedPassword:hashedPassword,email:body.email})
    } catch (error) {
        throw error
    }
  }
}
