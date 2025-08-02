import NextAuth from 'next-auth';

import authConfig from './auth.config';
import { privateRoutes } from './routes';

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  const baseURL = `${nextUrl.protocol}//${nextUrl.host}`;

  const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);
  const isAuthRoute =
    nextUrl.pathname.includes('/auth') || nextUrl.pathname === '/';
  const isApiRoute = nextUrl.pathname.includes('/api');

  if (isApiRoute) return;

  if (isLoggedIn && isAuthRoute) {
    return Response.redirect(`${baseURL}/dashboard`);
  }

  if (isAuthRoute && !isLoggedIn) {
    return;
  }

  if (!isLoggedIn && isPrivateRoute) {
    return Response.redirect(`${baseURL}/auth/login`);
  }
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
