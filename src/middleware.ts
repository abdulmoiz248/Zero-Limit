import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('token')?.value;
    if (pathname.startsWith('/admin')) {
      if (!token && pathname !== '/admin/login') {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
      if(token && pathname === '/admin/login'){
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      }
    }
    const cookies = request.cookies;
    const email = cookies.get('OTP');
    if(pathname==='/otp' && !email){
      return NextResponse.redirect(new URL('/Register', request.url));
    }
    if(pathname==='/Register' && email){
      return NextResponse.redirect(new URL('/otp', request.url));
    }
         
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*','/otp','/Register'],
};
