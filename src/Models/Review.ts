import mongoose, { Document,Schema } from 'mongoose';

export interface Review extends Document {
    username: string;
    body: string;
    date: Date;
    rating: number;
    productId: string;
}

const ReviewSchema = new Schema<Review>({
    username: {
        type: String,
        required: true,
      
    },
    productId: {
        type: String,
        required: true,
        
    },
    body: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    }
});

const ReviewModel = mongoose.models.Review || mongoose.model<Review>('Review', ReviewSchema);

export default ReviewModel;