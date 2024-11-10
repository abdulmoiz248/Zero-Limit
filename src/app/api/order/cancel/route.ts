import OrderModel from "@/Models/Order";
import connect from "@/dbConfig/dbConfig";
import { sendOrderCancelledEmail } from "@/helper/ordercancel";
import ProductModel  from "@/Models/Product";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connect();
    const { id } = await req.json();

    // Find the order by ID
    const order = await OrderModel.findById(id);
    if (!order) {
      return NextResponse.json(
        {
          message: "Order not found",
          success: false,
        },
        { status: 404 }
      );
    }

    // Update order status to 'Cancelled'
    order.status = 'Cancelled';
    await order.save();

    // Update product quantities based on the cancelled order
    const productCounts: Record<string, number> = {};

    // Count occurrences of each product ID in the order
    order.products.forEach((productId: string) => {
      productCounts[productId] = (productCounts[productId] || 0) + 1;
    });

    // Increment quantity for each unique product ID in the Product model
    await Promise.all(
      Object.entries(productCounts).map(async ([productId, count]) => {
        await ProductModel.findByIdAndUpdate(
          productId,
          { $inc: { quantity: count } },
          { new: true }
        );
      })
    );

    // Send cancellation email notification
    await sendOrderCancelledEmail(order.email);

    return new Response(
      JSON.stringify({
        id: order._id,
        message: "Order cancelled and product quantities updated successfully",
        success: true,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Order processing error: ", error);

    return new Response(
      JSON.stringify({
        message: "Order cancellation process failed",
        success: false,
      }),
      { status: 500 }
    );
  }
}
