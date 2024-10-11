import connect from "@/dbConfig/dbConfig";
import ReviewModel from "@/Models/Review";

import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        await connect(); 
        const url = new URL(req.url); 
        const productID = url.pathname.split('/').pop(); 
        if (!productID) {
            return NextResponse.json({
                message: "Product ID is required.",
                success: false
            }, { status: 400 });
        }

      
      let reviews=await ReviewModel.find({ productID: productID})
       return NextResponse.json({
            reviews,
            success: true
        }, { status: 200 });

    } catch (error: unknown) {
        console.log(error);
        return NextResponse.json({
            message: "Error loading category.",
            success: false
        }, { status: 500 });
    }
}
