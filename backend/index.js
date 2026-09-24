import { connectDB } from "./src/database/db.js";
import express from "express";
import { bookRouter } from "./src/route/auth/auth.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use("/book", bookRouter);
connectDB();
app.get("/", (req, res) => res.json({ message: "he is coming" }));

app.listen(port, () => {
  console.log("server has started successfully on:", port);
});
