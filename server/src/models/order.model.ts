import mongoose, { Document } from "mongoose";
import { IProduct } from "./product.model";

interface IOrder extends Document {
  title: string;
  date: string;
  description: string;
  products: IProduct[];
}
const OrderSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    date: {
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
