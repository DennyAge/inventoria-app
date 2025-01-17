import gql from "graphql-tag";

export const productTypeDef = gql`
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
    _id: ID
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

  type Query {
    products: [Product!]
    product(productId: ID!): Product
  }

  type Mutation {
    createProduct(input: CreateProductInput!): Product!
    updateProduct(input: UpdateProductInput!): Product!
    deleteProduct(productId: ID!): Product!
  }

  input PriceInput {
    value: Float
    symbol: String
    isDefault: Int
  }

  input GuaranteeInput {
    start: String
    end: String
  }

  input CreateProductInput {
    serialNumber: Int
    isNew: Int
    photo: String
    title: String!
    type: String!
    specification: String
    guarantee: GuaranteeInput
    price: [PriceInput]
    order: Int
    date: String
  }

  input UpdateProductInput {
    photo: String
    title: String
    type: String
    specification: String
    guarantee: GuaranteeInput
    price: [PriceInput]
    date: String
  }
`;

export default productTypeDef;
