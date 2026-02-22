import { NextResponse, NextRequest } from 'next/server'
import { hasAuthTokens } from './utils';
import { routePaths, config as appConfig } from './config';

function hasAdminSession(request: NextRequest): boolean {
  return request.cookies.get('admin_session')?.value === '1';
}

export default function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl
    const isAuthPage = pathname.startsWith('/auth')
    const isAdminLoginPage = pathname === '/admin/login'
    const isAdminPage = pathname.startsWith('/admin') && !isAdminLoginPage
    const isAuthenticated = hasAuthTokens(request);
    const isAdminAuthed = hasAdminSession(request);

    // Admin login page — redirect to admin portal if already authed
    if (isAdminLoginPage) {
        if (isAdminAuthed) {
            return NextResponse.redirect(new URL('/admin', request.url))
        }
        return NextResponse.next()
    }

    // Admin portal pages — require admin_session cookie
    if (isAdminPage) {
        if (!isAdminAuthed) {
            return NextResponse.redirect(new URL('/admin/login', request.url))
        }
        return NextResponse.next()
    }

    // Regular auth pages (login/register) — redirect away if already authed
    if (isAuthPage) {
        if (isAuthenticated) {
            return NextResponse.redirect(new URL('/', request.url))
        }
        return NextResponse.next()
    }

    // All other pages — require user auth
    if (!isAuthenticated) {
        const url = new URL(routePaths.login, request.url);
        url.searchParams.set(appConfig.callbackUrlName, request.nextUrl.pathname + request.nextUrl.search);
        return NextResponse.redirect(url);
    }
    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)',
    ],
}
