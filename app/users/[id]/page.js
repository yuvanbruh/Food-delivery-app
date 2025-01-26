"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { Toaster, toast } from "react-hot-toast";
import UserTabs from "../../components/UserTabs";

const Page = () => {
  const router = useRouter();
  const { id } = useParams();

  const [admin, setAdmin] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [profileSaved, setProfileSaved] = useState(false);
  const [phone, setPhone] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserImage(file);
    }
  };

  const handleNext = () => {
    router.push("/users");
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!userImage) {
      alert("Please select an image to upload!");
      return;
    }
    if (!email) {
      alert("You must be logged in to upload an image.");
      return;
    }
    const formData = new FormData();
    formData.append("file", userImage);
    formData.append("email", email);
    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Failed to upload image.");
      }
      const data = await response.json();
      setUploadedImageUrl(data.imageUrl);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast("Saving...");
    let r = await fetch("/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: username,
        streetAddress,
        phone,
        postalCode,
        city,
        country,
        image: uploadedImageUrl,
      }),
    });

    let res = await r.json();
    if (res.ok) {
      toast.success("Profile saved!");
      setProfileSaved(!profileSaved);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("/api/use");
        const data = (await res.json()).finduser;
        const item = data.find((i) => i._id === id);
        setUsername(item.name);
        setEmail(item.email);
        setPhone(item.phone);
        setStreetAddress(item.streetAdress);
        setPostalCode(item.postalCode);
        setCity(item.city);
        setCountry(item.country);
        setUploadedImageUrl(item.userImage);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getData();
  }, [id]);

  useEffect(() => {
    const fetchAdminStatus = async () => {
      try {
        const response = await fetch("/api/profile");
        const result = await response.json();
        setAdmin(result.userProfile.admin);
      } catch (error) {
        toast.error("Failed to fetch user profile.");
      }
    };
    fetchAdminStatus();
  }, []);
  const handleDelete = async (_id) => {
    const response = await fetch(`/api/users?_id=${_id}`, {
      method: 'DELETE',
    });
    const res = await response.json()
    if(res.ok){
      set((prev) => prev.filter((category) => category._id !== _id));
    }
    console.log(_id)
  };
  
  if (!admin) {
    return (
      <div className="flex items-center justify-center h-screen text-center text-xl text-red-600 font-semibold">
        You are not an admin.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50">
      <Toaster />

      <section className="mt-6 max-w-3xl mx-auto bg-white border border-blue-200 shadow-lg rounded-xl p-6 space-y-8">
        <UserTabs activeTab="users" />

        <div className="min-h-screen flex items-center justify-center py-8 px-4 bg-gray-50">
          <section className="shadow-lg rounded-xl bg-white w-full max-w-4xl p-8 border border-gray-300 flex">
            {/* Profile Image Section */}
            <div className="flex flex-col items-center justify-center w-1/3 border-r border-gray-300 pr-6">
              {uploadedImageUrl ? (
                <img
                  src={uploadedImageUrl}
                  alt="Profile Image"
                  className="w-40 h-40 rounded-full object-cover border-2 border-gray-300"
                />
              ) : (
                <div className="w-40 h-40 rounded-full bg-gray-300 flex items-center justify-center text-white text-lg">
                  No Image
                </div>
              )}
              <form onSubmit={handleUpload} className="mt-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-36 p-1 border-none rounded-lg bg-gray-100 text-sm"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-1 px-3 rounded-md text-sm transition-colors hover:bg-blue-700 mt-2"
                >
                  Upload Image
                </button>
              </form>
            </div>

            {/* Profile Form */}
            <div className="flex-grow pl-6">
              <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="First and Last Name"
                    className="w-full p-3 rounded-lg border border-gray-500"
                  />
                  <input
                    type="email"
                    value={email}
                    disabled
                    className="w-full p-3 rounded-lg border border-gray-500"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 rounded-lg border border-gray-500"
                  />
                  <input
                    type="text"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    className="w-full p-3 rounded-lg border border-gray-500"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full p-3 rounded-lg border border-gray-500"
                  />
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full p-3 rounded-lg border border-gray-500"
                  />
                </div>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-500"
                />
                <button
                  type="submit"
                  className="px-6 py-2 mt-7 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2 mt-7 bg--600 text-black border border-gray-600 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                >
                  Next
                </button>
              </form>
              {/* <div>
                <label htmlFor="admin">
                    <input id="admin" type="checkbox" checked={admin} onChange={e=>setAdmin(e.target.checked)} />
                    <span className="p-2 font-normal ">Admin</span>
                </label>
              </div> */}
            </div>

          </section>

    
        </div>
      </section>
    </div>
  );
};

export default Page;
