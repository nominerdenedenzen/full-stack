import { Router } from "express";
import {
  createBook,
  deleteBook,
  getBookName,
  getBooks,
  updateBook,
} from "../controller/book.js";

export const bookRouter = Router();
bookRouter
  .post("/", createBook)
  .post("/", getBookName)
  .get("/", getBooks)
  .delete("/", deleteBook)
  .put("/", updateBook);
