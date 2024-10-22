import OrderModel from "@/Models/Order";
import ProductModel from "@/Models/Product";
import connect from "@/dbConfig/dbConfig";
import { generateOtp } from "@/helper/generateOtp";
import { sendOTPEmail } from "@/helper/otpEmail";
import { CartItem } from "@/interfaces/interfaces";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connect();

    const { formData, cartItems, paymentMethod, total } = await req.json();

    // Determine payment method
    const method = paymentMethod === "online" ? "credit card" : "cash on delivery";

    // Check stock for all products
    for (const item of cartItems) {
      const product = await ProductModel.findById(item.product._id);

      if (!product) {
        return NextResponse.json(
          { message: `Product ${item.product.name} not found`, success: false },
          { status: 404 }
        );
      }

      if (product.quantity < item.quantity) {
        return NextResponse.json(
          { message: `Not enough stock for ${item.product.name} Maximum quantity is ${product.quantity}`, success: false },
          { status: 400 }
        );
      }

      // Reduce product quantity
      product.quantity -= item.quantity;
      await product.save();
    }

    // Flatten cart items into an array of product IDs for the order
    const products = cartItems.flatMap((item: CartItem) =>
      Array(item.quantity).fill(item.product._id)
    );

    // Generate OTP for the order
    const otp = generateOtp();

    // Create new order
    const order = new OrderModel({
      email: formData.email,
      phone: formData.phone,
      products,
      otp,
      total,
      name: formData.name,
      address: formData.address,
      city: formData.city,
      zipCode: formData.zipCode,
      country: formData.country,
      paymentMethod: method,
      paymentStatus: "Pending",
    });

    // Save the order in the database
    await order.save();

    // Send OTP email to the customer
    await sendOTPEmail(formData.email, otp);

    // Return success response
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

    // Handle server error
    return NextResponse.json(
      { message: "Order process failed", success: false },
      { status: 500 }
    );
  }
}
