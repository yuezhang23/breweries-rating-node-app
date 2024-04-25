import mongoose from "mongoose";
import storeSchema from "./schema.js";

const model = mongoose.model("StoreModel", storeSchema);

export default model;