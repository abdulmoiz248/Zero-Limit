import connect from "@/dbConfig/dbConfig";
import OrderModel from "@/Models/Order";


export async function POST(req: Request) {
    const {otp,orderId}=await req.json();
    await connect();
    try {
        
        const order=await OrderModel.findById(orderId);
        const valid=order.otp==otp.join('');
      
         if(valid){
            order.isVerified=true;
            await order.save();
             return Response.json({
                 message: "Order Verified Successfully",
                 success: true,
             },{status:200});
         }else{
             return Response.json({
                 message: "Invalid OTP",
                 success: false,
             },{status:401});
         }
    } catch (error) {
        console.log(error);
        return Response.json({
            message:"Error Verifying user",
            success: false,
            
        },{status:500});
    }
}