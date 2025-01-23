import { Order } from "../models/order.model";
import { Product } from "../models/product.model";

export const orderResolver = {
  Query: {
    orders: async () => {
      try {
        return await Order.find();
      } catch (error) {
        console.log("Error getting orders", error);
        throw new Error(error.message || "Error getting orders");
      }
    },
    order: async (_, { orderId }) => {
      try {
        return await Order.findById(orderId);
      } catch (error) {
        console.log("Error getting order", error);
        throw new Error(error.message || "Error getting order");
      }
    },
  },
  Mutation: {
    createOrder: async (_, { input }) => {
      try {
        const { title, description, products } = input;
        const newOrder = new Order({
          title,
          description,
          products,
        });
        await newOrder.save();

        return newOrder;
      } catch (error) {
        console.log("Create order failed", error);
        throw new Error(error.message || "Create order failed");
      }
    },
    updateOrder: async (_, { orderId, input }) => {
      try {
        const { title, description } = input;

        const order = await Order.findById(orderId);
        if (!order) {
          throw new Error("Order not found");
        }

        const updatedOrder = await Order.findByIdAndUpdate(
          orderId,
          {
            title,
            description,
          },
          { new: true },
        );
        if (!updatedOrder) {
          throw new Error("Order not found");
        }
      } catch (error) {
        console.log("Error updating order", error);
        throw new Error(error.message || "Error updating order");
      }
    },
    deleteOrder: async (_, { orderId }) => {
      try {
        const order = await Order.findById(orderId);

        if (!order) {
          throw new Error("Order not found");
        }
        const productIds = order.products;
        await Order.findByIdAndDelete(orderId);
        await Product.deleteMany({ _id: { $in: productIds } });
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
