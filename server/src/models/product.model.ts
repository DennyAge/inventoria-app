import mongoose, { Document } from "mongoose";

interface IPrice extends Document {
  value: number;
  symbol: string;
  isDefault: boolean;
}

interface IGuarantee extends Document {
  start: string;
  end: string;
}

export interface IProduct extends Document {
  serialNumber: string;
  isUsed: boolean;
  photo: string;
  title: string;
  type: string;
  specification: string;
  guarantee: IGuarantee;
  price: IPrice[];
  order: string;
  createdAt: Date;
  updatedAt: Date;
}
const ProductSchema = new mongoose.Schema(
  {
    serialNumber: {
      type: String,
      required: true,
    },
    isUsed: {
      type: Boolean,
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
      type: {
        start: String,
        end: String,
      },
      required: true,
    },
    price: {
      type: [
        {
          value: Number,
          symbol: String,
          isDefault: Boolean,
        },
      ],
      required: true,
    },
    order: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
export const Product = mongoose.model<IProduct>("Product", ProductSchema);
