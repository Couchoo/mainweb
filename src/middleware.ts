
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // 1. Detect locale from cookie or headers
    const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
    let locale = cookieLocale || 'bg';

    if (!cookieLocale) {
        const acceptLanguage = request.headers.get('accept-language');
        if (acceptLanguage) {
            // Simple logic: if 'en' is preferred more than 'bg'
            const enRank = acceptLanguage.indexOf('en');
            const bgRank = acceptLanguage.indexOf('bg');

            if (enRank !== -1 && (bgRank === -1 || enRank < bgRank)) {
                locale = 'en';
            }
        }
    }

    // 2. Pass the locale to the request headers so it can be read in Server Components
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-locale', locale);

    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });

    // 3. Set a cookie for client-side persistence if not already there
    if (!request.cookies.has('NEXT_LOCALE')) {
        response.cookies.set('NEXT_LOCALE', locale, { path: '/' });
    }

    // 4. Add security headers for Fullscreen and other features
    response.headers.set(
        'Permissions-Policy',
        'fullscreen=*, autoplay=*, picture-in-picture=*, encrypted-media=*'
    );

    return response;
}

export const config = {
    matcher: [
        // Skip all internal paths (_next, api, static files)
        '/((?!_next|api|.*\\..*).*)',
    ],
};
