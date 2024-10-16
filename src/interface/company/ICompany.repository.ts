import { Connection } from "mongoose";
import { CompanyEntity } from "../../entity/company.entity";
import { ICompanyDocument } from "./ICompany.document";
import { ICompanyUpdateProps } from "./ICompany.useCase";
import { IPayload } from "../service/I_jwtService";

export interface ILoginProps {
  email: string;
  password: string;
  domainName: string;
}

export interface ICompanyRepository {
  save(CompanyData: CompanyEntity): Promise<void>;
  findByCompanyName(companyName: string): Promise<CompanyEntity | null>;
  isExistingCompany(companyName: string): Promise<boolean>;
  login(
    connection: Connection,
    body: ILoginProps
  ): Promise<ICompanyDocument | null>;
  resetPassword(
    connection: Connection,
    body: { hashedPassword: string; userId: string }
  ): Promise<void>;
  getCompanyInfo(
    connection: Connection,
    userId: string
  ): Promise<ICompanyDocument>;
  updateCompanyInfo(connection:Connection,body:ICompanyUpdateProps,user:IPayload):Promise<void>
  updateCompanyLogo(connection:Connection,imageUrl:string,user:IPayload):Promise<void>
}
