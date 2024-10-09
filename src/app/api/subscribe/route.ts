import connect from '@/dbConfig/dbConfig';
import MemberModel from '@/Models/Member';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  
    await connect();

    try {
        
        const { email } = await req.json();

      
        if (!email) {
            return NextResponse.json({
                success: false,
                message: "Email is required",
            }, { status: 400 });
        }

      
        const member = new MemberModel({ email });

      
        await member.save();

      
        return NextResponse.json({
            success: true,
            message: "Member added successfully",
        }, { status: 200 });
    } catch (error:unknown) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Failed to add member",
        }, { status: 500 });
    }
}
