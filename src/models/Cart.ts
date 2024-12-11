import mongoose, { Schema, Document, Types } from "mongoose";

export interface ICartItem {
    product: Types.ObjectId; 
    quantity: number;      
    selectedVariation?: {
        color?: string;      
        size?: string;  
        price?:number;    
    };
}

export interface ICart extends Document {
    user: Types.ObjectId;          
    items: ICartItem[];           
    totalPrice: number;            
    updatedAt: Date;            
}

const CartSchema = new Schema<ICart>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true, 
        },
        items: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },
                selectedVariation: {
                    color: { type: String },
                    size: { type: String },
                    price: { type: Number}, 
                    _id: {type:Schema.Types.ObjectId}
                },
            },
        ],
        totalPrice: {
            type: Number,
            required: true,
            default: 0, 
        },
    }, { versionKey: false ,  timestamps: true},
);

CartSchema.pre("save", async function (next) {
    if (!this.isModified("items")) return next();

    const cart = this as ICart;

    const Product = mongoose.model("Product"); 
    let total = 0;

    for (const item of cart.items) {
        const product = await Product.findById(item.product);
        if (product) {
            const variation = product.variations.find(
                (v: any) =>
                    v.color === item.selectedVariation?.color &&
                    v.size === item.selectedVariation?.size
            );

            if (variation) {
                total += variation.price * item.quantity;
            }
        }
    }

    cart.totalPrice = total;
    next();
});

export const Cart = mongoose.model<ICart>("Cart", CartSchema);