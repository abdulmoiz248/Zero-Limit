import { getCustomerByEmail } from "@/services/CustomerServices";

export async function POST(request:Request){
   
    try {
        const {email}=await request.json();
        const customer=await getCustomerByEmail(email);
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