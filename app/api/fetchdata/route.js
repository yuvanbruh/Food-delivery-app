import Topic from "@/app/models/topic";
import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
export async function POST(request) {
    const {email}= request.json()
    await connectMongoDB()
    const blogs = await Topic.find({email})
    return NextResponse.json({blogs})
}

