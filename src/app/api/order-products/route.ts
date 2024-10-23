
import connect from "@/dbConfig/dbConfig";
import ProductModel from "@/Models/Product";

export async function POST(req: Request) {
  try {
    await connect();
    const {products}=await req.json();

    const productsArr = await ProductModel.find({
        _id: { $in: products },
      });
      
    return Response.json({ products: productsArr ,success: true},{status: 200});

  }catch(err){
    console.log(err);  
    return Response.json({ message:"Error loading" ,success: false},{status: 500});
  }
}