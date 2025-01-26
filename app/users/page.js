

"use client";

import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
// import UserTabs from "../components/UserTabs";
import UserTabs from "../components/UserTabs";
const page = () => {
  const [admin, setAdmin] = useState(false);
  const [users, setusers] = useState([])
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
const response = await fetch("/api/users")
const r= await response.json()
setusers(r.users)
}
getdata()
},[])
const handleDelete = async (_id) => {
  const response = await fetch(`/api/users?_id=${_id}`, {
    method: 'DELETE',
  });
  const res = await response.json()
  if(res.ok){
    setusers((prev) => prev.filter((category) => category._id !== _id));
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
  {/* Toast Notifications */}
  <Toaster />

  <section className="mt-6 max-w-3xl mx-auto bg-white border border-blue-200 shadow-lg rounded-xl p-6 space-y-8">
    {/* Tabs */}
    <UserTabs activeTab="users" />

    {users.map((e) => (
          <article
            key={e._id}
            className="p-4 border border-gray-300 rounded-md shadow-sm hover:bg-blue-100 transition duration-200 mb-2 flex items-center justify-between"
          >
            <span className="text-gray-700 font-semibold">
              {e.name}
             
              </span>
              <span className="text-gray-500 font-semibold">
              {e.email}
    
              </span>
            

            <div className="flex gap-2">
              <Link href={"/users/"+e._id}
                onClick={() => {
                  // seteditingcategories(e);
                  // setnewcategory(e.name);
                }}
                className="px-4 py-2 text-sm bg-r text-black border border-gray-600 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(e._id)}
                className="px-4 py-2 text-sm bg-r text-black border border-gray-600 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
              >
                Delete
              </button>
            </div>
          </article>
        ))}
  </section>
</div>

  

);
  
}

export default page
