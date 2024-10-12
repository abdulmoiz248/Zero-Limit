import { getCustomerByEmail } from "@/services/CustomerServices";

export async function POST(request:Request){
   
    try {
        let {email}=await request.json();
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

    } catch (error:any) {
        console.log(error.message);
                return Response.json({
            message: error.message,
            success:false
        },{status:500})
    }
}