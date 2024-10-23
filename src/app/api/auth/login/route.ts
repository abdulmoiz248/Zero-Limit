import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import { getCustomerByEmail } from '@/services/CustomerServices';
import bcrypt from 'bcryptjs';


export async function POST(req: Request) {
    const { email, password } = await req.json();
    
    try {
        const customer = await getCustomerByEmail(email);
        if (!customer) {
            return NextResponse.json({ message: 'User not found', success: false }, { status: 404 });
        }

        const passwordMatch = await bcrypt.compare(password, customer.password);
        if (!passwordMatch) {
            return NextResponse.json({ message: 'Invalid password', success: false }, { status: 401 });
        }

       
        const token = jwt.sign(
            { id: customer.id, email: customer.email },
            process.env.jwtSecret!,
            { expiresIn: '7d' }
        );

       
        const serializedToken = serialize('customer', token, {
          
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/'
        });

     
        const data={
            id:customer.id,
            email:customer.email,
            fullName:customer.fullName

        }
        const response = NextResponse.json(
            
            { message: 'Login successful', success: true ,customerData: data},
            { status: 200 }
        );
        response.headers.set('Set-Cookie', serializedToken);

        return response;

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ message: 'Login failed', success: false }, { status: 500 });
    }
}
