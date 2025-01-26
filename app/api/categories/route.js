// import Categories from "@/app/models/category"
// import { NextResponse } from "next/server"
// export async function POST(req) {
//     const {name} = await req.json()
//     const existingUser = await Categories.findOne({name})
//     // if(!existingUser){

//     // }
//     const category= await Categories.create({name})
//     return NextResponse.json({category,ok:true})
// }
// export async function GET(){
//    const categories =  await Categories.find()
//     return NextResponse.json({categories})
// }

import Categories from "@/app/models/category";
import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
export async function POST(req) {
    const {name}=  await req.json()
    await connectMongoDB()
    const createuser = await Categories.create({name})
    if(createuser){
        return NextResponse.json({
            "ok": true,
            createuser
          })
    }
    else{
        return NextResponse.json({message:"not created schema", ok:false})
    }
}
export async function GET() {
    // await connectMongoDB()
    const finduser = await Categories.find()
 if(finduser){
    return NextResponse.json({finduser,ok:true})
 }
 else{
    return NextResponse.json({message:"users not found",ok:false})
 }
}
export async function PUT(req) {
    const {_id,name} = await req.json()
    // const id = data.id
    // const name = data.name
    const updateuser = await Categories.updateOne(
        {_id},
        {name}
    )
    if(updateuser){
        return NextResponse.json(
            { ok: true, message: "Category updated successfully!" }
        
          );
    }
    else{
        return NextResponse.json(
{ ok: false, message:"the put rewuest is not working " }
            
          );
    }
 }
//  export async function DELETE(){
//     // const categories =  await Categories.find({})
//     await Categories.deleteMany({})
//      return NextResponse.json({message:"done deleteing "})
//  }
 export async function DELETE(req){
    const url = new URL(req.url)
    const _id = url.searchParams.get("_id")
    console.log(_id,"id")
    await  Categories.deleteOne({_id})
    return NextResponse.json({ok:true})
 }