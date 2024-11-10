import mongoose, { Document, Schema, Types } from 'mongoose';

export interface Product extends Document {
  name: string;
  link: string[]; // Corrected to just 'link' (array of strings)
  categoryId: Types.ObjectId;
  price: number;
  featured: boolean;
  discount: boolean;
  discountPercent: number;
  quantity: number;
  description: string;
  ratings: number;
  numReviews: number;
  size:string;
}

const ProductSchema = new Schema<Product>({
  size: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  link: { 
    type: [String], 
    required: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Categories', // Reference to the Product Categories schema
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0, // Optional: You can enforce non-negative price
  },
  featured: {
    type: Boolean,
    default: false,
  },
  discount: {
    type: Boolean,
    default: false,
  },
  discountPercent: {
    type: Number,
    default: 0,
    min: 0, // Ensures discount percent is not negative
    max: 100, // Optional: You can enforce maximum discount percentage
  },
  quantity: {
    type: Number,
    required: true,
    min: 0, // Ensure quantity is not negative
  },
  description: {
    type: String,
    required: true,
  },
  ratings: {
    type: Number,
    default: 5,
    min: 0,
    max: 5,
  },
  numReviews: {
    type: Number,
    default: 0,
    min: 0, // Optional: Ensure the number of reviews is non-negative
  },
});

const ProductModel = mongoose.models.Product || mongoose.model<Product>('Product', ProductSchema);

export default ProductModel;
