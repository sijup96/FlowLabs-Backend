import { Connection } from "mongoose";
import { CompanyEntity } from "../../entity/company.entity";
import { ICompanyDocument } from "./ICompany.document";

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
    body: { hashedPassword: string; email: string }
  ): Promise<void>;
}
