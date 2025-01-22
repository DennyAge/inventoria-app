import { Product } from "../models/product.model";
import { generateSerialNumber } from "../lib";

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
        const { title, type, specification, price, order } = input;

        const startDate = new Date();
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + 6);

        const newProduct = new Product({
          serialNumber: generateSerialNumber(),
          isUsed: false,
          //TODO: later add AWS for upload img and add photo input
          photo: "devices.svg",
          title,
          type,
          specification,
          //TODO: add another method for guarantee
          guarantee: {
            start: startDate.toISOString(),
            end: endDate.toISOString(),
          },
          price,
          order,
        });
        await newProduct.save();

        return newProduct;
      } catch (error) {
        console.log("Create product failed", error);
        throw new Error(error.message || "Create product failed");
      }
    },
    updateProduct: async (_, { productId, input }) => {
      try {
        const { photo, title, type, specification, guarantee, price, order } =
          input;

        const product = await Product.findById(productId);

        if (!product) {
          throw new Error("Product not found");
        }

        const updatedProduct = await Product.findByIdAndUpdate(
          productId,
          {
            isUsed: false,
            photo,
            title,
            type,
            specification,
            guarantee,
            price,
            order,
          },
          { new: true },
        );
        if (!updatedProduct) {
          throw new Error("Product not found");
        }
      } catch (error) {
        console.log("Error updating product", error);
        throw new Error(error.message || "Error updating product");
      }
    },
    deleteProduct: async (_, { productId }) => {
      try {
        await Product.findByIdAndDelete(productId);
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
