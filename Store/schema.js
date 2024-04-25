import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { 
        street: { type: String, required: true }, 
        city: { type: String, required: true },   
        state: { type: String, required: true },  
        country: { type: String, required: true } 
      },
      phone: { type: String, required: true },
      breweries: {
        b_id: { type: mongoose.Schema.Types.ObjectId, ref: 'breweries' },
        remote_id: { type: String }
    }
},
{ collection: "stores" }
);

export default storeSchema