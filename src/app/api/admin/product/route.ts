import connect from "@/dbConfig/dbConfig";
import ProductModel from "@/Models/Product";
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const productName = formData.get("productName");
    const photos = formData.getAll("photo");
    const category = formData.get("category");
    const price = formData.get("price");
    const quantity = formData.get("quantity");
    const description = formData.get("description");

    // Validate input
    if (!productName || photos.length === 0 || !category || !price || !quantity || !description) {
      return new Response(
        JSON.stringify({ message: "Invalid data", success: false }),
        { status: 400 }
      );
    }

    // Directory to save product images
    const productsDir = path.join(process.cwd(), 'public', 'products');
    await fs.mkdir(productsDir, { recursive: true });

    const photoUrls: string[] = [];
    for (const photo of photos) {
      const photoFilename = `${Date.now()}_${(photo as File).name}`;
      const photoPath = path.join(productsDir, photoFilename);

      const buffer = await (photo as File).arrayBuffer();
      await fs.writeFile(photoPath, Buffer.from(buffer));

      photoUrls.push(`/products/${photoFilename}`);
    }

    console.log('Photo URLs:', photoUrls);

    await connect();

    // Explicitly create a new product with correct types
    const newProduct = new ProductModel({
      name: productName,
      link: [...photoUrls], // Explicitly recognized as an array
      categoryId: category,
      price: Number(price),
      quantity: Number(quantity),
      description,
    });

    console.log('Product object before save:', JSON.stringify(newProduct, null, 2));

    await newProduct.save();

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
