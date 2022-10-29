import mongoose from "mongoose";
import ProductSchema from "#schema/product.schema";

const { model } = mongoose;

export default model("Product", ProductSchema);
