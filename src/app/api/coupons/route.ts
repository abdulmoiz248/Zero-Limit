import { NextResponse } from "next/server";

export async function POST() {
    const validCoupons ={
        "FEARLESS20": 200,
      }
      
    return NextResponse.json({
        success:true,
        validCoupons,
  
    },{status:200})
}