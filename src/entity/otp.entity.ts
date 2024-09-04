export class OtpEntities {
    public readonly email: string;
    public readonly otp: string;
    public readonly createdAt: Date;
    public expiresAt: Date;
    public isUsed: boolean;

    constructor(email: string, otp: string, expiresInMinutes: number = 10, isUsed: boolean = false) {
        this.email = email;
        this.otp = otp;
        this.createdAt = new Date();
        this.expiresAt = new Date(this.createdAt.getTime() + expiresInMinutes * 60000);
        this.isUsed = isUsed;
    }

    public isExpired(): boolean {
        return new Date() > this.expiresAt;
    }

    public markAsUsed(): void {
        this.isUsed = true;
    }
}
