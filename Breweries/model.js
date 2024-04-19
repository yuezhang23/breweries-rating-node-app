import mongoose from "mongoose";
import schema from "./schema.js";

const model = mongoose.model("VendorModel", schema);

export default model;