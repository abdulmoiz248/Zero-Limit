import connect from "@/dbConfig/dbConfig";
import OrderModel from "@/Models/Order";
import { NextResponse } from "next/server";

export async function GET(req: Request){
    
    
   await connect();

        try {         
            const url = new URL(req.url); 
            const email = url.pathname.split('/').pop(); 


            const orders=await OrderModel.find({ email: email});

    
            return NextResponse.json({
                orders,
                success: true
            });
        } catch (error) {
            return NextResponse.json({
                message: "Error loading category.",
                success: false,error
            }, { status: 500 });
        }
   
}