export class CompanyEntity {
  constructor(
    public companyName: string,
    public companySlug: string,
    public industry: string,
    public phone: string,
    public email: string,
    public password: string,
    public logo?: string,
    public description?: string,
    public domain?: string,
    public orderNo?: string,
    public orderDate?: Date,
    public plan: string = "Trail",
    public serviceStatus: string = "Active",
    public paymentId?: string,
    public isApproved?: string,
    public createdAt: Date = new Date(),
    public expiryDate?: Date,
    public updatedAt: Date = new Date()
  ) {
    this.expiryDate =
      expiryDate || new Date(+new Date() + 30 * 24 * 60 * 60 * 1000); // 30 days from now
  }
}
