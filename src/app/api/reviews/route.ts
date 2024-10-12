import { getAllReviews } from "@/services/ReviewServices";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
       
        
       let reviews=await getAllReviews();
       
        return NextResponse.json({
            reviews,
            success: true
        }, { status: 200 });

    } catch (error: unknown) {
        console.log(error);
        return NextResponse.json({
            message: "Error loading Reviews.",
            success: false
        }, { status: 500 });
    }
}
