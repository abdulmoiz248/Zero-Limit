import mongoose, { Document, Schema, Types } from 'mongoose';

export interface Product extends Document {
  name: string;
  link: string;
  categoryId: Types.ObjectId;
  price: number;
  featured: boolean;
  discount: boolean;
  discountPercent: number;
  quantity: number;
  description: string;
  ratings: number;
  numReviews: number;
 
}

const ProductSchema = new Schema<Product>({
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
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
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    required: true,
  },
   ratings: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
   
});

const ProductModel = mongoose.models.Product || mongoose.model<Product>('Product', ProductSchema);

export default ProductModel;
