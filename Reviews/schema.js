import mongoose from "mongoose";

const reviewsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    brewery : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'breweries'
    }
}, { collection: 'reviews' });

export default reviewsSchema;