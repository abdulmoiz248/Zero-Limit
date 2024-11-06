import OrderModel from '@/Models/Order';
import connect from '@/dbConfig/dbConfig';
import { sendOrderDeliveredEmail } from '@/helper/delieveredEmail';
import { sendOrderShippedEmail } from '@/helper/shippedEmail';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  await connect();

  try {
  
    const { status ,email,shippingId} = await req.json();

    
    const { id } = params;
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

    if(shippingId && email){
     await sendOrderShippedEmail(email,"2-3 days",shippingId);
    }else if(status=='Delivered'){
      await sendOrderDeliveredEmail(email,id);
    }
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
