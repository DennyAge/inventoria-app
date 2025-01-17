import gql from "graphql-tag";

export const typeDefs = gql`
  type Price {
    value: Float
    symbol: String
    isDefault: Int
  }

  type Guarantee {
    start: String
    end: String
  }

  type Product {
    id: ID
    serialNumber: Int
    isNew: Int
    photo: String
    title: String
    type: String
    specification: String
    guarantee: Guarantee
    price: [Price]
    order: Int
    date: String
  }

  type Order {
    id: ID
    title: String
    date: String
    description: String
  }

  type User {
    fullName: String
    email: String
  }

  type Query {
    products: [Product!]!
    orders: [Order!]!
    user: User!
  }
`;
