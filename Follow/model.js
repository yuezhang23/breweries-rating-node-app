import followSchema from "./schema.js";
import mongoose from "mongoose";

const Follow = mongoose.model("follows", followSchema);

export default Follow;