import mongoose, { Document } from "mongoose";
import { IProduct } from "./product.model";

interface IOrder extends Document {
  title: string;
  description: string;
  products: IProduct[];
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
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
export const Order = mongoose.model<IOrder>("Order", OrderSchema);
