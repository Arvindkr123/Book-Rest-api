import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  price: {
    type: Number,
    required: true,
  },
});

const BookModel = mongoose.model("Book", bookSchema);

export default BookModel;
