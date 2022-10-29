import mongoose from "mongoose";
import CategorySchema from "#schema/category.schema";

const { model } = mongoose;

export default model("Category", CategorySchema);
