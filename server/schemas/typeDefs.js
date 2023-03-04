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
    user(username: String!): User
    books(username: String): [Book]
    book(bookId: ID!): Book
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User
    saveBook(bookData: BookInput!): User
    deleteBook(bookId: ID!): User
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
