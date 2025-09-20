import { Router, Request, Response } from 'express';

const router = Router();

/**
 * healthz
 * Returns 200 OK when the service is healthy.
 */
export async function healthz(_req: Request, res: Response) {
    res.status(200).json({
        status: 'ok',
    });
}
