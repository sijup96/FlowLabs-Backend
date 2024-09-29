export class ValidationError extends Error {
    public statusCode: number;
    public errorObject: { [key: string]: string };

    constructor(message: string, errorObject: { [key: string]: string }, statusCode: number = 400) {
        super(message);
        this.name = 'ValidationError';
        this.statusCode = statusCode;
        this.errorObject = errorObject;
        Error.captureStackTrace(this, this.constructor);
    }
}
