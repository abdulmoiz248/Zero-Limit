import connect from "@/dbConfig/dbConfig";
import ProductModel from "@/Models/Product";

export async function POST(req: Request) {
    try {
        // Extract data from the request body
        const { productId, discount } = await req.json();
         
        // Validate inputs
        if (!productId) {
            return Response.json({
                message: 'Invalid input: productId and discount are required.',
                success: false,
            }, { status: 400 });
        }

        // Connect to the database
        await connect();

        // Find the product by ID
        const product = await ProductModel.findById(productId);
        
        if (!product) {
            return Response.json({
                message: 'No product found',
                success: false,
            }, { status: 404 });
        }

        // Update the discount status and percentage
        if (discount !== 0) {
            product.discount = true;
            product.discountPercent = Number(discount);
        } else {
            product.discount = false;
            product.discountPercent = 0;
        }

        // Save the updated product
        await product.save();

        return Response.json({
            message: 'Product discount updated successfully',
            success: true,
        }, { status: 200 });

    } catch (error) {
        console.error('Error updating product discount:', error);

        return Response.json({
            message: 'An error occurred while updating the product discount.',
            success: false,
        }, { status: 500 });
    }
}
