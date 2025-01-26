import connectMongoDB from "@/lib/mongodb";
import Topic from "@/app/models/topic";
import { NextResponse } from "next/server";

// Handle POST request
export async function POST(req) {
  const { email, name } = await req.json();

  console.log("Received data:", { email, name });

  // Check if email and name are provided
  if (!email || !name) {
    return NextResponse.json(
      { message: "Email and Name are required" },
      { status: 400 }
    );
  }
  try {
    // Connect to MongoDB
    await connectMongoDB();

    // Check if the user already exists
    const existingUser = await Topic.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Create a new topic (document)
    const newTopic = new Topic({ email, name });
    await newTopic.save();

    // Respond with a success message
    return NextResponse.json(
      { message: "Topic created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
