import { orders } from "../mockData";

export const orderResolver = {
  Query: {
    orders: (_, __, context) => {
      return orders;
    },
    order: (_, { orderId }, context) => {
      const user = context.req?.user;
      if (!user) {
        return;
      }
      return orders.find((order) => order._id === orderId);
    },
  },
  Mutation: {},
};
