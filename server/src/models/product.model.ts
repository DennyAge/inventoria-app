import mongoose, { Document } from "mongoose";

interface IPrice extends Document {
  value: number;
  symbol: string;
  isDefault: number;
}

interface IGuarantee extends Document {
  start: string;
  end: string;
}
// @ts-ignore
export interface IProduct extends Document {
  serialNumber: number;
  isNew: number;
  photo: string;
  title: string;
  type: string;
  specification: string;
  guarantee: IGuarantee;
  price: IPrice[];
  order: number;
  date: string;
}
const ProductSchema = new mongoose.Schema(
  {
    serialNumber: {
      type: Number,
      required: true,
    },
    isNew: {
      type: Number,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    specification: {
      type: String,
      required: true,
    },
    guarantee: {
      type: Array,
      required: true,
    },
    price: {
      type: Object,
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
export const Product = mongoose.model<IProduct>("Product", ProductSchema);
