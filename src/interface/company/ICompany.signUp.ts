import { CompanyEntity } from "../../entity/company.entity";

export interface ICompanySignUp extends CompanyEntity {
    otp: string;
}
export interface IGenerateOtpUseCase {
    generateOtp(data:{email:string}):Promise<void>;
}