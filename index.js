import express from "express";
import dotenv from "dotenv";
import { PORT } from "./src/config/config.js";
import connectionDB from "./src/db/db.js";
import booksRoutes from "./src/routes/book.routes.js";

dotenv.config("");

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/v1/books/", booksRoutes);

app.use("*", (req, res) => {
  res.send("this route does not find");
});

connectionDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
