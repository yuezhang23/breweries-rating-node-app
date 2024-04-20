import followSchema from "./schema.js";
import mongoose from "mongoose";

const FModel = mongoose.model("follows", followSchema);

export default FModel;