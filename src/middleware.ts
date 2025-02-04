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
 

      const customer = cookies.get('customerData');
      if(!customer && pathname === '/order'){
        return NextResponse.redirect(new URL('/', request.url));
      }

       
    
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*','/Cart','/otp','/Register','/Checkout','/Login','/verify-order','/order'],
};
