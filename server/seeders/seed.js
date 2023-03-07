const db = require("../config/connection");
const { User, Book } = require("../models");
const userData = require("./userData.json");
const bookData = require("./bookData.json");

db.once("open", async () => {
  await User.deleteMany({});
  // await Book.deleteMany({});

  const users = await User.insertMany(userData);
  // const books = await Book.insertMany(bookData);

  for (let i = 0; i < users.length; i++) {
    const tempBook = users[i];
    const tempUser = users[Math.floor(Math.random() * users.length)];
    tempUser.savedBooks.push(tempBook);
    await tempUser.save();
  }
  console.log("😊 all done 😊");
  process.exit(0);
});
