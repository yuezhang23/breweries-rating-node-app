import mongoose from "mongoose";

const brewerySchema = new mongoose.Schema(
    {
        id : {type : String, default: null},
        name: {type : String, required : true, unique : true},
        description : String,
        brewery_type: {
            type: String,
            enum: ["micro", "large", "brewpub", "regional", "other"],
            default: "other",},
        phone: {type : String, required : true, default : '000-0000000'},
        address: {
            street: {type : String, required : true, unique : true},
            postal_code: {type : Number, required : true},
            city:  {type : String, required : true},
            state: {type : String, required : true},
            country: {type : String, required : true},
        },
        website_url: String,
        price_per_person: Number,
        likes :  {type : Number, required : true, default : 0},
        followers : {type : Number, required : true, default : 0},
        reviews : [
            {
                userid : {type : String, default: " "},
                comments : [String,]
            }
        ],
    },
  { collection: "breweries" });

export default brewerySchema;
