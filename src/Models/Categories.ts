import mongoose, { Document,Schema } from 'mongoose';

export interface Categories extends Document {
    name:string;
    link:string;
}

const CategoriesSchema = new Schema<Categories>({
    link: {
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
    }
});

const CategoriesModel = mongoose.models.Categories || mongoose.model<Categories>('Categories', CategoriesSchema);

export default CategoriesModel;