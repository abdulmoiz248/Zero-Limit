import { generateOtp } from "@/helper/generateOtp";

import bcrypt from 'bcryptjs';
import {sendOTPEmail} from '@/helper/otpEmail'
import CustomerModel from "@/Models/Customer";
import connect from "@/dbConfig/dbConfig";
export async function POST(req: Request){
   
    await connect();
    const { email, password,name } = await req.json();
    try {
        const otp=generateOtp();
        const hashpass=await bcrypt.hash(password,10); 
        await new CustomerModel({email:email,password:hashpass,otp:otp,name:name}).save();
        await sendOTPEmail(email,otp);

        return Response.json({
            message: "User Created Successfully",
            success: true,
        },{status:201});
    } catch (error) {
        console.log(error);
        return Response.json({
            message:"Can't create User",
            success: false,
            
        },{status:500});
    }
}