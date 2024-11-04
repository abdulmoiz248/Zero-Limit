import OrderModel, { Order } from "@/Models/Order";
import ProductModel from "@/Models/Product";
import connect from "@/dbConfig/dbConfig";

import { CartItem } from "@/interfaces/interfaces";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connect();

    const { total, formData, cart, paymentMethod } = await req.json();
    const method = paymentMethod === "online" ? "credit card" : "cash on delivery";
    const cartItems: CartItem[] = Object.values(cart);

   
    if (!formData.email || !formData.phone || !formData.address) {
      return NextResponse.json(
        { message: "Incomplete form data", success: false },
        { status: 400 }
      );
    }
   
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
