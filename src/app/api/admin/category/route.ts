import connect from "@/dbConfig/dbConfig";
import CategoriesModel from "@/Models/Categories";

import { promises as fs } from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const categoryName = formData.get("categoryName");
    const photo = formData.get("photo");

    if (!categoryName || !photo) {
      return new Response(
        JSON.stringify({ message: "Invalid data", success: false }),
        { status: 400 }
      );
    }

    // Check if the "categories" folder exists, if not, create it
    const categoriesDir = path.join(process.cwd(), 'public', 'categories');
    await fs.mkdir(categoriesDir, { recursive: true });

    // Save the photo in the "categories" folder
    const photoFilename = `${Date.now()}_${(photo as File).name}`;
    const photoPath = path.join(categoriesDir, photoFilename);

    // Write the photo to the categories directory
    const buffer = await (photo as File).arrayBuffer();
    await fs.writeFile(photoPath, Buffer.from(buffer));

    // Construct the public URL for the saved photo
    const photoUrl = `/categories/${photoFilename}`;

    // Connect to MongoDB and save the category with the photo URL
    await connect();
    await new CategoriesModel({
      name: categoryName,
      link: photoUrl,
    }).save();

    return new Response(
      JSON.stringify({
        message: "Category added successfully",
        success: true,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("error", error);
    return new Response(
      JSON.stringify({
        message: "Cannot add a category",
        success: false,
      }),
      { status: 500 }
    );
  }
}


export async function GET(){
  try {
    await connect();
    const categories = await CategoriesModel.find();
    return Response.json({
      success: true,
      categories,
    });
    
  } catch (error) {
    console.log(error)
    return Response.json({
      success: false,
      message: "Error"
    },{status: 500});
  }
}