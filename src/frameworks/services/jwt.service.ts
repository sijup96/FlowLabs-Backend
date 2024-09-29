import jwt from "jsonwebtoken";
import { envConfig } from "../../shared/config/env.config";
import { IJwtService, IPayload } from "../../interface/service/I_jwtService";

export class JwtService implements IJwtService {
  public async generateRefreshToken(
    userId: string,
    email: string,
    role: string
  ): Promise<string> {
    const secretKey = envConfig.JWT_SECRETKEY || "";
    const payload = { userId, email, role };
    const token = jwt.sign(payload, secretKey, { expiresIn: "3d" });
    return token;
  }
  public async verifyJwtToken(token: string): Promise<IPayload> {
    try {
      const secretKey = envConfig.JWT_SECRETKEY || "";
      const decoded = jwt.verify(token, secretKey) as IPayload;
      return decoded;
    } catch (error) {
      throw new Error("Invalid token");
    }
  }
  public async generateAccessToken(
    userId: string,
    email: string,
    role: string
  ): Promise<string> {
    return jwt.sign({ userId, email,role }, envConfig.JWT_SECRETKEY || "", {
      expiresIn: "15m",
    });
  }
}
