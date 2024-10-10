import connect from "@/dbConfig/dbConfig";
import ProductModel from "@/Models/Product";
import { NextResponse } from "next/server";
import { promises as fs } from 'fs';
import path from 'path';

export async function DELETE(req: Request) {
    try {
        await connect(); // Ensure you're connecting to the database
        const url = new URL(req.url);
        const productId = url.pathname.split('/').pop(); // Extract productId from URL

        // Validate productId
        if (!productId) {
            return NextResponse.json({ message: 'Product ID is required.' }, { status: 400 });
        }

        // Find the product by ID
        const product = await ProductModel.findById(productId);

        if (!product) {
            return NextResponse.json({ message: 'Product not found.' }, { status: 404 });
        }

        // Construct the file path to the product image
        const photoPath = path.join(process.cwd(), 'public', product.link);

        // Delete the product image from the local filesystem
        try {
            await fs.unlink(photoPath);
            console.log(`Deleted image: ${photoPath}`);
        } catch (err) {
            console.error('Failed to delete the product image:', err);
        }

        // Delete the product from the database
        const result = await ProductModel.deleteOne({ _id: productId });

        if (result.deletedCount === 0) {
            return NextResponse.json({ message: 'Product not found.' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Product deleted successfully.', success: true }, { status: 200 });

    } catch (error) {
        console.error('Error deleting product:', error);
        return NextResponse.json({ message: 'Server error', success: false }, { status: 500 });
    }
}
