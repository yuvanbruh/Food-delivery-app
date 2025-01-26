
import Topic from "@/app/models/topic";
import cloudinary from "cloudinary";
import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
// import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"; // Ensure you have the jsonwebtoken package installed
const JWT_SECRET = process.env.JWT_SECRET; 
// Use your JWT secret from environment variables
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");
  const email = formData.get("email"); // Get the email from the formData
  if (!file) {
    return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
  }
  const buffer = Buffer.from(await file.arrayBuffer());
  try {
    // Use promise with cloudinary to ensure response is handled correctly
    const cloudinaryResponse = await new Promise((resolve, reject) => {
      const result = cloudinary.v2.uploader.upload_stream(
        { folder: "nextjs14_uploads" },
        async (error, response) => {
          if (error) {
            reject(error); // Reject promise if error occurs
          } else {
            resolve(response); // Resolve promise with the response
          }
        }
      );

      result.write(buffer);
      result.end();
    });

    // Successfully uploaded image
    console.log("Cloudinary Response:", cloudinaryResponse);

    // Once uploaded, update the user's image URL in the database
    if (email) {
      const user = await Topic.findOneAndUpdate(
        { email: email }, // Match user by email
        { userImage: cloudinaryResponse.secure_url }, // Update the userImage field
        { new: true }
      );

      if (!user) {
        return NextResponse.json({ error: "User not found." }, { status: 404 });
      }

      console.log("Updated user image URL:", user.userImage);
    }

    // Send the image URL back to the client
    return NextResponse.json({ imageUrl: cloudinaryResponse.secure_url }, { status: 200 });

  } catch (error) {
    console.error("Error during upload or database update:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    // Ensure MongoDB connection
    await connectMongoDB();
    // Try to get the session from next-auth (for Google login)
    const session = await getServerSession(authOptions);
    let email;
    // If session exists (Google login), extract email from the session 
    if (session) {
      email = session.user.email;
    } else {
      // If no session exists, check for a JWT token in the Authorization header
      const authHeader = req.headers.get("Authorization");

      if (!authHeader) {
        return NextResponse.json(
          { message: "Authorization token missing", ok: false },
          { status: 401 }
        );
      }
      // Extract JWT from the Authorization header (Format: "Bearer <token>")
      const token = authHeader.split(" ")[1];
      if (!token) {
        return NextResponse.json(
          { message: "Token format is incorrect", ok: false },
          { status: 401 }
        );
      }
      // Verify the token using JWT_SECRET
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        email = decoded.email; // Assuming the token contains the user's email
      } catch (err) {
        return NextResponse.json(
          { message: "Invalid or expired token", ok: false },
          { status: 401 }
        );
      }
    }
    // Read the incoming JSON data
    const data = await req.json();
console.log(data)
    // Check if user exists and update the name
    const updatedUser = await Topic.updateOne(
      { email },
      // { name: data.name },
      data

    );


    if (updatedUser.matchedCount > 0) {
      return NextResponse.json(
        { message: "User profile updated", ok: true },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "User not found", ok: false },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { message: "Internal server error", ok: false },
      { status: 500 }
    ); }}


    export async function GET(req) {
      try {
        // Ensure MongoDB connection
        await connectMongoDB();
    
        // Try to get the session (Google login)
        const session = await getServerSession(authOptions);
        let email;
    
        // If the session exists (Google login), extract email from the session
        if (session) {
          email = session.user.email;
          // if(!email){
          //   return NextResponse.json({})
          // }
        } else {
          // If no session exists, check for a JWT token in the Authorization header
          const authHeader = req.headers.get("Authorization");
          if (!authHeader) {
            return NextResponse.json(
              { message: "Authorization token missing", ok: false },
              { status: 401 }
            );
          }
    
          const token = authHeader.split(" ")[1]; // Get token from "Bearer <token>"
    
          if (!token) {
            return NextResponse.json(
              { message: "Token format is incorrect", ok: false },
              { status: 401 }
            );
          }
    
          // Try to decode the JWT token to get email
          try {
            const decoded = jwt.verify(token, JWT_SECRET);
            email = decoded.email; // Assuming the token contains the user's email
          } catch (err) {
            return NextResponse.json(
              { message: "Invalid or expired token", ok: false },
              { status: 401 }
            );
          }
        }
        // Fetch user profile using the extracted email
        const userProfile = await Topic.findOne({ email });
        if (!userProfile) {
          return NextResponse.json(
            { message: "User not found", ok: false },
            { status: 404 }
          );
        }
        // Successfully found user, return profile data
        return NextResponse.json({
          message: "User profile fetched successfully",
          ok: true,
          userProfile
          // userProfile: {
          //   name:userProfile.name,
          //   phone: userProfile.phone,
          //   streetAdress: userProfile.streetAdress,
          //   postalCode: userProfile.postalCode,
          //   city: userProfile.city,
          //   country: userProfile.country,
          //   admin: userProfile.admin
          // },
        }, { status: 200 });
    
      } catch (error) {
        console.error("Error fetching profile:", error);
        return NextResponse.json(
          { message: "Internal server error", ok: false, error: error.message },
          { status: 500 }
        );
      }
    }
    