import mongoose, { Document,Schema } from 'mongoose';

export interface Admin extends Document {
    email: string;
    password: string;
}

const adminSchema = new Schema<Admin>({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const AdminModel = mongoose.models.Admin || mongoose.model<Admin>('Admin', adminSchema);

export default AdminModel;