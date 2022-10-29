import mongoose from "mongoose";

const { Schema } = mongoose;

const SupplierSchema = new Schema(
	{
		name: { type: String, required: true },
	},
	{
		versionKey: false,
	}
);

export default SupplierSchema;
