import { Router } from "express";
import { getAllBooksControllers, addBookController, getSingleBookIdController, editSingleBookByIdController, deleteSingleBookController} from "../controllers/book.controllers.js";

const router = Router();


router.route("/").get(getAllBooksControllers).post(addBookController)
router.route("/:id").get(getSingleBookIdController).put(editSingleBookByIdController).delete(deleteSingleBookController)

export default router;
