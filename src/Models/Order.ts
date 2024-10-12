import mongoose, { Document, Schema } from 'mongoose';

export interface Order extends Document {
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled'; // Updated to match enum
  paymentMethod: 'credit card' | 'cash on delivery'; // Updated to match enum
  paymentStatus: 'Paid' | 'Pending' | 'Failed'; // Updated to match enum
  createdAt: Date; // Added to match the schema
  name: string; // Added for additional info if needed
  email: string; // Added for additional info if needed
  city: string; // Added for additional info if needed
  zipCode: string; // Added for additional info if needed
  country: string; // Added for additional info if needed
  products: string[]; // Added for additional info if needed
  phone: string; // Added for additional info if needed
  address: string; // Added for additional info if needed
  otp: string; // Added
}

const OrderSchema = new Schema<Order>({
  otp:{
    type: String,
    required: true, 
  },
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'], // Possible order statuses
    default: 'Pending', // Default status
  },
  
  paymentMethod: {
    type: String,
    required: true,
    enum: ['credit card',  'cash on delivery'], 
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
    required: true, // Optional: make required if needed
  },
  email: {
    type: String,
    required: true, // Optional: make required if needed
  },
  address: {
    type: String,
    required: true, // Optional: make required if needed
  },
  city: {
    type: String,
    required: true, // Optional: make required if needed
  },
  zipCode: {
    type: String,
    required: true, // Optional: make required if needed
  },
  country: {
    type: String,
    required: true, // Optional: make required if needed
  },
  products: {
    type: [String], // Array of product IDs or names
    required: true, // Optional: make required if needed
  },
  phone: {
    type: String,
    required: true, // Optional: make required if needed
  },
});

// Create or use existing Order model
const OrderModel = mongoose.models.Order || mongoose.model<Order>('Order', OrderSchema);

export default OrderModel;
