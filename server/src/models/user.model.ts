import mongoose, { Document } from "mongoose";

interface IUser extends Document {
  fullName: string;
  email: string;
  authentication: {
    password: string;
    salt: string;
    sessionToken: string;
  };
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      required: true,
    },
    authentication: {
      password: {
        type: String,
        required: true,
        select: false,
      },
      salt: {
        type: String,
        select: false,
      },
      sessionToken: {
        type: String,
        select: false,
      },
    },
  },
  {
    timestamps: true,
  },
);
export const User = mongoose.model<IUser>("User", UserSchema);
