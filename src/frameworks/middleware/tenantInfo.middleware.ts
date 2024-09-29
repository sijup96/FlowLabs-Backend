import { NextFunction, Request, Response } from "express";

export const tenantInfoMiddleware=(req:Request,res:Response,next:NextFunction)=>{
    try {
        const tenantId=req.headers['x-tenant-id']as string;
        const domain=req.headers['x-domain']as string;
    } catch (error) {
        
    }
}