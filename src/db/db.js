import mongoose from "mongoose";
import { MONGO_URI } from "../config/config.js";

const connectionDB = async () => {
  try {
    const res = await mongoose.connect(MONGO_URI);
    console.log("Database connection established!!");
  } catch (error) {
    console.log(error);
  }
};

export default connectionDB;
