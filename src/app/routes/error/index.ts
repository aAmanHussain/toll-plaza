import { HttpCodes } from './../../../models/http-codes.model';
import { Router, Request, Response, NextFunction } from 'express';

export const router = Router();

router.get('/health-check', async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.status(HttpCodes.ok).json({
            result: null,
            message: 'Error Router health check is working fine'
        });
    } catch ({ status, message }) {
        return res.status(status).json({
            result: null,
            message
        });
    }
});

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.redirect(`/api/error/${HttpCodes.notFound}`);
    } catch ({ status, message }) {
        return res.status(status).json({
            result: null,
            message
        });
    }
});

router.get('/:code', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const isValidCode = Object.values(HttpCodes).some(code => code === Number(req.params.code));
        const status = isValidCode ? Number(req.params.code) : HttpCodes.notFound;
        return res.status(status).json({
            result: null,
            message: 'Some error occured'
        });
    } catch ({ status, message }) {
        return res.status(status).json({
            result: null,
            message
        });
    }
});