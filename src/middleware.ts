// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// export {default} from "next-auth/middleware";
// import {getToken} from "next-auth/jwt"
 
// // This function can be marked `async` if using `await` inside
// export async function middleware(request: NextRequest) {

//     const token= await getToken({req: request});
//     const url=request.nextUrl;

//     if(token &&
//         (
//             url.pathname.startsWith('/sign-in') ||
//             url.pathname.startsWith('/sign-up') ||
//             url.pathname.startsWith('/verify') ||
//             url.pathname.startsWith('/') 
//         )
//     ){
//         return NextResponse.redirect(new URL('/dashboard', request.url))
//     }
//     if(!token && url.pathname.startsWith('/dashboard')){
//         return NextResponse.redirect(new URL('/sign-in', request.url));
//     }
//     return NextResponse.next();
// }
 
// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: ['/sign-in', '/sign-up', '/', '/dashboard/:path*', '/verify:path*']
// }

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Export next-auth middleware for protected routes
export { default } from 'next-auth/middleware';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const url = request.nextUrl;

  // Redirect authenticated users away from auth pages
  if (token && (url.pathname === '/sign-in' || url.pathname === '/sign-up' || url.pathname === '/verify')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Protect /dashboard for unauthenticated users
  if (!token && (url.pathname.startsWith('/dashboard') || url.pathname.startsWith('/u') || url.pathname.startsWith('/select_user'))) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // Allow all other requests to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ['/sign-in', '/sign-up', '/verify/:path*', '/dashboard/:path*', '/u/:path*', '/select_user'],
};