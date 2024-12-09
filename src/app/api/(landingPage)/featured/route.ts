import connect from "@/dbConfig/dbConfig";
import ProductModel from "@/Models/Product";
import { NextResponse } from "next/server";

export async function GET(){
    await connect();
    const products = await getProducts();

    if(products ){
        return   NextResponse.json({
            message:"Products and Categories loaded successfully",
            success:true,
           
            products
        },{status:200});
    }

    return   NextResponse.json({
        message:"Error loading products and categories",
        success:false
    },{status:500});
  
}


const getProducts=async()=>{
    const products = await ProductModel.find({ 
        featured: true,
      }).limit(3);
    
      
    if(!products){
        return null;
    }
     
      return   products;
}