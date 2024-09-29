export interface IPayload {
  userId: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export interface IJwtService {
  generateRefreshToken(
    userId: string,
    email: string,
    role: string
  ): Promise<string>;
  generateAccessToken(
    userId: string,
    email: string,
    role: string
  ): Promise<string>;
  verifyJwtToken(token: string): Promise<IPayload>;
}
