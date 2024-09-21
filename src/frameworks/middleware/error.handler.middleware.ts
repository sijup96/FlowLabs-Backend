import { NextFunction, Request, Response } from "express";
import { ValidationError } from "../../shared/utils/customError";

export const errorHandler =(err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ValidationError) {
        return res.status(err.statusCode).json({
            message: err.message,
            errors: err.errorObject,
        });
    }

    // Fallback for other errors
    res.status(500).json({
        message: 'Internal Server Error',
        error: err.message,
    })
}