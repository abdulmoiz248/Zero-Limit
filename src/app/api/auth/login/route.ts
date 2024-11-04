import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import bcrypt from 'bcryptjs';
import CustomerModel from '@/Models/Customer';
import connect from '@/dbConfig/dbConfig';


connect().catch((error) => console.error('Database connection error:', error));

export async function POST(req: Request) {
    const { email, password } = await req.json();
    
    try {
        const customer = await CustomerModel.findOne({ email }).exec(); // Use exec() for better error handling
        
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

        const data = {
            id: customer.id,
            email: customer.email,
            name: customer.name
        };

        const response = NextResponse.json(
            { message: 'Login successful', success: true, customerData: data },
            { status: 200 }
        );
        response.headers.set('Set-Cookie', serializedToken);

        return response;

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ message: 'Login failed', success: false }, { status: 500 });
    }
}
