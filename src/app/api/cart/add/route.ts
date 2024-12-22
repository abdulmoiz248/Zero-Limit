import { NextRequest, NextResponse } from 'next/server';
import connect from '@/dbConfig/dbConfig'; // Use your existing connection function
import mongoose from 'mongoose';

// Define a schema if not already defined elsewhere
const cartEventSchema = new mongoose.Schema({
  customerId: { type: String, required: true },
  productId: { type: String, required: true },
  size: { type: String, required: true },
  addedAt: { type: Date, default: Date.now },
});

// Use a compiled model or create one if not already present
const CartEvent =
  mongoose.models.CartEvent || mongoose.model('CartEvent', cartEventSchema);

export async function POST(req: NextRequest) {
  const { customerId, productId, size } = await req.json();

  // Validate required fields
  if (!customerId || !productId || !size) {
    return NextResponse.json(
      { message: 'Missing required fields' },
      { status: 400 }
    );
  }

  try {
    // Ensure the database is connected
    await connect();

    // Log the cart event in the database
    const cartEvent = new CartEvent({ customerId, productId, size });
    await cartEvent.save();

    return NextResponse.json(
      { message: 'Event logged successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error logging cart event:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
