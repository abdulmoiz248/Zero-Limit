import { generateOtp } from "@/helper/generateOtp";
import { createCustomer } from "@/services/CustomerServices";
import bcrypt from 'bcryptjs';
import {sendOTPEmail} from '@/helper/otpEmail'
export async function POST(req: Request){
   
    const { email, password,name } = await req.json();
    try {
        let otp=generateOtp();
        let hashpass=await bcrypt.hash(password,10); 
        let customer=await createCustomer(email,hashpass,name,otp);
        await sendOTPEmail(email,otp);

        return Response.json({
            message: "User Created Successfully",
            success: true,
        },{status:201});
    } catch (error) {
        return Response.json({
            message:"Can't create User",
            success: false,
            
        },{status:500});
    }
}