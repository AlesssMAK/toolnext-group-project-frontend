import { NextRequest, NextResponse } from 'next/server';

const privateRoutes = ['/profile', '/manage-tools', '/confirm/booking'];
const authRoutes = ['/auth/login', '/auth/register'];

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const accessToken = request.cookies.get('accessToken')?.value;

  console.log('[MW]', {
    path: pathname,
    hasAccess: Boolean(accessToken),
  });

  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some(
    route => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (!accessToken && isPrivateRoute) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('next', pathname + search);
    return NextResponse.redirect(loginUrl);
  }

  if (accessToken && isAuthRoute) {
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
