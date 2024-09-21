import { CompanyEntity } from "../../entity/company.entity";

export interface ICompanySignUpOtp extends CompanyEntity {
    password: string;
    otp: string;
}
export interface ICompanySignUpUseCase {
    generateOtp(data: { email: string }): Promise<void>;
    signUp(signUpData: CompanyEntity): Promise<void>;
    googleAuth(signUpData: CompanyEntity): Promise<void>;
}
export interface ICompanyGoogleSignUp extends CompanyEntity {
    isGoogleSignUp: boolean;
    tokenResponse: {
        access_token: string;
    }
}
export interface IGoogleUser {
    email: string;
    name?: string;
}