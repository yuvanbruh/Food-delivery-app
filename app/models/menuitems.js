
import { Timestamp } from "mongodb";
import mongoose , {Schema}from "mongoose";
const extrapriceSchema = new Schema({
  name:String,
  price:Number
})
const menuSchems = new Schema(
  {
  
     name: String,
     desc:String,
     baseprice:String,
     userImage:String,
     sizes:{type:[extrapriceSchema]},
     ingredients:{type:[extrapriceSchema]},
     category:{type:mongoose.Types.ObjectId}
 
  },
  {
  timestamps: true
  }
)
const Menu =  mongoose.models.Menu || mongoose.model("Menu", menuSchems)
export default Menu
 