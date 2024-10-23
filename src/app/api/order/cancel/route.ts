import OrderModel from "@/Models/Order";
import connect from "@/dbConfig/dbConfig";
import { sendOTPEmail } from "@/helper/otpEmail";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connect();
    const { id} = await req.json();

   const order=await OrderModel.findById(id);
   if(!order){
    return NextResponse.json({
        message: "Order not found",
        success: false,
    
    },{status:404})
   }
    order.status='Cancelled'
    await order.save();
    await sendOTPEmail(order.email,122222); 
  
    return new Response(
      JSON.stringify({
        id:order._id,
        message: "Order processed successfully",
        success: true,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Order processing error: ", error);

   
    return new Response(
      JSON.stringify({
        message: "Order process failed",
        success: false,
      }),
      { status: 500 }
    );
  }
}
