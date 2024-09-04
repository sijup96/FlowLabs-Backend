import { OtpEntities } from "../../entity/otp.entity";


export interface IOtpRepository {
    saveOtp(otp: OtpEntities): Promise<OtpEntities>;
    verifyOtp(email: string, otp: string): Promise<OtpEntities | null>
}