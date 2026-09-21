import mongoose, { Schema } from "mongoose";

const bookSchema = new Schema({
  bookName: { type: String, required: true },
  description: { type: String, required: true },
});
export const Book = mongoose.model("book", bookSchema);
