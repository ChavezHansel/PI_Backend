import mongoose, { Schema, Document, Types } from "mongoose";

interface IReview {
    user: Types.ObjectId; 
    rating: number; 
    comment: string; 
    createdAt: Date; 
}

interface IProduct extends Document {
    name: string;
    description: string;
    images: string[];
    category: Types.ObjectId;
    variations: IVariation[]; 
    specifications: ISpecification[]; 
    materials: string[]; 
    reviews: IReview[]; 
    discount: number; 
    isActive: boolean;
    createdAt?:Date;
    updatedAt?:Date;
}
interface ISpecification {
    key:string;
    value:string
}
interface IVariation {
    color: string;
    size: string;
    price: number;
    stock: number;
    maxItemsPerUser?: number; 
}

const ProductSchema = new Schema<IProduct>(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        images: { type: [String], required: true },
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        variations: {
            type: [
                {
                    color: { type: String, required: true },
                    size: { type: String, required: true },
                    price: { type: Number, required: true },
                    stock: { type: Number, required: true, min: 0 },
                    maxItemsPerUser: { type: Number, default: null },
                },
            ],
            required: true,
        },
        specifications: {
            type: [{
                key: { type: String, required: true },
                value: { type: String, required: true }
            }],
            required: false,
        },
        materials: {
            type: [String],
            required: false,
        },
        reviews: [
            {
                user: { type: Schema.Types.ObjectId, ref: "User" },
                rating: { type: Number, min: 1, max: 5 },
                comment: { type: String },
                createdAt: { type: Date, default: Date.now },
            },
        ],
        discount: { type: Number, default: 0 },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export const Product = mongoose.model<IProduct>("Product", ProductSchema);