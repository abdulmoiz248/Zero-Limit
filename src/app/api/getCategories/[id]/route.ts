import connect from "@/dbConfig/dbConfig";
import CategoriesModel from "@/Models/Categories";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        console.time("totalExecution");

        console.time("dbConnect");
        await connect();
        console.timeEnd("dbConnect");

        // Parse URL to get the category ID
        const url = new URL(req.url);
        const categoryId = url.pathname.split('/').pop();

        if (!categoryId) {
            return NextResponse.json(
                {
                    message: "Category ID is required.",
                    success: false,
                },
                { status: 400 }
            );
        }

        console.time("categoryFetch");
        const category = await CategoriesModel.findById(categoryId).lean();
        console.timeEnd("categoryFetch");

        if (!category) {
            return NextResponse.json(
                {
                    message: "Category not found.",
                    success: false,
                },
                { status: 404 }
            );
        }

        console.timeEnd("totalExecution");
        return NextResponse.json(
            {
                category,
                success: true,
            },
            { status: 200 }
        );
    } catch (error: unknown) {
        console.error("Error:", error);
        return NextResponse.json(
            {
                message: "Error loading category.",
                success: false,
            },
            { status: 500 }
        );
    }
}
