import connect from "@/dbConfig/dbConfig";
import ProductModel from "@/Models/Product";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const productID: string = decodeURIComponent(url.pathname.split('/').pop() || ''); 
        
        if (!productID) {
            return NextResponse.json({
                message: "Product ID is required.",
                success: false
            }, { status: 400 });
        }

        await connect();
        const products = await ProductModel.find({
            name: productID,
            quantity: { $gt: 0 }
        });
        
   //     console.log(products);
        
        return NextResponse.json({
            products,
            success: true
        }, { status: 200 });

    } catch (error: unknown) {
        console.log(error);
        return NextResponse.json({
            message: "Error loading products.",
            success: false
        }, { status: 500 });
    }
}
