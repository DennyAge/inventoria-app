import mongoose, { Document } from "mongoose";

interface IOrder extends Document {
  title: string;
  description: string;
  products: string[];
  createdAt: Date;
  updatedAt: Date;
}
const OrderSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    products: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
export const Order = mongoose.model<IOrder>("Order", OrderSchema);
