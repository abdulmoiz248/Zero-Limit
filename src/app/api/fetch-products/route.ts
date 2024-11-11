import { NextResponse } from 'next/server';
import connect from '@/dbConfig/dbConfig';
import ProductModel from '@/Models/Product';


export async function GET() {
  try {
    await connect();

    const products = await ProductModel.find();
    
    return NextResponse.json({
      products,
      success: true,
    },{status: 200});
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' ,success:false},
      { status: 500 }
    );
  }
}
