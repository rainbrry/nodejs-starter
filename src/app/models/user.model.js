import mongoose from "mongoose";
import UserSchema from "#schema/users.schema";

const { model } = mongoose;

export default model("User", UserSchema);
