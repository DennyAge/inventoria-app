import gql from "graphql-tag";

export const productTypeDef = gql`
  type Price {
    value: Float!
    symbol: String!
    isDefault: Boolean!
  }

  type Guarantee {
    start: String!
    end: String!
  }

  type Product {
    _id: ID!
    serialNumber: String!
    isUsed: Boolean!
    photo: String!
    title: String!
    type: String!
    specification: String!
    guarantee: Guarantee!
    price: [Price]!
    order: ID!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    products: [Product!]
    product(productId: ID!): Product
  }

  type Mutation {
    createProduct(input: CreateProductInput!): Product!
    updateProduct(productId: ID!, input: UpdateProductInput!): Product!
    deleteProduct(productId: ID!): DeleteProductResponse
  }

  input PriceInput {
    value: Float!
    symbol: String!
    isDefault: Boolean!
  }

  input GuaranteeInput {
    start: String!
    end: String!
  }

  input CreateProductInput {
    serialNumber: String
    isUsed: Boolean
    photo: String
    title: String!
    type: String!
    specification: String
    guarantee: GuaranteeInput
    price: [PriceInput]!
    order: ID!
  }

  input UpdateProductInput {
    photo: String
    title: String
    type: String
    specification: String
    guarantee: GuaranteeInput
    price: [PriceInput]
  }
  type DeleteProductResponse {
    message: String!
  }
`;

export default productTypeDef;
