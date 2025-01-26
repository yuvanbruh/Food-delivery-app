import Topic from "@/app/models/topic";
import { NextResponse } from "next/server";
export async function GET(req) {
    const users = await Topic.find()
    return NextResponse.json({users,ok:true})
}
export async function DELETE(req){
    const url = new URL(req.url)
    const _id = url.searchParams.get("_id")
    console.log(_id,"id")
    await  Topic.deleteOne({_id})
    return NextResponse.json({ok:true})
 }