const { Book, User } = require("../models");

const resolvers = {
  Query: {
    books: async () => {
      return Book.find({});
    },
    users: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return User.find(params);
    },
  },
  Mutation: {
    createUser: async (parent, args) => {
      const user = await User.create(args);
      return user;
    },
    saveBook: async (parent, args) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: args._id },
        { $addToSet: { savedBooks: args } },
        { new: true, runValidators: true }
      );
      return updatedUser;
    },
    deleteBook: async (parent, args) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: args._id },
        { $pull: { savedBooks: { bookId: args.bookId } } },
        { new: true }
      );
      return updatedUser;
    },
  },
};

module.exports = resolvers;
