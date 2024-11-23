import connect from "@/dbConfig/dbConfig";
import CategoriesModel from "@/Models/Categories";

import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connect(); 

      
      
       
        const category = await CategoriesModel.find();
      
        if (!category) {
            return NextResponse.json({
                message: "Category not found.",
                success: false
            }, { status: 404 });
        }
      
        return NextResponse.json({
            category,
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
