import connect from "@/dbConfig/dbConfig";
import OrderModel from "@/Models/Order";


export async function POST(req: Request) {
    let {otp,orderId}=await req.json();
    await connect();
    try {
        
        let order=await OrderModel.findById(orderId);
        let valid=order.otp==otp.join('');
      
         if(valid){
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
        return Response.json({
            message:"Error Verifying user",
            success: false,
            
        },{status:500});
    }
}