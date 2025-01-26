// // import clientPromise from "@/lib/mongodb";
// // import { MongoClient } from "mongodb";
// // import { NextResponse } from "next/server";
// // export async function POST(request){
// //     const body= await request.json()
// //     const client = await clientPromise
// //     const db= client.db("imean")
// //     const collection= db.collection("itsscary")
// //     const existingUser= await collection.findOne({email:body.email})
// //     if(!existingUser){
// //         await collection.insertOne({
// //             name:body.Username,
// //             email:body.email,
// //         });
// //         return NextResponse.json({
// //             message:"user succesfully registered",
// //             ok:true
// //         })
// //     }
// //     else{
// //         console.log("user already exists")
// //         return NextResponse.json({
// //             message:"already exists",
// //             ok:false
// //         })
// //     }

// //     return NextResponse.json({message:"User updates", ok:true})

// // }

// import React from "react";
// import { useForm } from "react-hook-form";

// const MyForm = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm();

//   const onSubmit = async (data) => {
//     try {
//       const response = await fetch("/api/submit", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });

//       const result = await response.json();
//       console.log("Server Response:", result);
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <div>
//         <label htmlFor="email">Email</label>
//         <input
//           id="email"
//           type="email"
//           {...register("email", { required: "Email is required" })}
//         />
//         {errors.email && <p>{errors.email.message}</p>}
//       </div>

//       <div>
//         <label htmlFor="name">Name</label>
//         <input
//           id="name"
//           type="text"
//           {...register("name", { required: "Name is required" })}
//         />
//         {errors.name && <p>{errors.name.message}</p>}
//       </div>

//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default MyForm;

import connectMongoDB from "@/lib/mongodb"
import Topic from "@/app/models/topic";
import { NextResponse } from "next/server";
import { connect } from "mongoose";
export async function POST(request){
    const {email,name } = await request.json()
    console.log("Received data:", { email, name }); 
    await connectMongoDB();
    const existingUser = await Topic.findOne({ email });
   if(existingUser){
    return NextResponse.json(
        {message:"User already exists with this email"}
    )
   } 
 const newTopic=   await Topic.create({email, name})
    return NextResponse.json({message:"Topic created "}, {status:201})
}