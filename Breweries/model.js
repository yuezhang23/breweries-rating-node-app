import mongoose from "mongoose";
import brewerySchema from "./schema.js";

const model = mongoose.model("BreweryModel", brewerySchema);
export default model;