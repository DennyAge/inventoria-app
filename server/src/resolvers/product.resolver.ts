import { products } from "../mockData";

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
  Mutation: {},
};
