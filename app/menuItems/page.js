

"use client";

import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import AddToCartButton from "../components/AddToCartButton";
// import UserTabs from "../components/UserTabs";
import UserTabs from "../components/UserTabs";
const page = () => {
  const [admin, setAdmin] = useState(false);
  const [menuItems, setmenuItems] = useState([])
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
    
    useEffect(()=>{
      const getdata = async()=>{
        const r = await fetch("/api/menu")
        const res = await r.json()
        if(res.ok){
          setmenuItems(res.finduser) 
          console.log("this is res 0k")
        }
        else{
          console.log("this aint working ")
        }
       
    
      }
      getdata()
    },[])
    if (!admin) {
        return (
          <div className="flex items-center justify-center h-screen text-center text-xl text-red-600 font-semibold">
            You are not an admin.
          </div>
        );
      }

  return (
<div className="min-h-screen bg-blue-50">
  {/* Toast Notifications */}
  <Toaster />

  <section className="mt-6 max-w-3xl mx-auto bg-white border border-blue-200 shadow-lg rounded-xl p-6 space-y-8">
    {/* Tabs */}
    <UserTabs activeTab="menu-items" />

    <div className="text-center">
      <Link
        href={'/menuItems/new'}
        className="inline-block w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
      >
        Create New Menu
      </Link>
    </div>

    <div>
      <h2 className="text-lg font-medium text-gray-700 mb-4">Edit Menu Items</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((e) => (
          <Link
            key={e._id}
            href={'/menuItems/edit/' + e._id}
            className="block bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition duration-200 p-4 text-center space-y-4"
          >
            <div className="relative mx-auto">
              <Image
                src={e.userImage}
                width={120}
                height={120}
                alt={e.name}
                className="rounded-lg mx-auto"
              />
            </div>
            <div className="text-lg font-medium text-gray-800">{e.name}</div>
          </Link>
        ))}
      </div>
    </div>
  </section>
</div>

  

);
  
}

export default page
