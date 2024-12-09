import connect from "@/dbConfig/dbConfig";
import OrderModel from "@/Models/Order";
import ProductModel from "@/Models/Product";
import ReviewModel from "@/Models/Review";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connect();
  try {
    const {
      orderId,
      overallRating,
      overallFeedback,
      productRatings,
      productFeedback,
      username,
    } = await req.json();

    const productFeedbackPromises = Object.keys(productFeedback).map(
      async (productId) => {
        const feedback = productFeedback[productId];
        const rating = productRatings[productId];

        if (feedback && rating) {
          const review = new ReviewModel({
            username,
            body: feedback,
            rating,
            productId,
          });

          await review.save();

          const product = await ProductModel.findById(productId);
          if (product) {
            product.rating = (product.rating + rating) / 2;
            await product.save();
          }
        }
      }
    );

    // Wait for all feedback promises to complete
    await Promise.all(productFeedbackPromises);

    const order = await OrderModel.findById(orderId);
    if (order) {
      order.reviews = overallFeedback || "Very Nice Product timely delivered Satisfied";
      order.rating = overallRating;
      await order.save();
    }

    return NextResponse.json(
      {
        message: "Reviews updated successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Error loading reviews.",
        success: false,
      },
      { status: 500 }
    );
  }
}
