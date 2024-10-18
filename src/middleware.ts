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

    const customer=cookies.get('customer');
    

      if (!customer && pathname === '/Checkout') {
        return NextResponse.redirect(new URL('/Login', request.url));
      }
      if(customer && pathname === '/Login'){
        return NextResponse.redirect(new URL('/', request.url));
      }
 
      if(customer && pathname === '/Register'){
        return NextResponse.redirect(new URL('/', request.url));
      }
      if(!customer && pathname === '/order'){
        return NextResponse.redirect(new URL('/', request.url));
      }

    
      const order=cookies.get('order');
       if (!order && pathname === '/verify-order') {
        return NextResponse.redirect(new URL('/Checkout', request.url));
      }

      
         
    
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*','/otp','/Register','/Checkout','/Login','/verify-order','/order'],
};
