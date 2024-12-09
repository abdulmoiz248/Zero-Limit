import mongoose, { Document, Schema, Types } from 'mongoose';

export interface Product extends Document {
  name: string;
  link: string[];
  categoryId: Types.ObjectId;
  price: number;
  featured: boolean;
  discount: boolean;
  discountPercent: number;
  description: string;
  ratings: number;
  numReviews: number;
  size: Record<string, number>; // Defines an object with size keys and quantity values
  unisex: boolean;
}

const ProductSchema = new Schema<Product>({
  size: {
    type: Map, // Use a Map to store size and quantity pairs
    of: Number,
    required: true,
  },
  unisex:{
    type:Boolean,
    default: false,
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
    ref: 'Categories',
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
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
    min: 0,
    max: 100,
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
    min: 0,
  },
});

const ProductModel = mongoose.models.Product || mongoose.model<Product>('Product', ProductSchema);

export default ProductModel;
