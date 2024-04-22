import mongoose from "mongoose";

const brewerySchema = new mongoose.Schema(
    {
        id : {type : String, default: ""},
        name: {type : String, required : true},
        description : {type : String},
        brewery_type: { type: String},

        phone: {type : String, default : '000-0000000'},
        address: {
            street: {type : String},
            postal_code: {type : Number},
            city:  {type : String},
            state: {type : String, required:true},
            country: {type : String, required : true},
        },
        
        beer_types: [{ type: String, required: true},],  
        
        website_url:  {type : String},
        likes :  {type : Number, required : true, default : 0},
        followers : {type : Number, required : true, default : 0},
        reviews : [
            {
                userId : { type: String},
                // userId : { type: mongoose.Schema.Types.ObjectId, ref: 'users'},
                comments : { type: String},
            }
        ],
    },
  { collection: "breweries" });

export default brewerySchema;
