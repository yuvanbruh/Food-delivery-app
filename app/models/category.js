
import { Timestamp } from "mongodb";
import mongoose , {Schema}from "mongoose";
const topicSchems = new Schema(
  {
  
     name: String,
    //  email: String,
    // email: { type: String, required: true, unique: true },
    //  googleId: { type: String, unique: true },
    //  phone:{type:String},
    //  streetAdress:{type:String},
    //  postalCode:{type:String},
    //  city:{type:String},
    //  country:{type:String},
    //  admin:{type:Boolean,default:false},
  },
  {
  timestamps: true
  }
)
const Categories =  mongoose.models.Categories || mongoose.model("Categories", topicSchems)
export default Categories
 