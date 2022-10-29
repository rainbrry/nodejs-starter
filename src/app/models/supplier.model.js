import mongoose from "mongoose";
import SupplierSchema from "#schema/supplier.schema";

const { model } = mongoose;

export default model("Supplier", SupplierSchema);
