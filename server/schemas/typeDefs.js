const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Book {
    authors: [String]
    description: String
    bookId: ID
    image: String
    link: String
    title: String
  }

  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    user(username: String!): User
    books(username: String): [Book]
    book(bookId: ID!): Book
    singleBook(username: String, bookId: ID!): Book
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(
      authors: [String]
      description: String
      bookId: ID
      image: String
      link: String
      title: String
    ): User
    removeBook(bookId: ID!): User
    deleteBook(bookId: ID!): User
  }
  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;
