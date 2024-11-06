import connect from "@/dbConfig/dbConfig";
import OrderModel from "@/Models/Order";
import ProductModel from "@/Models/Product";
import ReviewModel from "@/Models/Review";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    connect();
    try {
        const {
            orderId,
            overallRating,
            overallFeedback,
            productRatings,
            productFeedback,username
          }=await req.json();

          Object.keys(productFeedback).forEach(async(productId) => {
            const feedback = productFeedback[productId];
            const rating = productRatings[productId];
          
            if (feedback && rating) {
              new ReviewModel({
                username,
                body: feedback,
                rating,
                productId,
              }).save();
              const product=await ProductModel.findById(productId);
              product.rating=(product.rating+rating)/2;
            await  product.save()
            }
          });


          const order=await OrderModel.findById(orderId);
          order.reviews=overallFeedback || "Very Nice Product timely delievered Satisfied";
          order.rating=overallRating;
          await order.save();

return NextResponse.json({
            message: "Reviews updated successfully",
            success: true
        }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Error loading reviews.",
            success: false
        }, { status: 500 });
    }
}
