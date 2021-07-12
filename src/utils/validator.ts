import { HttpCodes } from './../models/http-codes.model';
import { Request, NextFunction, Response } from 'express';
export const isValid = async ({ body = {} }: Request, res: Response, next: NextFunction, schema: any) => {
    return () => {
        try {
            const keys = Object.keys(schema);
            const valid = keys.every(key => body[key]);
            if (!valid) {
                throw new Error('Request body is not valid')
            }
    
            return next();
        } catch (ex) {
            return res.status(HttpCodes.badRequest).json({
                result: null,
                message: ex.message || `Bad Request`
            })
        }
    }
}