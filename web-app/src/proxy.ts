import { NextResponse, NextRequest } from 'next/server'
import { hasAuthTokens } from './utils';
import { routePaths, config as appConfig } from './config';


export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl

    // console.log('Middleware triggered for path:', pathname);

    // Check if current path is an auth page or the registration page
    const isAuthPage = pathname.startsWith('/accounts') || pathname.startsWith('/efd6ed607a77d2c8173')
    const isAuthenticated = hasAuthTokens(request);
    // console.log('Refresh Token:', isAuthenticated);
    // console.log('Isauthpage:', isAuthPage);

    if (isAuthPage) {
        if (isAuthenticated) {
            return NextResponse.redirect(new URL('/', request.url))
        }
        return NextResponse.next()
    }
    else {
        if (!isAuthenticated) {
            const url = new URL(routePaths.login, request.url);
            url.searchParams.set(appConfig.callbackUrlName, request.nextUrl.pathname + request.nextUrl.search);
            return NextResponse.redirect(url);
        }
        return NextResponse.next()
    }
}

export const config = {
    // Protect all routes except the excluded ones
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)',
        /*
         * Match all request paths except for the ones starting with:
         * - api/auth (authentication API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public/ (public files)
         * - images/, img/, assets/, fonts/ (static assets)
         * - any file with extensions like .ico, .png, .jpg, .jpeg, .svg, .gif, .webp, .css, .js, .woff, .woff2, .ttf, .eot, .json
         */
    ],
}