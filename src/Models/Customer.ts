import mongoose, { Document,Schema } from 'mongoose';

export interface Customer extends Document {
    email: string;
    password: string;
    name:string;
    createdAt:Date;
}

const CustomerSchema = new Schema<Customer>({
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    
});

const CustomerModel = mongoose.models.Customer || mongoose.model<Customer>('Customer', CustomerSchema);

export default CustomerModel;