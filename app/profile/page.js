
// "use client";
// import React, { useState, useEffect } from "react";
// import { useSession } from "next-auth/react";
// import { useAuth } from "../context/page";
// import toast, { Toaster } from "react-hot-toast";
// import Link from "next/link";
// import UserTabs from "../components/UserTabs";

// const Page = () => {
//   const { user } = useAuth();
//   const { data: session } = useSession();
//   const [userImage, setUserImage] = useState(null);
//   const [uploadedImageUrl, setUploadedImageUrl] = useState("");
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [profileSaved, setProfileSaved] = useState(false);
//   const [phone, setPhone] = useState("");
//   const [streetAddress, setStreetAddress] = useState("");
//   const [postalCode, setPostalCode] = useState("");
//   const [city, setCity] = useState("");
//   const [country, setCountry] = useState("");
//   const [isAdmin, setIsAdmin] = useState(false);

//   useEffect(() => {
//     if (session) {
//       setEmail(session.user.email);
//       setUsername(session.user.name);
//     } else if (user) {
//       setEmail(user.email);
//       setUsername(user.name);
//     }
//   }, [session, user]);
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         // Check if the session exists (Google login)
//         const sessionResponse = await fetch("/api/auth/session", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           credentials: "include",
//         });
  
//         if (sessionResponse.ok) {
//           const sessionData = await sessionResponse.json();
//           if (sessionData?.user?.email) {
//             // If session data exists, fetch profile
//             const response = await fetch("/api/profile", {
//               method: "GET",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               credentials: "include",
//             });
  
//             if (response.ok) {
//               const data = await response.json();
//               console.log("Profile data (Google):", data);
  
//               setUsername(data.userProfile.name);
//               setPhone(data.userProfile.phone);
//               setStreetAddress(data.userProfile.streetAdress);
//               setPostalCode(data.userProfile.postalCode);
//               setCity(data.userProfile.city);
//               setCountry(data.userProfile.country);
//               setIsAdmin(data.userProfile.admin);
//               setUploadedImageUrl(data.userProfile.userImage || ""); // Update image URL
//             } else {
//               console.error("Failed to fetch profile for Google session");
//             }
//             return; // Exit after handling Google session
//           }
//         }
  
//         // No session, fallback to JWT-based authentication
//         const token = localStorage.getItem("token");
//         if (!token) {
//           console.error("Token is missing");
//           return;
//         }
  
//         const response = await fetch("/api/profile", {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           credentials: "include",
//         });
  
//         if (response.ok) {
//           const data = await response.json();
//           console.log("Profile data (JWT):", data);
  
//           setUsername(data.userProfile.name);
//           setPhone(data.userProfile.phone);
//           setStreetAddress(data.userProfile.streetAddress);
//           setPostalCode(data.userProfile.postalCode);
//           setCity(data.userProfile.city);
//           setCountry(data.userProfile.country);
//           setIsAdmin(data.userProfile.admin);
//           setUploadedImageUrl(data.userProfile.userImage || "");
//         } else {
//           const errorData = await response.json();
//           console.error("Failed to fetch profile with JWT:", errorData.message || "Unknown error");
//         }
//       } catch (error) {
//         console.error("Error fetching profile data:", error);
//       }
//     };
  
//     fetchProfile();
//   }, []);
  
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setUserImage(file);
//     }
//   };

//   const handleUpload = async (e) => {
//     e.preventDefault();
//     if (!userImage) {
//       alert("Please select an image to upload!");
//       return;
//     }
//     if (!email) {
//       alert("You must be logged in to upload an image.");
//       return;
//     }
//     const formData = new FormData();
//     formData.append("file", userImage);
//     formData.append("email", email);

