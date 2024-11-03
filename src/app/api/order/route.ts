import OrderModel, { Order } from "@/Models/Order";
import ProductModel from "@/Models/Product";
import connect from "@/dbConfig/dbConfig";

import { CartItem } from "@/interfaces/interfaces";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connect();

    const { formData, cart, paymentMethod } = await req.json();
    let total: number = 0;
    const cartItems: CartItem[] = Object.values(cart);
    const method = paymentMethod === "online" ? "credit card" : "cash on delivery";

    if (!formData.email || !formData.phone || !formData.address) {
      return NextResponse.json(
        { message: "Incomplete form data", success: false },
        { status: 400 }
      );
    }

    // Prepare promises for product validation and stock update
    const productPromises = cartItems.map(async (item) => {
      const product = await ProductModel.findById(item.product._id);

      if (!product) {
        console.log(`Product ${item.product.name} not found`);
        throw new Error(`Product ${item.product.name} not found`);
      }

      if (product.quantity < item.quantity) {
        console.log(`Not enough stock for ${item.product.name}, maximum quantity is ${product.quantity}`);
        throw new Error(`Not enough stock for ${item.product.name}, maximum quantity is ${product.quantity}`);
      }

      total += item.product.price * item.quantity;
      product.quantity -= item.quantity;
      await product.save();
    });

    try {
      await Promise.all(productPromises);
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { message: "An error occured", success: false },
        { status: 400 }
      );
    }

    const products = cartItems.flatMap((item: CartItem) =>
      Array(item.quantity).fill(item.product._id)
    );

    const order: Order = new OrderModel({
      email: formData.email,
      phone: formData.phone,
      products,
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
