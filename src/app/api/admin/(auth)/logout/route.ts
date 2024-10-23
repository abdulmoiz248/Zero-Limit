import { serialize } from "cookie";
import { NextResponse } from "next/server";

export async function POST() {
  const cookie=serialize('token','',{
    httpOnly:true,
    expires:new Date(0),
    path:'/'
  })
  return NextResponse.json({message:'Logout successful',success:true},{status:200,headers:{'Set-Cookie':cookie}})
}