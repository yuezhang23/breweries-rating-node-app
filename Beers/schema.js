import mongoose from "mongoose";
import brewerySchema from "../Breweries/schema";

const beerSchema = new mongoose.Schema({
    beer_name: { type: String, required: true },
    flavor_profile: [{ type: String }],
    beer_type: { type: String, required: true },
    ingredients: {
        hops: [{ type: String }],
        malts: [{ type: String }],
        yeast: { type: String }
    },
    breweries : [
        {
            brewery_id : { type: String, required: true },
            brewery_name: { type: String },
        },
    ],
    production_year: { type: Number },
    nutritional_info: {
        calories: { type: Number },
        carbohydrates: { type: Number },
        protein: { type: Number },
        fat: { type: Number },
        sugar: { type: Number }
    },
    ABV: { type: String }
},
{ collection: "beers" }
);

export default beerSchema
