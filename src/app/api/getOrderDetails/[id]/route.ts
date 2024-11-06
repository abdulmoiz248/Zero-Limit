import connect from "@/dbConfig/dbConfig";
import OrderModel from "@/Models/Order";

import { NextResponse } from "next/server";
export async function GET(req: Request) {
    await connect();
    try {
       
        const url = new URL(req.url); 
        const orderId :string= url.pathname.split('/').pop() || ''; 
        if (!orderId) {
            return NextResponse.json({
                message: "Order ID is required.",
                success: false
            }, { status: 400 });
        }
        const order=await OrderModel.findById(orderId);
      
        if(!order){
            return NextResponse.json({
                order,
                message: "Order not found",
                success: false
            }, { status: 404 });     
        }

        return NextResponse.json({
            order,
            message: "Order found",
            success: true
        }, { status: 200 });


     } catch (error: unknown) {
        console.log(error);
        return NextResponse.json({
            message: "Error loading reviews.",
            success: false
        }, { status: 500 });
    }
}
