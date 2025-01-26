// import { MongoClient } from 'mongodb';

// // MongoDB URI from environment variable
// const uri = process.env.MONGODB_URI;
// const options = { 
//   useNewUrlParser: true, 
//   useUnifiedTopology: true // Ensures we use a stable connection to MongoDB
// };

// let client;
// let clientPromise;

// // Throw error if Mongo URI is not set in environment variables
// if (!uri) {
//   throw new Error('Add Mongo URI to .env.local');
// }

// if (process.env.NODE_ENV === 'development') {
//   // In development, use a global promise so the MongoClient is not reinitialized on every request
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(uri, options);
//     global._mongoClientPromise = client.connect();  // Store the client promise globally
//   }
//   clientPromise = global._mongoClientPromise;
// } else {
//   // In production, create a new client for each request (better for scaling)
//   client = new MongoClient(uri, options);
//   clientPromise = client.connect();
// }

// export default clientPromise;
import mongoose from "mongoose";
const connectMongoDB=async ()=>{
  try{
   await mongoose.connect(process.env.MONGODB_URI)
    console.log("connected to mongodb")
  }catch(error){
    console.log(error)
  }
} 
export default connectMongoDB;
// import mongoose from "mongoose";

// const connectMongoDB = async () => {
//   if (mongoose.connection.readyState >= 1) return; // If already connected

//   try {
//     await mongoose.connect(process.env.MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("Connected to MongoDB");
//   } catch (error) {
//     console.error("MongoDB connection error:", error);
//     throw error;
//   }
// };

// export default connectMongoDB;
