import mongoose, {Schema, Document, Types} from 'mongoose'
interface IOrder {
    customer: Types.ObjectId;
    products: {
        product: Types.ObjectId; 
        quantity: number;
    }[];
    totalPrice: number;
    status: "pending" | "processed" | "shipped" | "delivered";
    deliveryMethod: "store_pickup" | "home_delivery";
    address?: {
        street: string;
        city: string;
        zip: string;
        country: string;
    }; 
}
  
const OrderSchema = new Schema<IOrder>(
    {
        customer: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        products: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
            },
        ],
        totalPrice: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "processed", "shipped", "delivered"],
            default: "pending",
        },
        deliveryMethod: {
            type: String,
            enum: ["store_pickup", "home_delivery"],
            required: true,
        },
        address: {
            street: { type: String },
            city: { type: String },
            zip: { type: String },
            country: { type: String },
        },
    },
    { timestamps: true }
);
  
  export const Order = mongoose.model<IOrder>("Order", OrderSchema);
  