import OrderModel, { Order } from "@/Models/Order";
import ProductModel from "@/Models/Product";
import connect from "@/dbConfig/dbConfig";

import { CartItem } from "@/interfaces/interfaces";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connect();

    const {  cart } = await req.json();
  
    const cartItems: CartItem[] = Object.values(cart);

 
    // Gather all product IDs and fetch them in one go
    const productIds = cartItems.map((item) => item.product._id);
    const products = await ProductModel.find({ _id: { $in: productIds } });

 
    let total = 0;
    const updateOperations = [];

    for (const item of cartItems) {
      const product = products.find((p) => p._id.toString() === item.product._id);

      if (!product) {
        return NextResponse.json(
          { message: `Product ${item.product.name} not found`, success: false },
          { status: 404 }
        );
      }

      if (product.quantity < item.quantity) {
        return NextResponse.json(
          {
            message: `Not enough stock for ${item.product.name}, maximum quantity is ${product.quantity}`,
            success: false,
          },
          { status: 400 }
        );
      }

      total += item.product.price * item.quantity;

      // Prepare stock decrement operation for batch update
      updateOperations.push({
        updateOne: {
          filter: { _id: item.product._id },
          update: { $inc: { quantity: -item.quantity } },
        },
      });
    }

 
    if (updateOperations.length > 0) {
      await ProductModel.bulkWrite(updateOperations);
    }

   
    return NextResponse.json(
      {
        total,
        message: "Product verified successfully",
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
