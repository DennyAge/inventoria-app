import { mergeTypeDefs } from "@graphql-tools/merge";

import userTypeDef from "./user.typeDef";
import orderTypeDef from "./order.typeDef";
import productTypeDef from "./product.typeDef";

const mergedTypeDefs = mergeTypeDefs([
  userTypeDef,
  orderTypeDef,
  productTypeDef,
]);

export default mergedTypeDefs;
