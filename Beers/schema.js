import mongoose from "mongoose";

const beerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    flavor: { type: String },
    type: { type: String, required: true },
    ingredients: [{ type: String }],
    brewery: {
        b_id: { type: mongoose.Schema.Types.ObjectId, ref: 'breweries' },
        remote_id: { type: String }
    }
},
{ collection: "beers" }
);

export default beerSchema
