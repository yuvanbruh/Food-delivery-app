import Topic from "@/app/models/topic";
import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"; // Import the jwt package


const JWT_SECRET = process.env.JWT_SECRET || "7f0cb88caa30f5a8c56f4e107f221fa157d415d87a92c6b2b810af9075ffb0a28a86b380c1e1ac1df7d883dc80cc4db3d5f5735b1a682a89da59fc6e4c4d1775"; // Ensure this secret is in your .env

export async function POST(request) {
    const { email } = await request.json();
    await connectMongoDB();

    // Check if the user exists in the database
    const existingUser = await Topic.findOne({ email });

    if (existingUser) {
        // If the user exists, generate a JWT token
        const token = jwt.sign(
            { email: existingUser.email, name: existingUser.name }, // Payload (user data)
            JWT_SECRET, // Secret key for signing the token
            { expiresIn: '24h' } // Token expiration time (optional, set to 1 hour)
        );

        // Return the response with the token
        return NextResponse.json({ message: "User exists", ok: true, token });
    }

    // If the user doesn't exist, send a message back
    return NextResponse.json({ message: "User doesn't exist" });
}
