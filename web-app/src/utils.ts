import { NextRequest } from 'next/server';
import { config } from './config';

export function hasAuthTokens(request: NextRequest): boolean {
    const refreshToken = request.cookies.get(config.refreshTokenName)?.value;
    return !!refreshToken;
}
