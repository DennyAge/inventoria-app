import gql from "graphql-tag";

export const orderTypeDef = gql`
  type Order {
    _id: ID!
    title: String!
    description: String!
    products: [ProductIds]!
    createdAt: String!
    updatedAt: String!
  }
  type ProductIds {
    id: ID!
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
    description: String!
    products: [ProductIdsInput]!
  }

  input UpdateOrderInput {
    title: String
    description: String
    products: [ProductIdsInput]
  }
  input ProductIdsInput {
    id: ID!
  }
  type DeleteOrderResponse {
    message: String!
  }
`;

export default orderTypeDef;
