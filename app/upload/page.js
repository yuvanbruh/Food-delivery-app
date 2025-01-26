
"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAuth } from "../context/page";

export default function Home() {
  const { user } = useAuth();
  const [image, setImage] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const { data: session } = useSession();
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (session) {
      setEmail(session.user.email); // Use session email if logged in via Google
    } else if (user) {
      setEmail(user.email); // Use manual email if available
    }
  }, [session, user]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image) {
      alert("Please select an image to upload!");
      return;
    }
    if (!email) {
      alert("You must be logged in to upload an image.");
      return;
    }
    const formData = new FormData();
    formData.append("file", image);
    formData.append("email", email); // Use whichever email is available, either from session or user

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Failed to upload image.");
      }
      const data = await response.json();
      console.log("Backend Response:", data);

      // Update state with the uploaded image URL
      setUploadedImageUrl(data.imageUrl);

      // Log the uploaded URL directly from the response
      console.log("Uploaded Image URL from response:", data.imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Profile image display */}
      <div>
        {uploadedImageUrl ? (
          <img
            src={uploadedImageUrl}
            alt="Uploaded"
            className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
          />
        ) : (
          <div
            className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center text-white text-lg"
          >
            No Image
          </div>
        )}
      </div>

      {/* Form for file input */}
      <form onSubmit={handleUpload} className="flex flex-col items-center space-y-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-36 p-1 border-none rounded-lg bg-gray-100 text-sm"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-1 px-3 rounded-md text-sm transition-colors hover:bg-blue-700"
        >
          Upload
        </button>
      </form>

 
    </div>
  );
}
