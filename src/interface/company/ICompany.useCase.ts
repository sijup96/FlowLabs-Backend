import { IPayload } from "../service/I_jwtService";
import { ICompanyDocument } from "./ICompany.document";
import { ILoginProps } from "./ICompany.repository";

export interface ICompanyUpdateProps {
  phone?: string;
  description?: string;
  foundedDate?: Date;
  logo?: string;
  password?: string;
}
export interface ICompanyUseCase {
  login(body: ILoginProps): Promise<{
    refreshToken: string;
    accessToken: string;
    isFirstTime: boolean;
  }>;
  resetPassword(
    body: { password: string; domainName: string },
    user: IPayload
  ): Promise<void>;
  getCompanyInfo(user: IPayload): Promise<ICompanyDocument>;
  updateCompanyInfo(body: ICompanyUpdateProps, user: IPayload): Promise<void>;
  uploadLogo(file:Express.Multer.File, user: IPayload): Promise<void>;
}
