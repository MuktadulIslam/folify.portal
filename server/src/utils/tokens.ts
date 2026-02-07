import jwt from 'jsonwebtoken';
import { Response } from 'express';
import { env } from '../config/env.js';

export function generateAccessToken(userId: string): string {
    return jwt.sign({ userId }, env.JWT_ACCESS_SECRET, {
        expiresIn: env.JWT_ACCESS_EXPIRES_IN,
    });
}

export function generateRefreshToken(userId: string): string {
    return jwt.sign({ userId }, env.JWT_REFRESH_SECRET, {
        expiresIn: env.JWT_REFRESH_EXPIRES_IN,
    });
}

export function setTokenCookies(
    res: Response,
    accessToken: string,
    refreshToken: string
): void {
    const isProduction = process.env.NODE_ENV === 'production';

    res.cookie('access_token', accessToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: 'lax',
        maxAge: 15 * 60 * 1000, // 15 minutes
        path: '/',
    });

    res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        path: '/',
    });
}

export function clearTokenCookies(res: Response): void {
    res.clearCookie('access_token', { path: '/' });
    res.clearCookie('refresh_token', { path: '/' });
}
