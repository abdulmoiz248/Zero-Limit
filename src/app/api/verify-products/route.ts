import { NextResponse } from "next/server";
import ProductModel from "@/Models/Product";
import connect from "@/dbConfig/dbConfig";
import { CartItem } from "@/interfaces/interfaces";


export async function POST(req: Request) {
  try {
    await connect();
    
    const { cart } = await req.json();
    const cartItems: CartItem[] = Object.values(cart);

    // Gather product IDs and quantities for a single query
    const productQueries = cartItems.map(item => ({
      _id: item.product._id,
      size: Object.keys(item.product.size)[0],
      quantity: item.quantity
    }));

    // Fetch all required products in a single query
    const products = await ProductModel.find(
      { _id: { $in: productQueries.map(q => q._id) } },
      "price quantity size discountPercent"
    );

    let total = 0;
    const updateOperations = [];
    const productMap = new Map(products.map(p => [p._id.toString(), p]));

    for (const query of productQueries) {
      const product = productMap.get(query._id);

      if (!product) {
        return NextResponse.json(
          { message: `Product ${query._id} not found`, success: false },
          { status: 404 }
        );
      }

      if (product.size[query.size] < query.quantity) {
        return NextResponse.json(
          {
            message: `Not enough stock for product ${query._id} size ${query.size}. Available: ${product.size[query.size]}`,
            success: false,
          },
          { status: 400 }
        );
      }

      total += (product.price - (product.price * product.discountPercent / 100)) * query.quantity;

      updateOperations.push({
        updateOne: {
          filter: { _id: query._id },
          update: { 
            $inc: { [`size.${query.size}`]: -query.quantity },
          },
        },
      });
    }

    // Bulk update products to decrement stock in one operation
    if (updateOperations.length > 0) {
      await ProductModel.bulkWrite(updateOperations);
    }

    return NextResponse.json(
      {
        total,
        message: "Products verified successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Product processing error:", error);

    return NextResponse.json(
      { message: "Product process failed", success: false },
      { status: 500 }
    );
  }
}

