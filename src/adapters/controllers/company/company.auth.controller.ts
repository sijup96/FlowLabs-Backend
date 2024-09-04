import { NextFunction, Request, Response } from 'express';
import { IGenerateOtpUseCase } from '../../../interface/company/ICompany.signUp';

export class CompanyAuthController {
    constructor(private companySignUpUseCase: IGenerateOtpUseCase) { }
    public async generateOtp(req: Request<{}, {}, { email: string }, {}>, res: Response, next: NextFunction): Promise<void> {
        try {
            await this.companySignUpUseCase.generateOtp(req.body)
            res.status(200).json({success:true})
        } catch (error) {
            next(error)
        }
    }
}