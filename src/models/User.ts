import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: "admin" | "customer" | "employee";
    confirmed: boolean;
    active:boolean;
    isGoogleUser:boolean;
    address?: {
        street: string;
        city: string;
        zip: string;
        country: string;
    };
}

const UserSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: false },
        role: {
            type: String,
            enum: ["admin", "customer", "employee"],
            required: true,
        },
        confirmed: {
            type: Boolean,
            default: false
        },
        active: {
            type: Boolean,
            default: true
        },
        isGoogleUser: { type: Boolean, default: false }, 
        address: {
            street: { type: String },
            city: { type: String },
        },
    },
    { timestamps: true }
);

export const User = mongoose.model<IUser>("User", UserSchema);
