import gql from "graphql-tag";

export const orderTypeDef = gql`
  type Order {
    _id: ID
    title: String!
    date: String!
    description: String
    products: [Product]
  }

  type Query {
    orders: [Order!]
    order(orderId: ID!): Order
  }

  type Mutation {
    createOrder(input: CreateOrderInput!): Order!
    updateOrder(input: UpdateOrderInput!): Order!
    deleteOrder(orderId: ID!): Order!
  }

  input CreateOrderInput {
    title: String!
    date: String!
    description: String
    products: [CreateProductInput]
  }

  input UpdateOrderInput {
    title: String
    date: String
    description: String
    products: [UpdateProductInput]
  }
`;

export default orderTypeDef;
