

import bcrypt from 'bcryptjs';

import CustomerModel from "@/Models/Customer";
import connect from "@/dbConfig/dbConfig";
export async function POST(req: Request){
   
    await connect();
    const { email, password,name } = await req.json();
    try {
     
        const hashpass=await bcrypt.hash(password,10); 
        await new CustomerModel({email:email,password:hashpass,name:name}).save();
     

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