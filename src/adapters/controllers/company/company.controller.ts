import { NextFunction, Request, Response } from "express";
import { ICompanyUseCase } from "../../../interface/company/ICompany.useCase";
import { TOKEN_NAME } from "../../../shared/constants";

export class CompanyController {
  constructor(private companyUseCase: ICompanyUseCase) {}
  public async login(
    req: Request<{ domainName: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await this.companyUseCase.login(req.body);
      if (!response.refreshToken) throw new Error("No refreshToken");
      res.cookie(TOKEN_NAME.refreshToken, response.refreshToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
      });
      if (!response.accessToken) throw new Error("No accessToken");
      res.setHeader("Authorization", `Bearer ${response.accessToken}`);
      res.status(200).json({ isFirstTime: response.isFirstTime });
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
      const accessToken = req.headers.authorization?.split(" ")[1];
      if(!accessToken)return res.status(401).json({message:'No accessToken'})
      console.log(accessToken);
      await this.companyUseCase.resetPassword(req.body);
      res.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  }
}
