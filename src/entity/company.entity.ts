export class CompanyEntity{
    constructor(
        public firstName: string,
        public lastName: string,
        public phone: string,
        public companyName: string,
        public email: string,
        public password: string,
        public domain?: string,
        public orderNo?: string,
        public orderDate?: Date,          
        public plan: string = "Basic",
        public serviceStatus: string = "Active",
        public paymentId?: string,
        public isApproved: boolean = false,
        public createdAt: Date = new Date(),
        public expiryDate?: Date,
        public updatedAt: Date = new Date()
    ) {
        this.expiryDate = expiryDate || new Date(+new Date() + 30*24*60*60*1000); // 30 days from now
    } 
}