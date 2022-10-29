import mongoose from "mongoose";
import CategorySchema from "#schema/category.schema";
import SupplierSchema from "#schema/supplier.schema";

const { Schema } = mongoose;

const ProductSchema = new Schema(
	{
		name: { type: String, required: true },
		category: { type: { CategorySchema }, required: true },
		purchasePrice: { type: Number, required: true },
		salesPrice: { type: Number, required: true },
		stock: { type: Number, required: true },
		supplier: { type: { SupplierSchema }, required: true },
		margin: { type: Number, required: true },
	},
	{
		versionKey: false,
	}
);

export default ProductSchema;
