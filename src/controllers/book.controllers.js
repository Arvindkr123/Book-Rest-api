import BookModel from "../models/book.models.js";

export const getAllBooksControllers = async (req, res, next) => {
  try {
    const allBooks = await BookModel.find({});
    res.status(200).json(allBooks);
  } catch (error) {
    console.log(error);
  }
};

export const addBookController = async (req, res, next) => {
  try {
    const { name, description, price } = req.body;
    if (!name) {
      return res
        .status(401)
        .json({ success: false, message: "Book Name is required!" });
    }
    if (!description) {
      return res
        .status(401)
        .json({ success: false, message: "Book description is required!" });
    }
    if (!price) {
      return res
        .status(401)
        .json({ success: false, message: "Book price is required!" });
    }
    const existedBook = await BookModel.findOne({ name });
    if (existedBook) {
      res.status(401).json({
        success: false,
        message: "Already existed this book with name",
      });
    }

    const newBook = new BookModel({
      ...req.body,
    });

    await newBook.save();

    res
      .status(201)
      .json({ success: true, message: "Book created successfully!" });
  } catch (error) {
    console.log(error);
  }
};

export const getSingleBookIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(404)
        .json({ success: false, message: "Please provide ID" });
    }
    const singleBook = await BookModel.findById(id);

    if (!singleBook) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }

    res.status(200).send(singleBook);
  } catch (error) {
    console.log(error);
  }
};

export const editSingleBookByIdController = async (req, res, next) => {
  try {
    const { name, description, price } = req.body;
    const { id } = req.params;
    const singleBookUpdate = await BookModel.findById(id);

    if (!singleBookUpdate) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }

    singleBookUpdate.name = name || singleBookUpdate.name;
    singleBookUpdate.description = description || singleBookUpdate.description;
    singleBookUpdate.price = price || singleBookUpdate.price;

    const updatedBook = await singleBookUpdate.save();

    res
      .status(200)
      .json({ success: true, message: "Book updated successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const deleteSingleBookController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const singleBook = await BookModel.findById(id);
    if (!singleBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    await singleBook.deleteOne();

    res
      .status(200)
      .json({ success: true, message: "Book delete successfully" });

    res.send("delete  single books ");
  } catch (error) {
    console.log(error);
  }
};
