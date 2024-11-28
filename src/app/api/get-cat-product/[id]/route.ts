import connect from "@/dbConfig/dbConfig";
import ProductModel from "@/Models/Product";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        // Connect to the database
        await connect();

        // Extract the categoryId from the URL
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

        // Fetch products by categoryId
        const products = await ProductModel.find({ categoryId }).lean();

        if (products.length === 0) {
            return NextResponse.json(
                {
                    message: "No products found for the given category.",
                    success: false,
                },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                products,
                success: true,
            },
            { status: 200 }
        );
    } catch (error: unknown) {
        console.error("Error fetching products:", error);
        return NextResponse.json(
            {
                message: "An error occurred while fetching products.",
                success: false,
            },
            { status: 500 }
        );
    }
}
