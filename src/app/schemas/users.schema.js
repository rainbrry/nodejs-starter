import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema(
	{
		fullname: { type: String, required: true },
		username: { type: String, required: true },
		role: { type: String, default: "kasir" },
		password: { type: String, required: true, select: false },
		refreshToken: { type: Array, select: false, sparse: true },
	},
	{
		versionKey: false,
	}
);

export default UserSchema;
