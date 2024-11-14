import connect from "@/dbConfig/dbConfig";
import ProductModel, { Product } from "@/Models/Product";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        await connect(); 

        const url = new URL(req.url); 
        const categoryId = url.pathname.split('/').pop(); 

        if (!categoryId) {
            return NextResponse.json({
                message: "Category ID is required.",
                success: false
            }, { status: 400 });
        }

       

      
      
        const  products:Product[]=await ProductModel.find({ categoryId: categoryId})
        
        return NextResponse.json({
            products,
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
