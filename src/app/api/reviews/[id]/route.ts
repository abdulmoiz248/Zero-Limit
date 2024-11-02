import connect from "@/dbConfig/dbConfig";
import ReviewModel from "@/Models/Review";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
       
        const url = new URL(req.url); 
        const productID :string= url.pathname.split('/').pop() || ''; 
        if (!productID) {
            return NextResponse.json({
                message: "Product ID is required.",
                success: false
            }, { status: 400 });
        }

      await connect();
      const reviews=await ReviewModel.find({productId:productID});
       return NextResponse.json({
            reviews,
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
