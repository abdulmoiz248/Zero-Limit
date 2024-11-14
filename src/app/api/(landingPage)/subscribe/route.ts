import connect from '@/dbConfig/dbConfig';
import MemberModel from '@/Models/Member';

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  await connect();
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required",
        },
        { status: 400 }
      );
    }

    const existingMember = await MemberModel.findOne({ email });
    if(existingMember)
      return NextResponse.json(
        {
          success: false,
          message: "Email already exists",
        },
        { status: 409 } 
      );

    const member =await new MemberModel({email});
    await member.save();

    if (member) {
      return NextResponse.json(
        {
          success: true,
          message: "Member added successfully",
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Email already exists",
        },
        { status: 409 } // Conflict status code
      );
    }
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to add member",
      },
      { status: 500 }
    );
  }
}
