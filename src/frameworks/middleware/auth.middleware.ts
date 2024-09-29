import { NextFunction, Request, Response } from "express";
import { IJwtService } from "../../interface/service/I_jwtService";
import { ROLE, TOKEN_NAME } from "../../shared/constants";
import { ValidationError } from "../../shared/utils/customError";


export class AuthMiddleware{
    constructor(private jwtService:IJwtService){
        this.jwtService=jwtService;
    }
   public async authenticateAdmin(req:Request,res:Response,next:NextFunction){
        try {
            const {adminJWT}=req.cookies
            if(!adminJWT) throw new Error("No Token")
                const payload=await this.jwtService.verifyJwtToken(adminJWT)
            if(payload && payload.role===ROLE.admin) return next()
                throw new Error('Invalid Token')

        } catch (error) {
            next(error)
        }
    }
    public async validateToken(req:Request,res:Response,next:NextFunction){
        try {
            const refreshToken = req.cookies[TOKEN_NAME.refreshToken];
        if (!refreshToken) {
            return res.status(403).json({ message: 'No refresh token provided' });
        }
        const {userId,email,role} = await this.jwtService.verifyJwtToken(refreshToken);

        // Generate a new access token
        const newAccessToken = await this.jwtService.generateAccessToken(userId,email,role);

        // Send the new access token in the response
        return res.status(200).json({ accessToken: newAccessToken }); 
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    public async authUser(req:Request,res:Response,next:NextFunction){
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                return res.status(401).json({ message: "No token provided" });
              }
              const token = authHeader.split(" ")[1];
              const decodedToken = await this.jwtService.verifyJwtToken(token);
              req.user = decodedToken;
              next();

        } catch (error) {
            next(error)
        }
    }
}