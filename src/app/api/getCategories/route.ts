import connect from "@/dbConfig/dbConfig";
import CategoriesModel from "@/Models/Categories";

import { NextResponse } from "next/server";

export async function GET(){

    await connect();

   try {
    
    const categories = await CategoriesModel.find();
   
    if(!categories){
        return   NextResponse.json({
            message:"Error loading categories",
            success:false
         },{status:500})
    }
    
   

    return   NextResponse.json({
        categories,
        success:true
       },{status:200})
   } catch (error) {
     return   NextResponse.json({
       message:"Error loading Categories",
       success:false
    },{status:500})
   }
}