//     try {
//       const response = await fetch("/api/profile", {
//         method: "POST",
//         body: formData,
//       });
//       if (!response.ok) {
//         throw new Error("Failed to upload image.");
//       }
//       const data = await response.json();
//       setUploadedImageUrl(data.imageUrl); // Update state with the uploaded image URL
//       toast.success("Image uploaded successfully!");
//     } catch (error) {
//       console.error("Error uploading image:", error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     toast("Saving...");
//     const token = localStorage.getItem("token");
//     let r = await fetch("/api/profile", {
//       method: "PUT",
//       headers: {
//         "Authorization": `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         name: username,
//         streetAddress,
//         phone,
//         postalCode,
//         city,
//         country,
//         image: uploadedImageUrl, // Include image URL in the profile save request
//       }),
//     });

//     let res = await r.json();
//     if (res.ok) {
//       toast.success("Profile saved!");
//       setProfileSaved(!profileSaved);
//     }
//   };

//   return (
//     <>
//       <div className="min-h-screen flex items-center justify-center py-8 px-4 bg-gray-50">
//         <section className="shadow-lg rounded-xl bg-white w-full max-w-4xl p-8 border border-gray-300 flex">
//           {/* Profile Image Section */}
//           <div className="flex flex-col items-center justify-center w-1/3 border-r border-gray-300 pr-6">
//             {uploadedImageUrl ? (
//               <img
//                 src={uploadedImageUrl}
//                 alt="Profile Image"
//                 className="w-40 h-40 rounded-full object-cover border-2 border-gray-300"
//               />
//             ) : (
//               <div
//                 className="w-40 h-40 rounded-full bg-gray-300 flex items-center justify-center text-white text-lg"
//               >
//                 No Image
//               </div>
//             )}

//             {/* Upload Image Form */}
//             <form onSubmit={handleUpload} className="mt-6 text-center">
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleFileChange}
//                 className="w-36 p-1 border-none rounded-lg bg-gray-100 text-sm"
//               />
//               <button
//                 type="submit"
//                 className="bg-blue-500 text-white py-1 px-3 rounded-md text-sm transition-colors hover:bg-blue-700 mt-2"
//               >
//                 Upload Image
//               </button>
//             </form>
//           </div>

//           {/* Profile Form */}
//           <div className="flex-grow pl-6">
//             {isAdmin ? (
//               <UserTabs activeTab="profile" />
//             ) : (
//               <Link
//                 href="/profile"
//                 className="text-black font-semibold hover:text-gray-700 transition"
//               >
//                 Profile
//               </Link>
//             )}

//             <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
//               <div className="flex flex-col gap-6">
//                 <input
//                   type="text"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   placeholder="First and Last Name"
//                   className="w-full p-3 rounded-lg border border-gray-500 text-black placeholder-gray-500 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
//                 />

//                 <input
//                   type="email"
//                   value={email}
//                   disabled
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full p-3 rounded-lg border border-gray-500 text-black placeholder-gray-500 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
//                 />
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <input
//                   type="tel"
//                   placeholder="Phone number"
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                   className="w-full p-3 rounded-lg border border-gray-500 text-black placeholder-gray-500 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
//                 />

//                 <input
//                   type="text"
//                   placeholder="Street Address"
//                   value={streetAddress}
//                   onChange={(e) => setStreetAddress(e.target.value)}
//                   className="w-full p-3 rounded-lg border border-gray-500 text-black placeholder-gray-500 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
//                 />
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <input
//                   type="text"
//                   placeholder="Postal Code"
//                   value={postalCode}
//                   onChange={(e) => setPostalCode(e.target.value)}
//                   className="w-full p-3 rounded-lg border border-gray-500 text-black placeholder-gray-500 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
//                 />

//                 <input
//                   type="text"
//                   placeholder="City"
//                   value={city}
//                   onChange={(e) => setCity(e.target.value)}
//                   className="w-full p-3 rounded-lg border border-gray-500 text-black placeholder-gray-500 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
//                 />
//               </div>

