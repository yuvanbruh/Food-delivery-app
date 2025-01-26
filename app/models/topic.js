// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   provider: { type: String, required: true },
// });

// const User = mongoose.models.User || mongoose.model('User', userSchema);

// export default User;
import { Timestamp } from "mongodb";
import mongoose , {Schema}from "mongoose";
const topicSchema = new Schema(
  {
  
     name: String,
    //  email: String,
    email: { type: String, required: true, unique: true },
    //  googleId: { type: String, unique: true },
     phone:{type:String},
     streetAdress:{type:String},
     postalCode:{type:String},
     city:{type:String},
     country:{type:String},
     admin:{type:Boolean,default:false},
     userImage:String
  },
  {
  timestamps: true
  }
)
const Topic =  mongoose.models.Topic || mongoose.model("Topic", topicSchema)
export default Topic
 
// import mongoose from "mongoose";

// const topicSchema = new mongoose.Schema(
//   {
//     email: { type: String, required: true },
//     name: { type: String, required: true },
//   },
//   { timestamps: true }
// );

// const Topic = mongoose.models.Topic || mongoose.model("Topic", topicSchema);

// export default Topic;
