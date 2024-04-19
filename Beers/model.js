import mongoose from "mongoose";
import schema from "./schema.js";

const model = mongoose.model("BeerModel", schema);

export default model;