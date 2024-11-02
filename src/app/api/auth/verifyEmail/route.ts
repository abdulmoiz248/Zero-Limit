import connect from "@/dbConfig/dbConfig";
import CustomerModel from "@/Models/Customer";

export async function POST(request:Request){
   
    try {
        await connect();
        const {email}=await request.json();
        const customer=await CustomerModel.findOne({email});
        if(customer){
            return Response.json({
                message: "Email already Exists",
                success:false
            },{status:400})
        }
        return Response.json({
            message: "Valid Email",
            success:true
        },{status:200})

    } catch (error) {
        console.log(error);
                return Response.json({
            message: "Could not verify email",
            success:false
        },{status:500})
    }
}