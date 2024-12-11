import { Schema, model, Document } from "mongoose";

interface IPriceRange extends Document {
    name: string;
    minPrice: number;
    maxPrice: number;
}

const PriceRangeSchema = new Schema<IPriceRange>({
    name: { type: String, required: true },
    minPrice: { type: Number, required: true },
    maxPrice: { type: Number, required: true },
}, { timestamps: true });

const PriceRange = model<IPriceRange>("PriceRange", PriceRangeSchema);

export { PriceRange, IPriceRange };