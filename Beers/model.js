import mongoose from "mongoose";
import beerSchema from "./schema.js";

const model = mongoose.model("BeerModel", beerSchema);

export default model;