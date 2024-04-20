import mongoose from "mongoose";
import schema from "./schema.js";

const model = mongoose.model("BreweryModel", schema);

export default model;