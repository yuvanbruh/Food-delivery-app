import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Topic from "@/app/models/topic";

export async function PUT(request,{params}) {
    const {id}= params;
   const {newname:name, newpassword:password}= await request.json()
    await connectMongoDB()
    await Topic.findByIdAndUpdate(id,{name,password})
    return NextResponse.json({message:"topic updated"}, {status:200})
}



export async function GET(request, {params}){
    const {id}= params;
    await connectMongoDB()
    const topic =await Topic.findOne({_id: id })
    return  NextResponse.json({topic}, {status:200} )
} 

// export async function GET(request,{params}){
//     const {email}= params
//     await connectMongoDB()
//     const topic= await Topic.findOne({email:email})
//     return NextResponse.json({topic}, {status:200})
// }