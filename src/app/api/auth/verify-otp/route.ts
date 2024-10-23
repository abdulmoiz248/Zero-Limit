import { VerifyingCustomer } from "@/services/CustomerServices";

export async function POST(req: Request) {
    const {otp,email}=await req.json();
    try {
          const valid= await VerifyingCustomer(email,otp)  ;
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