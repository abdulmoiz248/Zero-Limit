import OrderModel from "@/Models/Order";
import connect from "@/dbConfig/dbConfig";
import { generateOtp } from "@/helper/generateOtp";
import { sendOTPEmail } from "@/helper/otpEmail";
import { CartItem } from "@/interfaces/interfaces";

export async function POST(req: Request) {
  try {
    await connect();
    const { phone, formData, cartItems, paymentMethod } = await req.json();

    // Mapping cart items to product IDs
    let products = cartItems.map((cartItem: CartItem) => cartItem.product._id);

    let method;
    if(paymentMethod==='online'){
        method='credit card';
    }else{
       method='cash on delivery';
    }
    let otp=generateOtp();
        let order = await new OrderModel({
      email: formData.email,
      phone,
      products,
      otp,
      name: formData.name,
      address: formData.address,
      city: formData.city, // Fixed: should be lowercase
      zipCode: formData.zipCode,
      country: formData.country,
      paymentMethod:method, // Assuming paymentMethod is passed in the body
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
