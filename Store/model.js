import mongoose from "mongoose";
import storeSchema from "./schema.js";

const model = mongoose.model("stores", storeSchema);

export default model;