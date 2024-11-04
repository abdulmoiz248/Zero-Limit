import ProductModel from "@/Models/Product";
import connect from "@/dbConfig/dbConfig";
import { CartItem } from "@/interfaces/interfaces";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connect();
    
    const { cart } = await req.json();
    const cartItems: CartItem[] = Object.values(cart);

    // Gather product IDs for a batch query
    const productIds = cartItems.map((item) => item.product._id);

    // Fetch required products with stock in one go
    const products = await ProductModel.find({ _id: { $in: productIds } }, "price quantity");

    let total = 0;
    const updateOperations = [];

    // Mapping product quantities for quicker access
    const productMap = new Map(products.map((p) => [p._id.toString(), p]));

    for (const item of cartItems) {
      const product = productMap.get(item.product._id);

      if (!product) {
        return NextResponse.json(
          { message: `Product ${item.product.name} not found`, success: false },
          { status: 404 }
        );
      }

      if (product.quantity < item.quantity) {
        return NextResponse.json(
          {
            message: `Not enough stock for ${item.product.name}. Available: ${product.quantity}`,
            success: false,
          },
          { status: 400 }
        );
      }

      total += product.price * item.quantity;

      // Prepare the stock update in batch
      updateOperations.push({
        updateOne: {
          filter: { _id: item.product._id },
          update: { $inc: { quantity: -item.quantity } },
        },
      });
    }

    // Bulk update products to decrement stock in one operation
    if (updateOperations.length > 0) {
      await ProductModel.bulkWrite(updateOperations);
    }

    // Return the total amount and success response
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
