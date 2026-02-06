import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();
    const { method, path } = req;
    const timestamp = new Date().toISOString();

    res.on('finish', () => {
        const duration = Date.now() - start;
        logger.info(`[${timestamp}] ${method} ${path} - ${res.statusCode} (${duration}ms)`);
    });

    next();
};
