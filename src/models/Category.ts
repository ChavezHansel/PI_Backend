import mongoose, { Schema, Document, Types } from "mongoose";
interface ICategory extends Document {
    name: string;
    description?: string;
    image?:string;
    parent?: Types.ObjectId;
}

const CategorySchema = new Schema<ICategory>(
    {
        name: { type: String, required: true , unique:true },
        description: { type: String },
        image:{ type: String },
        parent: { type: Schema.Types.ObjectId, ref: "Category" },
    },
    { timestamps: true }
);

export const Category = mongoose.model<ICategory>("Category", CategorySchema);
