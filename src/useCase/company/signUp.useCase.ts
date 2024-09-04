import { CompanyEntity } from "../../entity/company.entity";
import { OtpEntities } from '../../entity/otp.entity';
import { generateOtpCode } from "../../frameworks/services/generateOtp.service";
import { ICompanySignUp } from "../../interface/company/ICompany.signUp";
import { IOtpRepository } from "../../interface/company/IOtp.repository";
import { ValidationError } from "../../shared/utils/customError";
import bcrypt from 'bcrypt';
import { EmailService } from '../../frameworks/services/email.service';
import ICompanyRepository from "../../interface/company/ICompany.repository";


export class CompanySignUpUseCase {

    constructor(
        private otpRepository: IOtpRepository,
        private companyRepository: ICompanyRepository,
        private emailservice: EmailService
    ) {
        this.otpRepository = otpRepository;
        this.companyRepository = companyRepository;
    }
    public async generateOtp(data:{email:string}): Promise<void> {
        try {
            const {email} = data;
            const otpCode = generateOtpCode()
            const otp = new OtpEntities(email, otpCode)
            await this.otpRepository.saveOtp(otp);
            await this.emailservice.sendMail({
                to: email,
                subject: 'Flow Labs OTP',
                body: ` <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
        <h2 style="color: #007BFF;">Verify Your Email</h2>
        <p>Please use the following OTP to verify your email:</p>
        <div style="background-color: #f0f0f0; padding: 10px; border-radius: 5px; margin-bottom: 20px;">
            <h3 style="margin: 0; color: #007BFF;">${otpCode}</h3>
        </div>
        <p>This OTP is valid for a short period. Do not share it with anyone.</p>
        <p>If you did not request this verification, please ignore this email.</p>
        <P style="color: #007BFF;">From Flow Labs </p>
    </div>`
            });
        } catch (error) {
            throw error
        }
    }
    public async validateOtp(email: string, otpCode: string): Promise<boolean> {
        const otp = await this.otpRepository.verifyOtp(email, otpCode);
        if (otp && !otp.isExpired() && !otp.isUsed) {
            otp.markAsUsed();
            return true;
        }
        return false;
    }
    async signUp(reqBody: ICompanySignUp): Promise<void> {
        try {
            const { firstName, lastName, email, companyName, password, phone, otp } = reqBody;
            const errorObject: { [key: string]: string } = {};
            const existingUser = await this.companyRepository.findByEmail(email);
            if (existingUser) errorObject.emailError = 'Company already exists.';
            const isOtpVerified = await this.otpRepository.verifyOtp(email, otp);

            if (!isOtpVerified) errorObject.otpError = 'OTP verification failed.';
            if (Object.keys(errorObject).length > 0) throw new ValidationError('Validation Error', errorObject, 400);

            const hashedPassword = await bcrypt.hash(password, 10);
            const userData = new CompanyEntity(
                firstName,
                lastName,
                phone,
                companyName,
                email,
                hashedPassword
            );
            const newUser = await this.companyRepository.save(userData)
            console.log('newUser', newUser);
        } catch (error) {
            throw error
        }
    }
}