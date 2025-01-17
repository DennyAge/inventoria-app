import { products } from "../mockData";

export const productResolver = {
  Query: {
    products: () => {
      return products;
    },
    product: (_, { productId }) => {
      return products.find((product) => product._id === productId);
    },
  },
  Mutation: {},
};
