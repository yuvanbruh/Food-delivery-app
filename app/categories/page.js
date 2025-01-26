"use client";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast"; // Assuming Toaster is from react-hot-toast
import UserTabs from "../components/UserTabs"; // Adjust the import path based on your project structure

const Page = () => {
  const [admin, setadmin] = useState(false);
  const [newcategory, setnewcategory] = useState("");
  const [allcategories, setallcategories] = useState([]);
  const [editingcategories, seteditingcategories] = useState(null);

  useEffect(() => {
    const getdata = async () => {
      const r = await fetch("/api/profile");
      const res = await r.json();
      setadmin(res.userProfile.admin);
    };
    getdata();
  }, []);

  useEffect(() => {
    const getdata = async () => {
      const r = await fetch("/api/categories");
      const res = await r.json();
      if (res.ok) {
        toast.success("Categories fetched successfully!");
        // setallcategories(
        //   res.finduser.filter((item, index, self) => item.name && self.findIndex((i) => i.name === item.name) === index) // Filter duplicates and empty names
        // );
        setallcategories(res.finduser)
        setnewcategory("");
      } else {
        toast.error("Failed to fetch categories.");
      }
    };
    getdata();
  }, []);
  const handleDelete = async (_id) => {
    const response = await fetch(`/api/categories?_id=${_id}`, {
      method: 'DELETE',
    });
    const res = await response.json()
    if(res.ok){
      setallcategories((prev) => prev.filter((category) => category._id !== _id));
    }
    console.log(_id)
  };
  
  const handleformsubmit = async (e) => {
    e.preventDefault();
    let toastId;
    if (editingcategories) {
      const data = { name: newcategory };
      data._id = editingcategories._id;

      toastId = toast.loading("Updating category...");

      const r = await fetch("/api/categories", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      let res = await r.json();
      if (res.ok) {
        toast.success("Category updated successfully!", { id: toastId });
        setnewcategory("");
        seteditingcategories(null);
        setallcategories((prev) =>
            prev.map((cat) =>
              cat._id === editingcategories._id ? { ...cat, name: newcategory } : cat
            )
          );
      } else {
        toast.error("Failed to update category.", { id: toastId });
      }
    } else {
      toastId = toast.loading("Creating category...");

      const r = await fetch("/api/categories", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newcategory }),
      });

      let res = await r.json();
      if (res.ok) {
        toast.success("Category created successfully!", { id: toastId });
        setnewcategory("");
        seteditingcategories(null);
        setallcategories((prev) => [...prev, res.createuser]);
        // setallcategories((prev) => [...prev, res.newCategory])
      } else {
        toast.error("Failed to create category.", { id: toastId });
      }
    }
  };
        
  if (!admin) {
    return (
      <div className="flex items-center justify-center h-screen text-center text-xl text-red-600 font-semibold">
        You are not an admin.
      </div>
    );
  }

  return (<div className="min-h-screen bg-gray-50">
    <Toaster />
    <section className="mt-8 max-w-lg mx-auto bg-white border-gray-300 shadow-lg rounded-lg p-6">
      <UserTabs activeTab="categories" />
      <form className="mt-8" onSubmit={handleformsubmit}>
        <div className="flex gap-4 items-center">
          <div className="grow">
            <label className="block text-sm font-medium text-gray-700">
              {editingcategories ? "Update category:" : "New Category Name"}
            </label>
            {editingcategories && (
              <div className="text-blue-600 text-sm mt-1 font-semibold">
                {editingcategories.name}
              </div>
            )}
            <input
              type="text"
              value={newcategory}
              onChange={(e) => setnewcategory(e.target.value)}
              className="w-full p-2 mt-3 rounded-lg border border-gray-700 text-black placeholder-gray-500 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            />
          </div>
          <div>
            <button
              type="submit"
              className="px-6 py-2 mt-7 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {editingcategories ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </form>
  
      <div className="mt-6">
        {allcategories.map((e) => (
          <article
            key={e._id}
            className="p-4 border border-gray-300 rounded-md shadow-sm hover:bg-blue-100 transition duration-200 mb-2 flex items-center justify-between"
          >
            <span className="text-gray-700 font-semibold">{e.name}</span>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  seteditingcategories(e);
                  setnewcategory(e.name);
                }}
                className="px-4 py-2 text-sm bg-r text-black border border-gray-600 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(e._id)}
                className="px-4 py-2 text-sm bg-r text-black border border-gray-600 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  </div>
  
  );
};

export default Page;