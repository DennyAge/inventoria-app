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
    updateOrder(orderId: ID!, input: UpdateOrderInput!): Order!
    deleteOrder(orderId: ID!): DeleteOrderResponse
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
  type DeleteOrderResponse {
    message: String!
  }
`;

export default orderTypeDef;
