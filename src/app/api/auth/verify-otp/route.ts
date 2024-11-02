import connect from "@/dbConfig/dbConfig";
import CustomerModel from "@/Models/Customer";


export async function POST(req: Request) {
    await connect();
    const {otp,email}=await req.json();
    try {
          
        const valid = await CustomerModel.findOne({email,otp});
         if(valid){
             return Response.json({
                 message: "User Verified Successfully",
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