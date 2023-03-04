const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Book {
    bookId: ID
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Query {
    me: User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User
    saveBook(bookData: BookInput!): User
    deleteBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;
