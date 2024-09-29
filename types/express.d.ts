// types/express.d.ts
import { JwtPayload } from "jsonwebtoken"; // Import the type you expect from JWT

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload | string; // Adjust this type as needed (JwtPayload or string)
    }
  }
}
