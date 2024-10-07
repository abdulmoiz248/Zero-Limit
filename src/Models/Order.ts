import mongoose, { Document, Schema } from 'mongoose';


export interface Order extends Document {
  cartId: mongoose.Types.ObjectId; 
  customerId: mongoose.Types.ObjectId;
  totalPrice: number; 
  status: string; 
  shippingAddress: string;
  paymentMethod: string;
  paymentStatus: string; 
  createdAt: Date; 
}


const OrderSchema = new Schema<Order>({
  cartId: {
    type: Schema.Types.ObjectId,
    ref: 'Cart', // Reference to the Cart model
    required: true,
  },
  customerId: {
    type: Schema.Types.ObjectId,
    ref: 'Customer', // Reference to the User model
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'], // Possible order statuses
    default: 'Pending', // Default status
  },
  shippingAddress: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['credit card', 'paypal', 'bank transfer','cash on delivery'], 
  },
  paymentStatus: {
    type: String,
    required: true,
    enum: ['Paid', 'Pending', 'Failed'], 
    default: 'Pending', 
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
 
});


const OrderModel = mongoose.models.Order || mongoose.model<Order>('Order', OrderSchema);

export default OrderModel;
