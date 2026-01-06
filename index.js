const express = require("express");
const cors = require("cors");
const app = express();

const { initializeDatabase }   = require('./db/db.connect.js');

const Book = require("./models/book.models.js");
    console.log(Book)

app.use(cors());
app.use(express.json());

initializeDatabase();
//Q1 of BE4_Assignment1
app.post("/books", async (req, res) => {

  try {
    const book = new Book(req.body);
    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Q3 of BE4_Assignment1
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Q4 of BE4_Assignment1
app.get("/books/title/:title", async (req, res) => {
  try {
    const book = await Book.findOne({ title: req.params.title });
    if (!book) {
      return res.status(404).json({ message: "Book does not exist" });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Q5 of BE4_Assignment1
app.get("/books/author/:author", async (req, res) => {
  try {
    const books = await Book.find({ author: req.params.author });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Q6 of BE4_Assignment1
app.get("/books/genre/:genre", async (req, res) => {
  const genre = req.params.genre
  try {
    const books = await Book.find({ genre: genre });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Q7 of BE4_Assignment1
app.get("/books/year/:year", async (req, res) => {
  const year = parseInt(req.params.year);
  try {
    const books = await Book.find({ publishedYear: year });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Q8 of BE4_Assignment1
app.post("/books/:id/rating", async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { rating: req.body.rating },
      { new: true }
    );

    if (!book) {
      return res.status(404).json({ message: "Book does not exist" });
    }

    res.json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Q9 of BE4_Assignment1
app.post("/books/update/:title", async (req, res) => {
  try {
    const book = await Book.findOneAndUpdate(
      { title: req.params.title },
      req.body,
      { new: true }
    );

    if (!book) {
      return res.status(404).json({ message: "Book does not exist" });
    }

    res.json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Q10 of BE4_Assignment1
app.delete("/books/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});







//Vercel Deployement Assignment
const users = [
  {
    id: 1,
    username: "octocat",
    name: "The Octocat",
    repoCount: 8,
    location: "San Francisco",
  },
  {
    id: 2,
    username: "torvalds",
    name: "Linus Torvalds",
    repoCount: 25,
    location: "Portland",
  },
  {
    id: 3,
    username: "gaearon",
    name: "Dan Abramov",
    repoCount: 50,
    location: "London",
  },
  {
    id: 4,
    username: "addyosmani",
    name: "Addy Osmani",
    repoCount: 42,
    location: "Mountain View",
  },
  {
    id: 5,
    username: "tj",
    name: "TJ Holowaychuk",
    repoCount: 150,
    location: "Victoria",
  },
];

app.get("/users", (req, res) => {
  res.json({ users });
});

app.get("/users/:id", (req, res) => {
  let userId = parseInt(req.params.id);
  let user = users.find((user) => user.id === userId);

  if (user) {
    res.json({ user });
  } else {
    res.status(404).json({ message: "User not found." });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});