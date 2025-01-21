import { products } from "../mockData";
import { Product } from "../models/product.model";
import { generateSerialNumber } from "../lib";

export const productResolver = {
  Query: {
    products: (_, __, context) => {
      const user = context.req?.user;
      if (!user) {
        return;
      }
      return products;
    },
    product: (_, { productId }, context) => {
      const user = context.req?.user;
      if (!user) {
        return;
      }
      return products.find((product) => product._id === productId);
    },
  },
  Mutation: {
    createProduct: async (_, { input }) => {
      try {
        const { photo, title, type, specification, guarantee, price, order } =
          input;
        const newProduct = new Product({
          serialNumber: generateSerialNumber(),
          isNew: true,
          photo,
          title,
          type,
          specification,
          guarantee,
          price,
          order,
          date: new Date(),
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
            isNew: true,
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
        const deletedProduct = await Product.findByIdAndDelete(productId);
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
