import OrderModel from "@/Models/Order";
import connect from "@/dbConfig/dbConfig";
import { sendOTPEmail } from "@/helper/otpEmail";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connect();
    const { id } = await req.json();

    // Find the order by ID
    const order = await OrderModel.findById(id);
    if (!order) {
      return NextResponse.json(
        {
          message: "Order not found",
          success: false,
        },
        { status: 404 }
      );
    }

    // Update order status to 'Cancelled'
    order.status = 'Cancelled';
    await order.save();
   
    await sendOTPEmail('moiz20920@gmail.com',11111); 
    return new Response(
      JSON.stringify({
        id: order._id,
        message: "Order cancelled and product quantities updated successfully",
        success: true,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Order processing error: ", error);

    return new Response(
      JSON.stringify({
        message: "Order cancellation process failed",
        success: false,
      }),
      { status: 500 }
    );
  }
}
