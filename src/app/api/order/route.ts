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
    const {  formData, cartItems, paymentMethod ,total} = await req.json();

 
    let method;
    if(paymentMethod==='online'){
        method='credit card';
    }else{
       method='cash on delivery';
    }

  
      cartItems.some(async(item:CartItem) => {
         let product=await ProductModel.findById(item.product._id)
         if(product.quantity-item.quantity>=0){
            
          return NextResponse.json({message:"Not Enough Quantity available",success:false},{status:400})

  
         }else{
          product.quantity=product.quantity-item.quantity;
          await product.save();
         }
      });
      let products = cartItems.flatMap((cartItem: CartItem) => {
        return Array(cartItem.quantity).fill(cartItem.product._id);
      });
  

    let otp=generateOtp();
        let order = await new OrderModel({
      email: formData.email,
      phone:formData.phone,
      products:products,
      otp,
      total,
      name: formData.name,
      address: formData.address,
      city: formData.city,
      zipCode: formData.zipCode,
      country: formData.country,
      paymentMethod:method, 
      paymentStatus: 'Pending',
   
    });

    // Saving the order to the database
    await order.save();
    await sendOTPEmail(formData.email,otp); 
    // Return success response
    return new Response(
      JSON.stringify({
        id:order._id,
        message: "Order processed successfully",
        success: true,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Order processing error: ", error);

   
    return new Response(
      JSON.stringify({
        message: "Order process failed",
        success: false,
      }),
      { status: 500 }
    );
  }
}
