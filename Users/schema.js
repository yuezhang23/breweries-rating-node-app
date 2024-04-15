import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    dob: Date,
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",},
    registerDate: { type: Date, default: Date.now },
  },
  { collection: "users" });

export default userSchema;