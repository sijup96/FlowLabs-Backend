import { NextFunction, Request, Response } from "express";
import { ICompanyUseCase } from "../../../interface/company/ICompany.useCase";
import { TOKEN_NAME } from "../../../shared/constants";
import { IJwtService, IPayload } from "../../../interface/service/I_jwtService";
import { CustomError } from "../../../shared/utils/customError";

export class CompanyController {
  constructor(
    private companyUseCase: ICompanyUseCase,
    private jwtService: IJwtService
  ) {}
  public async login(
    req: Request<{ domainName: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await this.companyUseCase.login(req.body);
      if (response.refreshToken)
        res.cookie(TOKEN_NAME.hrRefreshToken, response.refreshToken, {
          httpOnly: true,
          sameSite: "lax",
          secure: false,
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
      if (response.accessToken) {
        res.cookie(TOKEN_NAME.hrAccessToken, response.accessToken, {
          httpOnly: true,
          sameSite: "lax",
          secure: false,
          maxAge: 15 * 60 * 1000, // 15 minutes
        });
      }
      return res.status(200).json({ isFirstTime: response.isFirstTime });
    } catch (error) {
      next(error);
    }
  }
  public async companyPasswordReset(
    req: Request<{ domainName: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user=req.user as IPayload
      await this.companyUseCase.resetPassword(req.body, user);
      res.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  }
  public async getCompanyInfo(req: Request, res: Response, next: NextFunction) {
try {
  const companyData = await this.companyUseCase.getCompanyInfo(req.user as IPayload);
  res.status(200).json({ companyData });
} catch (error) {
  next(error)
}
  }
  public async updateCompanyInfo(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {

      await this.companyUseCase.updateCompanyInfo(req.body, req.user as IPayload);
      res.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  }
  public async uploadLogo(req:Request,res:Response,next:NextFunction){
    try {
      const user=req.user as IPayload
      if(!req.file) throw new CustomError('No file',{file:'not found'},400)
      await this.companyUseCase.uploadLogo(req.file,user)
    res.status(200).json({success:true})
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
  async logout(req:Request,res:Response,next:NextFunction){
    try {
      res.clearCookie(TOKEN_NAME.hrAccessToken)
      res.clearCookie(TOKEN_NAME.hrRefreshToken)
      return res.status(200).json({message:'Logout successful'})
    } catch (error) {
      next(error)
    }
  }
}
