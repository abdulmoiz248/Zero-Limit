import connect from "@/dbConfig/dbConfig";
import ProductModel from "@/Models/Product";
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

       
        const product = await ProductModel.findById(productID);
      
        if (!product) {
            return NextResponse.json({
                message: "Category not found.",
                success: false
            }, { status: 404 });
        }

        return NextResponse.json({
            product,
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
