


// "use client";
// import React, { useEffect, useState } from "react";
// import { Toaster, toast } from "react-hot-toast";
// import UserTabs from "../../components/UserTabs";
// import Link from "next/link";
// import { redirect } from "next/dist/server/api-utils";
// import Router from "next/navigation";
// import { useRouter } from "next/navigation";
//  // Adjust the import path based on your project structure
// // import EditableImage from "../components/EditableImage";

// const Page = () => {
//   const router = useRouter()
//   const [admin, setAdmin] = useState(false);
//   const [menuItems, setMenuItems] = useState("");
//   const [imageLink, setImageLink] = useState(""); // State to store image link
//     const [name, setname] = useState("")
//     const [desc, setdesc] = useState("")
//     const [baseprice, setbaseprice] = useState("")
//     const [redirecttoitems, setredirecttoitems] = useState(false)
//     const [uploadedImageUrl, setUploadedImageUrl] = useState("");
//     const [image, setImage] = useState(null);
  
//     // const [allcategories, setallcategories] = useState([]);
//     // const [editingcategories, seteditingcategories] = useState(null);

//   // Fetch user profile to check admin status
//   useEffect(() => {
//     const getData = async () => {
//       try {
//         const response = await fetch("/api/profile");
//         const result = await response.json();
//         setAdmin(result.userProfile.admin);
//       } catch (error) {
//         toast.error("Failed to fetch user profile.");
//       }
//     };
//     getData();
//   }, []);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//     }
//   };
//   const handleUpload = async (e) => {
//     e.preventDefault();
//     if (!image) {
//       alert("Please select an image to upload!");
//       return;
//     }
//     if (!name) {
//       alert("no name is given");
//       return;
//     }
//     const formData = new FormData();
//     formData.append("file", image);
//     formData.append("name", name);
//     formData.append("desc", desc);
//     formData.append("baseprice", baseprice);
//     // formData.append("name", name);
//      // Use whichever email is available, either from session or user

//     try {
//       const response = await fetch("/api/menu", {
//         method: "POST",
//         body: formData,
//       });
//       if (!response.ok) {
//         throw new Error("Failed to upload image.");
//       }
//       const data = await response.json();
//       console.log("Backend Response:", data);

//       // Update state with the uploaded image URL
//       setUploadedImageUrl(data.imageUrl);

//       // Log the uploaded URL directly from the response
//       console.log("Uploaded Image URL from response:", data.imageUrl);
//     } catch (error) {
//       console.error("Error uploading image:", error);
//     }
//   };
//   // Handle form submission for menu items
//   const handleMenuSubmit = async (e) => {
//     e.preventDefault();
//     const data= { 
//         name, desc, baseprice
//      }
//     let toastId;
//     toast.success("Form submitted successfully!");
//           toastId = toast.loading("Creating menu...");
//           const r = await fetch("/api/menu", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(data),
//           });
//           let res = await r.json();
//           if (res.ok) {
//             toast.success("Category menu successfully!", { id: toastId })
//             setname("");
//             setdesc("");
//             setbaseprice("");
//             // setallcategories((prev) => [...prev, res.newCategory])
//           } else {
//             toast.error("Failed to create menu.", { id: toastId });
//           }
//           // return redirect("/menuItems")
//           setredirecttoitems(true)
//     // Add your submission logic here
// };
//   if(redirecttoitems){
//     // return redirect("/menuItems")
//     router.push("/menuItems")
//   }

//   // Render message if user is not an admin
//   if (!admin) {
//     return (
//       <div className="flex items-center justify-center h-screen text-center text-xl text-red-600 font-semibold">
//         You are not an admin.
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 border-black-300">
//       {/* Toast Notifications */}
//       <Toaster />

//       <section className="mt-6 max-w-2xl mx-auto bg-white border-gray-300 shadow-xl rounded-xl p-6 space-y-6">
//         {/* Tabs */}
//         <UserTabs activeTab="menu-items" />
//         <div>
//   <Link
//     href={"/menuItems"}
//     className="inline-block w-full text-center px-4 py-2 bg- text-black font-medium border border-gray-400 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
//   >
//     Show all menu items
//   </Link>
// </div>
// <div>
// <div className="flex flex-col items-center justify-center space-y-4">
//       {/* Profile image display */}
//       <div>
//         {uploadedImageUrl ? (
//           <img
//             src={uploadedImageUrl}
//             alt="Uploaded"
//             className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
//           />
//         ) : (
//           <div
//             className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center text-white text-lg"
//           >
//             No Image
//           </div>
//         )}
//       </div>

//       {/* Form for file input */}
//       <form onSubmit={handleUpload} className="flex flex-col items-center space-y-4">
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleFileChange}
//           className="w-36 p-1 border-none rounded-lg bg-gray-100 text-sm"
//         />
//         <button
//           type="submit"
//           className="bg-blue-500 text-white py-1 px-3 rounded-md text-sm transition-colors hover:bg-blue-700"
//         >
//           Upload
//         </button>
//       </form>

 
//     </div>
  
// </div>
//         {/* Form */}
//         <form className="mt-4 space-y-6" onSubmit={handleMenuSubmit}>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Left Section (Image Upload) */}
        

//             {/* Right Section (Form Fields) */}
//             <div className="space-y-5">
//               {/* Item Name */}
//               <div>
//                 <label className="block text-lg font-medium text-gray-700">
//                   Item Name
//                 </label>
//                 <input value={name} onChange={(e)=>{
//                     setname(e.target.value)
//                 }}
//                   type="text"
//                 //   placeholder="Enter the item name"
//                   className="w-full p-2 rounded-lg border border-gray-300 text-black placeholder-gray-500 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
//                 />
//               </div>

