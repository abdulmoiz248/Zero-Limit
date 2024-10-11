import connect from "@/dbConfig/dbConfig";
import ProductModel from "@/Models/Product";
import ReviewModel from "@/Models/Review";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        await connect(); 

        
       let reviews=await ReviewModel.find().limit(24);
       
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
