import mongoose, { Document, Schema } from 'mongoose';


export interface Cart extends Document {
  userId: mongoose.Types.ObjectId;
  products: { productId: mongoose.Types.ObjectId; quantity: number }[]; 
 
}


const CartSchema = new Schema<Cart>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Customer', 
    required: true,
  },
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product', 
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1, 
      },
    },
  ],
  
});


const CartModel = mongoose.models.Cart || mongoose.model<Cart>('Cart', CartSchema);

export default CartModel;
