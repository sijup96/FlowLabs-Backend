import { NextFunction, Request, Response } from "express";
import { IJwtService, IPayload } from "../../interface/service/I_jwtService";
import { ROLE, TOKEN_NAME } from "../../shared/constants";
import { CustomError } from "../../shared/utils/customError";

export class AuthMiddleware {
  constructor(private jwtService: IJwtService) {
    this.jwtService = jwtService;
  }

  public async isAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken = req.cookies[TOKEN_NAME.adminAccessToken];
      if (!accessToken)
        throw new CustomError(
          "Token error",
          { message: "adminAccessTokenError" },
          401
        );
      const decodedToken = await this.jwtService.verifyJwtToken(accessToken);
      if (decodedToken.role !== "admin")
        throw new CustomError("Access forbidden", { error: "Not admin" }, 400);
      req.user = decodedToken;
      next();
    } catch (error) {
      next(error);
    }
  }

  public async getAdminAccessToken(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const refreshToken = req.cookies[TOKEN_NAME.adminRefreshToken];
      if (!refreshToken)
        throw new CustomError(
          "adminTokenError",
          { token: "Refresh token not found." },
          403
        );
      const decoded = await this.jwtService.verifyJwtToken(refreshToken);
      // Generate a new access token
      const newAccessToken = await this.jwtService.generateAccessToken(decoded);
      res.cookie(TOKEN_NAME.adminAccessToken, newAccessToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 15 * 60 * 1000, // 15 minutes
      });
      return res.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  }
  public async isHR(req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken = req.cookies[TOKEN_NAME.hrAccessToken]
      if (!accessToken)
        throw new CustomError(
          "Token error",
          { message: "hrAccessTokenError" },
          401
        );
      const decoded = await this.jwtService.verifyJwtToken(accessToken);
      if (decoded.role === ROLE.hr){
        req.user=decoded
        next();
      } 
      else
        throw new CustomError(
          "Validation Error",
          { message: "Access forbidden" },
          400
        );
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  public async getHrAccessToken(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const refreshToken = req.cookies[TOKEN_NAME.hrRefreshToken];
      if (!refreshToken)
        throw new CustomError(
          "hrTokenError",
          { token: "Refresh token not found." },
          403
        );
        const decoded = await this.jwtService.verifyJwtToken(refreshToken);
        if (!decoded) {
          throw new CustomError(
            "hrTokenError",
            { token: "Refresh token not valid." },
            403
          );
        }
      const newAccessToken = await this.jwtService.generateAccessToken(decoded);
      res.cookie(TOKEN_NAME.hrAccessToken, newAccessToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 15 * 60 * 1000, // 15 minutes
      });
      return res.status(200).json({ domain: decoded.domainName });
    } catch (error:any) {
      if (error.name === "TokenExpiredError") {
        // Handle token expiration
        return next(
          new CustomError(
            "hrTokenError",
            { token: "Refresh token has expired." },
            403
          )
        );
      }
      next(error);
    }
  }
  public async getDomainName(req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken = req.cookies[TOKEN_NAME.hrAccessToken];
      if (!accessToken)    throw new CustomError(
        "Token error",
        { message: "hrAccessTokenError" },
        401
      );
      const { domainName } = await this.jwtService.verifyJwtToken(accessToken);
      return res.status(200).json({ domainName: domainName });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
