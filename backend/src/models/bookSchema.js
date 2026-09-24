import mongoose, { Schema } from "mongoose";

const bookSchema = new Schema({
  bookName: { type: String, required: true },
  publishedAt: { type: String },
});
export const Book = mongoose.model("book", bookSchema);
