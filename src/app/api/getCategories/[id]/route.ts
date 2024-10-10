import connect from "@/dbConfig/dbConfig";
import CategoriesModel from "@/Models/Categories";
import ProductModel from "@/Models/Product";
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

       
        const category = await CategoriesModel.findById(categoryId);
      
        if (!category) {
            return NextResponse.json({
                message: "Category not found.",
                success: false
            }, { status: 404 });
        }
        const products=await ProductModel.find({ categoryId: categoryId})
        return NextResponse.json({
            category,
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
