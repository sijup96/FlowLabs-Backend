import { NextFunction, Request, Response } from "express";
import { IAdminUseCase } from "../../../interface/admin/IAdmin.useCase";
import { TOKEN_NAME } from "../../../shared/constants";

export class AdminAuthController {
  constructor(private adminUseCase: IAdminUseCase) {
    this.adminUseCase = adminUseCase;
  }
  public async adminLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.adminUseCase.login(req.body);
      if (response.refreshToken) {
        res.cookie(TOKEN_NAME.adminRefreshToken, response.refreshToken, {
          httpOnly: true,
          sameSite: "lax",
          secure: false,
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
      }
      if (response.accessToken) {
        res.cookie(TOKEN_NAME.adminAccessToken, response.accessToken, {
          httpOnly: true,
          sameSite: "lax",
          secure: false,
          maxAge: 15 * 60 * 1000, // 15 minutes
        });
      }
      return res
        .status(200)
        .json({ success: true, accessToken: response.accessToken });
    } catch (error) {
      next(error);
    }
  }
  public async getUserRequests(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data = await this.adminUseCase.getUserRequests();
      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }
  public async approvelRequest(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      await this.adminUseCase.requestApproval(req.body);
      res.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  }
}
