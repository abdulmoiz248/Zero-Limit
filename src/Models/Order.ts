import mongoose, { Document, Schema } from 'mongoose';

export interface Order extends Document {
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  paymentMethod: 'credit card' | 'cash on delivery';
  paymentStatus: 'Paid' | 'Pending' | 'Failed';
  createdAt: Date;
  name: string;
  email: string;
  city: string;
  zipCode: string;
  country: string;
  products: Array<{ productId: string, size: string }>;  // Updated to store productId and size
  phone: string;
  address: string;
  total: number;
  review: string;
  rating: number;
}

const OrderSchema = new Schema<Order>({
  total: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
  },
  rating: {
    type: Number,
  },
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending',
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['credit card', 'cash on delivery'],
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
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  products: {
    type: [{
      productId: {
        type: String,
        required: true,
      },
      size: {
        type: String,
        required: true,
      },
    }],
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

const OrderModel = mongoose.models.Order || mongoose.model<Order>('Order', OrderSchema);

export default OrderModel;
