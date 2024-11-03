import OrderModel, { Order } from "@/Models/Order";
import ProductModel from "@/Models/Product";
import connect from "@/dbConfig/dbConfig";

import { CartItem } from "@/interfaces/interfaces";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connect();

    const { formData, cart, paymentMethod } = await req.json();
    const method = paymentMethod === "online" ? "credit card" : "cash on delivery";
    const cartItems: CartItem[] = Object.values(cart);

    // Validate required fields in formData
    if (!formData.email || !formData.phone || !formData.address) {
      return NextResponse.json(
        { message: "Incomplete form data", success: false },
        { status: 400 }
      );
    }

    // Gather all product IDs and fetch them in one go
    const productIds = cartItems.map((item) => item.product._id);
    const products = await ProductModel.find({ _id: { $in: productIds } });

    // Check stock availability and calculate total price
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

    // Execute all stock updates in a single batch
    if (updateOperations.length > 0) {
      await ProductModel.bulkWrite(updateOperations);
    }

    // Create order
    const order: Order = new OrderModel({
      email: formData.email,
      phone: formData.phone,
      products: cartItems.flatMap((item: CartItem) =>
        Array(item.quantity).fill(item.product._id)
      ),
      total,
      name: formData.name,
      address: formData.address,
      city: formData.city,
      zipCode: formData.zipCode,
      country: formData.country,
      paymentMethod: method,
      paymentStatus: "Pending",
    });

    await order.save();

    return NextResponse.json(
      {
        id: order._id,
        message: "Order processed successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Order processing error:", error);

    return NextResponse.json(
      { message: "Order process failed", success: false },
      { status: 500 }
    );
  }
}
