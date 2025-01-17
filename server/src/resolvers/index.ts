import { mergeResolvers } from "@graphql-tools/merge";
import { userResolver } from "./user.resolver";
import { orderResolver } from "./order.resolver";
import { productResolver } from "./product.resolver";

const mergedResolvers = mergeResolvers([
  userResolver,
  orderResolver,
  productResolver,
]);

export default mergedResolvers;
