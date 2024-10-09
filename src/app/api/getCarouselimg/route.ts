import connect from "@/dbConfig/dbConfig";
import ProductModel from "@/Models/Product";
import { NextResponse } from "next/server";

export async function GET(){

    await connect();

   try {
    
    const products = await ProductModel.aggregate([{ $sample: { size: 6 } }]);
    if(!products || products.length<6){
        return   NextResponse.json({
            message:"Not enough products",
            success:false
         },{status:500})
    }
    
    const images = products.map(product => product.link);

    return   NextResponse.json({
        images,
        success:true
       },{status:200})
   } catch (error:unknown) {
    console.log(error);
     return   NextResponse.json({
       message:"Error loading images",
       success:false
    },{status:500})
   }
}