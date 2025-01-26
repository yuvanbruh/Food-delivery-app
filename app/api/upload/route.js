import { NextResponse } from "next/server";
import cloudinary from "cloudinary";
import Topic from "@/app/models/topic";

// Cloudinary configuration
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
