import { Book } from "../models/bookSchema.js";

export const createBook = async (req, res) => {
  console.log("create");
  try {
    const body = req.body;

    const book = {
      bookName: body.bookName,
      description: body.description,
      publishedAt: body.publishedAt,
    };
    console.log("book", book);
    await Book.create(book);

    res.status(200).send("Successfully added a book");
  } catch (error) {
    res.status(500).send("Failed to create a book");
  }
};

export const getBookName = async (req, res) => {
  try {
    console.log("req body", req.body);
    const message = req.body;
    res.json({ message: "Hello from you express backend" });
  } catch (error) {
    res.status(500).send("Error getting book name");
  }
};

export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();

    res.json(books);
  } catch (error) {
    res.status(500).send("cant find books");
  }
};

export const deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.body.id);

    res.send("success");
  } catch (error) {
    res.send("failed");
  }
};

export const updateBook = async (req, res) => {
  try {
    const bookId = req.body.id;

    const newBook = {
      bookName: req.body.bookName,

      description: req.body.description,

      publishedAt: req.body.publishedAt,
    };

    const updatedBook = await Book.findByIdAndUpdate(bookId, newBook);

    res.send("Changed the book", bookId);
  } catch (error) {
    res.send("Failed to change");
  }
};
