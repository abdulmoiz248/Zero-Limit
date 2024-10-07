import mongoose, { Document,Schema } from 'mongoose';

export interface Member extends Document {
    email: string;
}

const MemberSchema = new Schema<Member>({
    email: {
        type: String,
        required: true,
        unique: true,
    },
});

const MemberModel = mongoose.models.Member || mongoose.model<Member>('Member', MemberSchema);

export default MemberModel;