import connect from "@/dbConfig/dbConfig";
import ProductModel from "@/Models/Product";
import CategoriesModel from "@/Models/Categories";
import { NextResponse } from "next/server";

export async function GET(){

    
    await connect();
    const categories = await getCategories();
    const products = await getProducts();

    if(categories && products ){
        return   NextResponse.json({
            message:"Products and Categories loaded successfully",
            success:true,
            categories,
            products
        },{status:200});
    }

    return   NextResponse.json({
        message:"Error loading products and categories",
        success:false
    },{status:500});
  
}


const getCategories=async()=>{
    const categories = await CategoriesModel.find();
   
    if(!categories){
        return   null;
    }
    

    return  categories

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