import { orders } from "../mockData";

export const orderResolver = {
  Query: {
    orders: () => {
      return orders;
    },
    order: (_, { orderId }) => {
      return orders.find((order) => order._id === orderId);
    },
  },
  Mutation: {},
};
