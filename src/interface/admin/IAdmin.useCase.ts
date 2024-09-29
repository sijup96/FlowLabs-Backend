import { IAdminLoginCredentials } from "./IAdmin.credentials";

export interface IRequestApprovelProps {
    companySlug: string;
  isApproved: boolean;
}

export interface IAdminUseCase {
  login(loginCredentials: IAdminLoginCredentials): Promise<string>;
  getUserRequests(): Promise<Record<string, unknown[]> | null>;
  requestApproval(body: IRequestApprovelProps): Promise<void>;
}
