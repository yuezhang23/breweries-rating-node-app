import mongoose from "mongoose";

const reviewsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    breweries_ref: String,
    content: String
}, { collection: 'reviews' });

export default reviewsSchema;