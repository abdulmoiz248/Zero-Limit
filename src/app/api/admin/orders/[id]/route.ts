import OrderModel from '@/Models/Order';
import connect from '@/dbConfig/dbConfig';

export async function POST(req: Request) {
  // Connect to the database
  await connect();

  try {
    // Parse the incoming request body
    const { id, status } = await req.json(); // Ensure to parse the body as JSON

    // Validate the ID (optional but recommended)
    if (!id) {
      return new Response(JSON.stringify({
        message: "Order ID is required.",
        success: false,
      }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    // Update the order status using the ID
    const updatedOrder = await OrderModel.findByIdAndUpdate(id, { status }, { new: true });

    // Check if the order was found and updated
    if (!updatedOrder) {
      return new Response(JSON.stringify({
        message: "Order not found",
        success: false,
      }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }

    // Return the updated order
    return new Response(JSON.stringify({
      order: updatedOrder,
      success: true,
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (error) {
    console.error("Error updating order:", error); // Log the error for debugging

    // Return a generic error response
    return new Response(JSON.stringify({
      error: "An error occurred while updating the order.",
      success: false,
    }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
