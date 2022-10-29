import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema(
	{
		fullname: { type: String, required: true },
		username: { type: String, required: true },
		password: { type: String, required: true, select: false },
		phone: { type: String },
		address: { type: String },
		role: { type: String, default: "kasir" },
		refreshToken: { type: Array, select: false },
	},
	{
		versionKey: false,
	}
);

export default UserSchema;
