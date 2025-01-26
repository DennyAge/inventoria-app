import { Product } from "../models/product.model";
import { generateSerialNumber } from "../lib";
import { Order } from "../models/order.model";

export const productResolver = {
  Query: {
    products: async (_, __) => {
      try {
        return await Product.find();
      } catch (error) {
        console.log("Error getting products", error);
        throw new Error(error.message || "Error getting products");
      }
    },
    product: async (_, { productId }) => {
      try {
        return await Product.findById(productId);
      } catch (error) {
        console.log("Error getting product", error);
        throw new Error(error.message || "Error getting product");
      }
    },
  },
  Mutation: {
    createProduct: async (_, { input }) => {
      try {
        const { title, type, specification, guarantee, isUsed, price, order } =
          input;

        const startDate = new Date();
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + guarantee);

        const newProduct = new Product({
          serialNumber: generateSerialNumber(),
          isUsed,
          //TODO: later add AWS for upload img and add photo input
          photo: "devices.svg",
          title,
          type,
          specification,
          //TODO: later change logic for guarantee on BE and FE
          guarantee: {
            start: startDate.getTime(),
            end: endDate.getTime(),
          },
          price,
          order,
        });
        await newProduct.save();

        await Order.findByIdAndUpdate(order, {
          $push: { products: newProduct._id },
        });

        return newProduct;
      } catch (error) {
        console.log("Create product failed", error);
        throw new Error(error.message || "Create product failed");
      }
    },
    updateProduct: async (_, { productId, input }) => {
      try {
        const { title, type, specification, guarantee, price, isUsed } = input;

        const product = await Product.findById(productId);

        if (!product) {
          throw new Error("Product not found");
        }

        const updatedProduct = await Product.findByIdAndUpdate(
          productId,
          {
            isUsed,
            title,
            type,
            specification,
            //TODO: later change logic for guarantee on BE and FE
            guarantee,
            price,
          },
          { new: true },
        );
        if (!updatedProduct) {
          throw new Error("Product not found");
        }
        return updatedProduct;
      } catch (error) {
        console.log("Error updating product", error);
        throw new Error(error.message || "Error updating product");
      }
    },
    deleteProduct: async (_, { productId }) => {
      try {
        await Product.findByIdAndDelete(productId);
        await Order.updateMany(
          { products: productId },
          { $pull: { products: productId } },
        );
        return { message: "Delete successfully" };
      } catch (error) {
        console.error("Error on delete:", error);
        throw new Error(
          error instanceof Error ? error.message : "Internal server error",
        );
      }
    },
  },
};
