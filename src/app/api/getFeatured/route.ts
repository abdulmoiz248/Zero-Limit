import connect from "@/dbConfig/dbConfig";
import ProductModel from "@/Models/Product";
import { NextResponse } from "next/server";

export async function GET(){

   await connect();

   try {
    
      const products=await ProductModel.find({featured:true});
   
    if(!products){
        return   NextResponse.json({
            message:"Error loading products",
            success:false
         },{status:500})
    }
    
   

    return   NextResponse.json({
        products,
        success:true
       },{status:200})
   } catch (error:unknown) {
      console.log(error);
     return   NextResponse.json({
       message:"Error loading featured products",
       success:false
    },{status:500})
   }
}