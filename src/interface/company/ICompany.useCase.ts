import { ILoginProps } from "./ICompany.repository";

export interface ICompanyUseCase {
  login(
    body: ILoginProps
  ): Promise<{
    refreshToken: string;
    accessToken: string;
    isFirstTime: boolean;
  }>;
  resetPassword(body: {
    password: string;
    domainName: string;
    email: string;
  }): Promise<void>;
}
