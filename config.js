/** Common config for bookstore. */

// npm install dotenv
require("dotenv").config();

if (process.env.NODE_ENV === "test") {
  DB_URI = `postgresql://postgres:${process.env.PASSWORD}@localhost:5432/bookstest`;
} else {
  DB_URI = process.env.DATABASE_URL || `postgresql://postgres:${process.env.PASSWORD}@localhost:5432/books`;
}


module.exports = { DB_URI };