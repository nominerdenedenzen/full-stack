import { connectDB } from "./src/database/db.js";
import express from "express";
import { bookRouter } from "./src/route/book.js";
import cors from "cors";
const app = express();
const port = 8000;

connectDB();
app.use(cors());
app.use(express.json());
app.use("/book", bookRouter);
app.get("/", (req, res) => res.json({ message: "he is coming" }));

app.listen(port, () => {
  console.log("server has started successfully on:", port);
});
