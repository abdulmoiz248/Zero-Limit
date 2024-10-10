import connect from "@/dbConfig/dbConfig";
import ProductModel from "@/Models/Product";


import { promises as fs } from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const productName = formData.get("productName");
    const photo = formData.get("photo");
    const category = formData.get("category");
    const price = formData.get("price");
    const quantity = formData.get("quantity");
    const description = formData.get("description");

    if (!productName || !photo || !category || !price || !quantity || !description) {
      return new Response(
        JSON.stringify({ message: "Invalid data", success: false }),
        { status: 400 }
      );
    }

    // Check if the "products" folder exists, if not, create it
    const productsDir = path.join(process.cwd(), 'public', 'products');
    await fs.mkdir(productsDir, { recursive: true });

    // Save the photo in the "products" folder
    const photoFilename = `${Date.now()}_${(photo as File).name}`;
    const photoPath = path.join(productsDir, photoFilename);

    // Write the photo to the products directory
    const buffer = await (photo as File).arrayBuffer();
    await fs.writeFile(photoPath, Buffer.from(buffer));

    // Construct the public URL for the saved photo
    const photoUrl = `/products/${photoFilename}`;

    // Connect to MongoDB and save the product with the photo URL
    await connect();
    await new ProductModel({
      name: productName,
      link: photoUrl,
      categoryId: category,
      price: Number(price), // Ensure it's stored as a number
      quantity: Number(quantity), // Ensure it's stored as a number
      description,
    }).save();

    return new Response(
      JSON.stringify({
        message: "Product added successfully",
        success: true,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error("error", error.message);
    return new Response(
      JSON.stringify({
        message: error.message,
        success: false,
      }),
      { status: 500 }
    );
  }
}


export async function GET(req: Request) {
  try {
  
    const url = new URL(req.url);
    
   
    const categoryId = url.searchParams.get("categoryId");

    if (!categoryId) {
      return new Response(
        JSON.stringify({ message: "Category ID is required", success: false }),
        { status: 400 }
      );
    }

    
    await connect();

    const products = await ProductModel.find({ categoryId })
    if (!products.length) {
      return new Response(
        JSON.stringify({ message: "No products found for this category", success: false }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ message: "Products retrieved successfully", success: true, products }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error("error", error.message);
    return new Response(
      JSON.stringify({
        message: error.message,
        success: false,
      }),
      { status: 500 }
    );
  }
}

