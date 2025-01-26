"use client";

import React, { useContext } from "react";
import { useAuth } from "../context/page";
import { useSession } from "next-auth/react";
import { CartContext } from "../SessionWrapper";
import { useState,useEffect } from "react";
import Image from "next/image";

const Page = () => {
  const { cartProducts,removeCartProduct } = useContext(CartContext);
    const { user,isLoggedin } = useAuth();

    const { data: session } = useSession();
    // const [isloggedin, setisloggedin] = useState(false)
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
  const subtotal = cartProducts.reduce(

    (sum, item) => sum + parseFloat(item.baseprice || 0),
    0
  );
  const shipping = 5; // Fixed shipping cost
  const total = subtotal + shipping;


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Check if the session exists (Google login)
        const sessionResponse = await fetch("/api/auth/session", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
  
        if (sessionResponse.ok) {
          const sessionData = await sessionResponse.json();
          if (sessionData?.user?.email) {
            // If session data exists, fetch profile
            const response = await fetch("/api/profile", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            });
  
            if (response.ok) {
              const data = await response.json();
              console.log("Profile data (Google):", data);
  
              // setUsername(data.userProfile.name);
              setPhone(data.userProfile.phone);
              setStreetAddress(data.userProfile.streetAdress);
              setPostalCode(data.userProfile.postalCode);
              setCity(data.userProfile.city);
              setCountry(data.userProfile.country);
            //   setIsAdmin(data.userProfile.admin);
              // setUploadedImageUrl(data.userProfile.userImage || ""); // Update image URL
            } else {
              console.error("Failed to fetch profile for Google session");
            }
            return; // Exit after handling Google session
          }
        }
  
        // No session, fallback to JWT-based authentication
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token is missing");
          return;
        }
  
        const response = await fetch("/api/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log("Profile data (JWT):", data);
  
          // setUsername(data.userProfile.name);
          setPhone(data.userProfile.phone);
          setStreetAddress(data.userProfile.streetAddress);
          setPostalCode(data.userProfile.postalCode);
          setCity(data.userProfile.city);
          setCountry(data.userProfile.country);
          setIsAdmin(data.userProfile.admin);
          // setUploadedImageUrl(data.userProfile.userImage || "");
        } else {
          const errorData = await response.json();
          console.error("Failed to fetch profile with JWT:", errorData.message || "Unknown error");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
  
    fetchProfile();
  }, []);
  const handlelogout=async(e)=>{
    e.preventDefault()
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    toast("Saving...");
    const token = localStorage.getItem("token");
    let r = await fetch("/api/profile", {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: username,
        streetAddress,
        phone,
        postalCode,
        city,
        country,
        image: uploadedImageUrl, // Include image URL in the profile save request
      }),
    });

  }
  return (
    <section className="mt-10 max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mt-8">
        {/* Left Section - Cart Products */}
        <div className="lg:col-span-3">
          <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
          <div className="space-y-6">
            {cartProducts.length > 0 ? (
              cartProducts.map((e, index) => (
                <article
                  key={index}
                  className="flex items-center gap-6 bg-white shadow-lg rounded-xl p-6"
                >
                  <div className="w-28 h-28 relative">
                    <Image
                      src={e.userImage || "/placeholder.jpg"}
                      alt={e.name}
                      layout="fill"
                      className="object-cover rounded-xl"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{e.name}</h3>
                    <p className="text-gray-700 text-base">
                      {e.desc || "No description available."}
                    </p>
                    <p className="text-blue-600 font-medium text-lg mt-2">
                      ${e.baseprice || "0"}
                    </p>
                  </div>
                  <button
                    onClick={() => removeCartProduct(index)}
                    className="text-blue-600 font-medium hover:underline text-lg"
                  >
                    Remove
                  </button>
                </article>
              ))
            ) : (
              <p className="text-gray-700 text-lg">Your cart is empty.</p>
            )}
          </div>
        </div>
  
        {/* Right Section - Checkout Form */}
{isLoggedin || session ? (<>
    <div className="lg:col-span-2 bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">Checkout</h2>
          <form onSubmit={handlelogout} className="space-y-4">
            <div>
              <label
                htmlFor="phone"
                className="block text-gray-700 font-medium mb-2"
              >
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 text-gray-800 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
  
            <div>
              <label
                htmlFor="streetAddress"
                className="block text-gray-700 font-medium mb-2"
              >
                Street Address
              </label>
              <input
                id="streetAddress"
                type="text"
                placeholder="Street Address"
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 text-gray-800 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
  
            <div>
              <label
                htmlFor="postalCode"
                className="block text-gray-700 font-medium mb-2"
              >
                Postal Code
              </label>
              <input
                id="postalCode"
                type="text"
                placeholder="Postal Code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 text-gray-800 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
  
            <div>
              <label
                htmlFor="city"
                className="block text-gray-700 font-medium mb-2"
              >
                City
              </label>
              <input
                id="city"
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 text-gray-800 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
  
            <div>
              <label
                htmlFor="country"
                className="block text-gray-700 font-medium mb-2"
              >
                Country
              </label>
              <input
                id="country"
                type="text"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 text-gray-800 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
  
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              Pay ${total.toFixed(2)}
            </button>
          </form>
        </div>
</>):(<>
<div>not logged in</div>
</>)}
      </div>
    </section>
  );
  
};

export default Page;
