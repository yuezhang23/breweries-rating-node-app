import mongoose from "mongoose";

const beerSchema = new mongoose.Schema({
    beer_name: { type: String, required: true },
    flavor_profile: [{ type: String }],
    beer_type: { type: String, required: true },  

    brewery_id : { type: mongoose.Schema.Types.ObjectId, ref: 'breweries'},
    brewery_name: { type: String },  
    stores : [
        {
            store_id :  { type: mongoose.Schema.Types.ObjectId, ref: 'stores'},
            store_name: { type: String },
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
