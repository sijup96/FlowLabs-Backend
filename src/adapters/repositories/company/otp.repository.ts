import { IOtpRepository } from "../../../interface/company/IOtp.repository";
import { OtpEntities } from "../../../entity/otp.entity";
import RedisClient from "../../../frameworks/database/redis/redisClient";


export class OtpRepository implements IOtpRepository {
    private readonly redisPrefix = 'otp:';
    private redisClient = RedisClient.getInstance();

    async saveOtp(otp: OtpEntities): Promise<OtpEntities> {
        const key = this.redisPrefix + otp.email;
        const otpData = JSON.stringify({
            otp: otp.otp,
            createdAt: otp.createdAt.toISOString(),
            expiresAt: otp.expiresAt.toISOString(),
            isUsed: otp.isUsed
        });

        const ttl = Math.floor((otp.expiresAt.getTime() - Date.now()) / 1000);

        if (ttl > 0) {
            await this.redisClient.set(key, otpData, 'EX', ttl);
        } else {
            console.warn(`TTL for OTP ${key} is non-positive.`);
        }
        return otp;
    }

    async verifyOtp(email: string, otp: string): Promise<OtpEntities | null> {
        const key = this.redisPrefix + email;
        const data = await this.redisClient.get(key);

        if (data) {
            const { otp: storedOtp, expiresAt, isUsed } = JSON.parse(data);
            const otpEntity = new OtpEntities(email, storedOtp);
            otpEntity.expiresAt = new Date(expiresAt);
            otpEntity.isUsed = isUsed;

            if (storedOtp == otp && !otpEntity.isExpired() && !otpEntity.isUsed) {
                return otpEntity;
            }
        }
        return null;
    }
}