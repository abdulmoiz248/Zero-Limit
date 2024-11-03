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
    const cartItems:CartItem[]= Object.values(cart);
    const method = paymentMethod === "online" ? "credit card" : "cash on delivery";
    
    for (const item of cartItems) {
      const product = await ProductModel.findById(item.product._id);

      if (!product) {
        console.log(`Product ${item.product.name} not found`);
        return NextResponse.json(
          { message: `Product ${item.product.name} not found`, success: false },
          { status: 404 }
        );
      }

      console.log(`Not enough stock for ${item.product.name} Maximum quantity is ${product.quantity}`)
       if (product.quantity < item.quantity) {
        return Response.json(
          { message: `Not enough stock for ${item.product.name} Maximum quantity is ${product.quantity}`, success: false },
          { status: 400 }
        );
       
      }

      total += item.product.price * item.quantity ;
      product.quantity -= item.quantity;
      await product.save();
    }


    const products = cartItems.flatMap((item: CartItem) =>
      Array(item.quantity).fill(item.product._id)
    );



    const order:Order = new OrderModel({
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