//               <input
//                 type="text"
//                 placeholder="Country"
//                 value={country}
//                 onChange={(e) => setCountry(e.target.value)}
//                 className="w-full p-3 rounded-lg border border-gray-500 text-black placeholder-gray-500 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
//               />

//               <button
//                 type="submit"
//                 className="px-6  w-full py-2 mt-7 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 Save
//               </button>
//             </form>
//           </div>
//         </section>
//       </div>

//     </>
//   );
// };

// export default Page;
"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAuth } from "../context/page";
import toast from "react-hot-toast";
import Link from "next/link";
import UserTabs from "../components/UserTabs";

const Page = () => {
  const { user } = useAuth();
  const { data: session } = useSession();
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
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (session) {
      setEmail(session.user.email);
      setUsername(session.user.name);
    } else if (user) {
      setEmail(user.email);
      setUsername(user.name);
    }
  }, [session, user]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
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
            const response = await fetch("/api/profile", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            });

            if (response.ok) {
              const data = await response.json();
              setUsername(data.userProfile.name);
              setPhone(data.userProfile.phone);
              setStreetAddress(data.userProfile.streetAddress);
              setPostalCode(data.userProfile.postalCode);
              setCity(data.userProfile.city);
              setCountry(data.userProfile.country);
              setIsAdmin(data.userProfile.admin);
              setUploadedImageUrl(data.userProfile.userImage || "");
            } else {
              console.error("Failed to fetch profile for Google session");
            }
            return;
          }
        }

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
          setUsername(data.userProfile.name);
          setPhone(data.userProfile.phone);
          setStreetAddress(data.userProfile.streetAddress);
          setPostalCode(data.userProfile.postalCode);
          setCity(data.userProfile.city);
          setCountry(data.userProfile.country);
          setIsAdmin(data.userProfile.admin);
          setUploadedImageUrl(data.userProfile.userImage || "");
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserImage(file);
    }
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
      setUploadedImageUrl(data.imageUrl); // Update state with the uploaded image URL
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

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

    let res = await r.json();
    if (res.ok) {
      toast.success("Profile saved!");
      setProfileSaved(!profileSaved);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center py-8 px-4 bg-gray-50">
        <section className="shadow-lg rounded-xl bg-white w-full max-w-4xl p-8 border border-gray-300 flex flex-col sm:flex-row">
          {/* Profile Image Section */}
          <div className="flex flex-col items-center justify-center w-full sm:w-1/3 border-b sm:border-r sm:border-gray-300 pr-6 pb-6 sm:pb-0 sm:pr-6">
            {uploadedImageUrl ? (
              <img
                src={uploadedImageUrl}
                alt="Profile Image"
                className="w-40 h-40 rounded-full object-cover border-2 border-gray-300"
              />
            ) : (
              <div
                className="w-40 h-40 rounded-full bg-gray-300 flex items-center justify-center text-white text-lg"
              >
                No Image
              </div>
            )}

            {/* Upload Image Form */}
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
            {isAdmin ? (
              <UserTabs activeTab="profile" />
            ) : (
              <Link
                href="/profile"
                className="text-black font-semibold hover:text-gray-700 transition"
              >
                Profile
              </Link>
            )}

            <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="First and Last Name"
                  className="w-full p-3 rounded-lg border border-gray-500 text-black placeholder-gray-500 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                />

                <input
                  type="email"
                  value={email}
                  disabled
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-500 text-black placeholder-gray-500 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="tel"
                  placeholder="Phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-500 text-black placeholder-gray-500 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                />

                <input
                  type="text"
                  placeholder="Street Address"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-500 text-black placeholder-gray-500 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Postal Code"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-500 text-black placeholder-gray-500 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                />

                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-500 text-black placeholder-gray-500 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                />
              </div>

              <input
                type="text"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-500 text-black placeholder-gray-500 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              />

              <button
                type="submit"
                className="px-6 w-full py-2 mt-7 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                Save Changes
              </button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default Page;
