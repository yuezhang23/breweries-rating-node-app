import mongoose from "mongoose";

const brewerySchema = new mongoose.Schema(
    {
        id : {type : String, default: ""},
        name: {type : String},
        description : {type : String},
        brewery_type: { type: String},
        website_url:  {type : String},
        phone: {type : String, default : '000-0000000'},
        address: {
            street: {type : String},
            postal_code: {type : String},
            city:  {type : String},
            state_province: {type : String},
            country: {type : String},
        },
    
        beer_types: [{ type: String, required: true},],    

        likers : 
        [     
            {userId : { type: mongoose.Schema.Types.ObjectId, ref: 'users'}}
        ],

        followers : 
        [     
            {userId : { type: mongoose.Schema.Types.ObjectId, ref: 'users'}}
        ],

        followCount : {type : Number, required : true, default : 0},
        likeCount : {type : Number, required : true, default : 0},

        reviews : 
        [
            {
                userId : { type: mongoose.Schema.Types.ObjectId, ref: 'users'},
                comments : { type: String},
            }
        ],
    },
  { collection: "breweries" });

export default brewerySchema;
