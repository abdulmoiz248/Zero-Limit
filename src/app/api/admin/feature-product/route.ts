import connect from "@/dbConfig/dbConfig";
import ProductModel from "@/Models/Product";

export async function POST(req: Request) {
    try {
        // Extract productId from the request body
        const { productId } = await req.json();

        // Connect to the database
        await connect();

        // Find the product by ID
        const product = await ProductModel.findById(productId);
        
        // Check if the product exists
        if (!product) {
            return new Response(JSON.stringify({
                message: 'No product found',
                success: false
            }), { status: 404 });
        }

        // Toggle the featured status
        product.featured = !product.featured;

        // Save the updated product
        await product.save();

        return new Response(JSON.stringify({
            message: `Product has been ${product.featured ? 'featured' : 'unfeatured'}`,
            success: true
        }), { status: 200 });
        
    } catch (error) {
        console.error("Error:", error);
        return new Response(JSON.stringify({
            message: 'An error occurred while toggling the featured status.',
            success: false
        }), { status: 500 });
    }
}
