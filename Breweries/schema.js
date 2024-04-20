import mongoose from "mongoose";

const brewerySchema = new mongoose.Schema(
    {
        id : {type : String, default: null},
        name: {type : String, required : true, unique : true},
        description : String,
        brewery_type: { type: String},
        phone: {type : String, default : '000-0000000'},
        address: {
            street: {type : String},
            postal_code: {type : Number},
            city:  {type : String},
            state: {type : String, required : true},
            country: {type : String, required : true},
        },
        website_url: String,
        price_per_person: Number,
        likes :  {type : Number, required : true, default : 0},
        followers : {type : Number, required : true, default : 0},
        reviews : [
            {        
                userid : { type: mongoose.Schema.Types.ObjectId,
                    ref: 'users'},
                comments : [String,]
            }
        ],
    },
  { collection: "breweries" });

export default brewerySchema;
