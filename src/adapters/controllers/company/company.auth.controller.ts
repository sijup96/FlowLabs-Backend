import { NextFunction, Request, Response } from 'express';
import { ICompanySignUpUseCase } from '../../../interface/company/ICompany.signUp';

export class CompanyAuthController {
    constructor(private companySignUpUseCase: ICompanySignUpUseCase) { }
    public async generateOtp(req: Request<{}, {}, { email: string }, {}>, res: Response, next: NextFunction): Promise<void> {
        try {
            await this.companySignUpUseCase.generateOtp(req.body)
            res.status(200).json({ success: true })
        } catch (error) {
            next(error)
        }
    }
    public async companySignUp(req: Request, res: Response, next: NextFunction) {
        try {
            await this.companySignUpUseCase.signUp(req.body);
            res.status(200).json({ success: true })
        } catch (error) {
            next(error)
        }
    }
    public async companyGoogleSignUp(req: Request, res: Response, next: NextFunction) {
        try {
            await this.companySignUpUseCase.googleAuth(req.body);
            res.status(200).json({ success: true })
        } catch (error) {
            next(error)
        }
    }
}