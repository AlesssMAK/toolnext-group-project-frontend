import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'cookie';
import { checkServerSession } from './lib/api/serverApi';

const privateRoutes = ['/profile', '/manage-tools', '/confirm/booking'];
const authRoutes = ['/auth/login', '/auth/register'];

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some(
    route => pathname === route || pathname.startsWith(`${route}/`)
  );

  const redirectToLogin = () => {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('next', pathname + search);
    return NextResponse.redirect(loginUrl);
  };

  if (!accessToken) {
    if (refreshToken) {
      try {
        const data = await checkServerSession();
        const setCookie = data.headers?.['set-cookie'];

        if (setCookie) {
          const response = NextResponse.next();
          const cookieArray = Array.isArray(setCookie)
            ? setCookie
            : [setCookie];

          for (const cookieStr of cookieArray) {
            const parsedCookie = parse(cookieStr);

            const options = {
              expires: parsedCookie.Expires
                ? new Date(parsedCookie.Expires)
                : undefined,
              path: parsedCookie.Path ?? '/',
              maxAge: parsedCookie['Max-Age']
                ? Number(parsedCookie['Max-Age'])
                : undefined,
            };

            if (parsedCookie.accessToken) {
              response.cookies.set(
                'accessToken',
                parsedCookie.accessToken,
                options
              );
            }
            if (parsedCookie.refreshToken) {
              response.cookies.set(
                'refreshToken',
                parsedCookie.refreshToken,
                options
              );
            }
          }

          if (isAuthRoute) {
            const next = request.nextUrl.searchParams.get('next');
            return NextResponse.redirect(
              new URL(next || '/', request.url),
              response
            );
          }

          if (isPrivateRoute) {
            return response;
          }

          return response;
        }
      } catch {
        if (isPrivateRoute) return redirectToLogin();
        return NextResponse.next();
      }
    }

    if (isAuthRoute) return NextResponse.next();

    if (isPrivateRoute) return redirectToLogin();

    return NextResponse.next();
  }

  if (isAuthRoute) {
    const next = request.nextUrl.searchParams.get('next');
    return NextResponse.redirect(new URL(next || '/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/profile',
    '/manage-tools/:path*',
    '/confirm/booking/:path*',
    '/auth/:path*',
  ],
};