//               {/* Description */}
//               <div>
//                 <label className="block text-lg font-small text-gray-700">
//                   Description
//                 </label>
//                 <input
//                 //   placeholder="Enter a brief description"
//                   className="w-full p-2 rounded-lg border border-gray-300 text-black placeholder-gray-500 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
//                   rows="3" value={desc} onChange={e=>setdesc(e.target.value)}
//                 ></input>
//               </div>

//               {/* Base Price */}
//               <div>
//                 <label className="block text-lg font-medium text-gray-700">
//                   Base Price
//                 </label>
//                 <input
//                   type="text" value={baseprice} onChange={e=>setbaseprice(e.target.value)}
//                 //   placeholder="Enter the price"
//                   className="w-full p-2 rounded-lg border border-gray-300 text-black placeholder-gray-500 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <div className="text-right mt-6">
//             <button
//               type="submit"
//               className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
//             >
//               Create
//             </button>
//           </div>
//         </form>
//       </section>
//     </div>
//   );
// };

// export default Page;



"use client";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import UserTabs from "../../components/UserTabs";
import Link from "next/link";
import { redirect } from "next/dist/server/api-utils";
import Router from "next/navigation";
import { useRouter } from "next/navigation";
 // Adjust the import path based on your project structure
// import EditableImage from "../components/EditableImage";

const Page = () => {
  const router = useRouter()
  const [admin, setAdmin] = useState(false);
  const [menuItems, setMenuItems] = useState("");
  const [imageLink, setImageLink] = useState(""); // State to store image link
    const [name, setname] = useState("")
    const [desc, setdesc] = useState("")
    const [baseprice, setbaseprice] = useState("")
    const [redirecttoitems, setredirecttoitems] = useState(false)
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [image, setImage] = useState(null);
  
    // const [allcategories, setallcategories] = useState([]);
    // const [editingcategories, seteditingcategories] = useState(null);

  // Fetch user profile to check admin status
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("/api/profile");
        const result = await response.json();
        setAdmin(result.userProfile.admin);
      } catch (error) {
        toast.error("Failed to fetch user profile.");
      }
    };
    getData();
  }, []);

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

    const formData = new FormData();
    formData.append("action", "upload");
    formData.append("file", image);
    // formData.append("name", name);
    // formData.append("desc", desc);
    // formData.append("baseprice", baseprice);
    // formData.append("name", name);
     // Use whichever email is available, either from session or user

    try {
      const response = await fetch("/api/menu", {
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
  // Handle form submission for menu items
  const handleMenuSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("action", "create");
    formData.append("name", name);
    formData.append("desc", desc);
    formData.append("baseprice", baseprice);
    formData.append("file", image);

    const data= { 
        name, desc, baseprice
     }
    let toastId;
    toast.success("Form submitted successfully!");
          // toastId = toast.loading("Creating menu...");
          const r = await fetch("/api/menu", {
            method: "POST",
            body: formData,
          });
          let res = await r.json();
          if (res.ok) {
            toast.success("Category menu successfully!", { id: toastId })
            setname("");
            setdesc("");
            setbaseprice("");
            setUploadedImageUrl(res.imageUrl);
            // setallcategories((prev) => [...prev, res.newCategory])
          } else {
            toast.error("Failed to create menu.", { id: toastId });
          }
          // return redirect("/menuItems")
          setredirecttoitems(true)
    // Add your submission logic here
};
  if(redirecttoitems){
    // return redirect("/menuItems")
    router.push("/menuItems")
  }

  // Render message if user is not an admin
  if (!admin) {
    return (
      <div className="flex items-center justify-center h-screen text-center text-xl text-red-600 font-semibold">
        You are not an admin.
      </div>
    );
  }

  return (
<div className="min-h-screen bg-gray-50 border-black-300">
  {/* Toast Notifications */}
  <Toaster />

  <section className="mt-6 max-w-4xl mx-auto bg-white border-gray-300 shadow-xl rounded-xl p-6 space-y-6">
    {/* Tabs */}
    <UserTabs activeTab="menu-items" />
    <div>
      <Link
        href={"/menuItems"}
        className="inline-block w-full text-center px-4 py-2 bg- text-black font-medium border border-gray-400 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
      >
        Show all menu items
      </Link>
    </div>

    <div className="flex flex-wrap md:flex-nowrap items-start space-x-6">
      {/* Image Section */}
      <div className="flex flex-col items-center w-full md:w-1/3">
        <div className="w-48 h-48 rounded-lg bg-gray-300 overflow-hidden flex items-center justify-center">
          {uploadedImageUrl ? (
            <img
              src={uploadedImageUrl}
              alt="Uploaded"
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="text-white text-lg">No Image</div>
          )}
        </div>

        <form
          onSubmit={handleUpload}
          className="mt-4 flex flex-col items-center space-y-4"
        >
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

      {/* Input Form Section */}
      <div className="w-full md:w-2/3 space-y-6">
        <form className="space-y-6" onSubmit={handleMenuSubmit}>
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Item Name
            </label>
            <input
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
              type="text"
              className="w-full p-2 rounded-lg border border-gray-300 text-black placeholder-gray-500 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={desc}
              onChange={(e) => setdesc(e.target.value)}
              rows="3"
              className="w-full p-2 rounded-lg border border-gray-300 text-black placeholder-gray-500 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">
              Base Price
            </label>
            <input
              type="text"
              value={baseprice}
              onChange={(e) => setbaseprice(e.target.value)}
              className="w-full p-2 rounded-lg border border-gray-300 text-black placeholder-gray-500 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            />
          </div>
          

          <div className="text-right mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</div>

  );
};

export default Page;