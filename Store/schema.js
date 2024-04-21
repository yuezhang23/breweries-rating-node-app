import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
    {
    store_name: { type: String, required: true },
    store_type: { type: String, required: true },  
    price_per_person:  {type : String},

    phone: {type : String, default : '000-0000000'},
    address: {
        street: {type : String},
        postal_code: {type : Number},
        city:  {type : String},
        state: {type : String, required:true},
        country: {type : String, required : true},
    },

    beer_brand : [
        {
            beer_id :  { type: mongoose.Schema.Types.ObjectId, ref: 'beers'},
            beer_name: { type: String },
            quantity : Number
        },
    ],
},
{ collection: "stores" }
);

export default storeSchema