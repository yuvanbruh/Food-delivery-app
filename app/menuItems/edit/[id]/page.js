"use client";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import UserTabs from "@/app/components/UserTabs";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
// import Categories from "@/app/models/category";

const Page = () => {
  const { id } = useParams();
  const router = useRouter();
  const [admin, setAdmin] = useState(false);
  const [imageLink, setImageLink] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [redirectToItems, setRedirectToItems] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [image, setImage] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [ingredients, setingredients] = useState([]);
  const [issizeopen, setIssizeOpen] = useState(false);
  const [isingredientsopen, setIsIngredientsOpen] = useState(false);
  const [showconfirm, setshowconfirm] = useState(false)
  const [allcategories, setallcategories] = useState([])
  const [category, setcategory] = useState("")

  const toggleSizeSection = () => setIssizeOpen(!issizeopen);
  const toggleIngredientsSection = () => setIsIngredientsOpen(!isingredientsopen);

  // Add a new size
  const addSize = () => {
    setSizes((prevSizes) => [...prevSizes, { name: "", price: 0 }]);
  };

  const addIngredients = () => {
    setingredients((prev) => [...prev, { name: "", price: 0 }]);
  };

  // Update size data
  const updateSize = (index, field, value) => {
    const updatedSizes = [...sizes];
    updatedSizes[index][field] = value;
    setSizes(updatedSizes);
  };

  const updateIngredients = (index, field, value) => {
    const updatedIng = [...ingredients];
    updatedIng[index][field] = value;
    setingredients(updatedIng);
  };

  // Function to handle size deletion
  const handleDeleteSize = (index) => {
    const updatedSizes = [...sizes];
    updatedSizes.splice(index, 1);
    setSizes(updatedSizes);
  };

  const handleDeleteIngredient = (index) => {
    const updatedIng = [...ingredients];
    updatedIng.splice(index, 1);
    setingredients(updatedIng);
  };

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
        // setnewcategory("");
      } else {
        toast.error("Failed to fetch categories.");
      }
    };
    getdata();
  }, []);

  // Fetch menu item data by ID
  useEffect(() => {
    const getData = async () => {
      try {
        const r = await fetch("/api/menu");
        if (!r.ok) throw new Error("Failed to fetch data");
        const result = (await r.json()).finduser;
        const item = result.find((i) => i._id === id);
        if (item) {
          setName(item.name);
          setDesc(item.desc);
          setBasePrice(item.baseprice);
          setUploadedImageUrl(item.userImage);
          setingredients(item.ingredients);
          setSizes(item.sizes);
          setcategory(item.category)
        } else {
          console.error("Item not found");
        }
      } catch (err) {
        console.error("Error fetching menu data:", err);
      }
    };
    getData();
  }, [id]);

  // Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  // Handle image upload
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image) {
      alert("Please select an image to upload!");
      return;
    }

    const formData = new FormData();
    formData.append("action", "upload");
    formData.append("file", image);

    try {
      const response = await fetch("/api/menu", {
        method: "PUT",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Failed to upload image.");
      }
      const data = await response.json();
      setUploadedImageUrl(data.imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  const handleDelete = async () => {
    try {
      const r = await fetch(`/api/menu?id=${id}`, { 
        method: 'DELETE', 
      });
  const response=await r.json()
      if (response.ok) {
        toast.success("Menu item deleted successfully!");
        router.push("/menuItems"); // Redirect to menu items list after successful deletion
      } else {
        const data = await response.json();
        toast.error(`Error deleting menu item: ${data.message}`); 
      }
  
    } catch (error) {
      console.error("Error deleting menu item:", error);
      toast.error("An error occurred while deleting the menu item.");
    }
  };
  // Handle form submission for menu items
  const handleMenuSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("action", "create");
    formData.append("name", name);
    formData.append("desc", desc);
    formData.append("baseprice", basePrice);
    formData.append("file", image);
    formData.append("id", id);
    formData.append("sizes", JSON.stringify(sizes));
    formData.append("ingredients", JSON.stringify(ingredients));
    formData.append("category",category)

    let toastId;
    toast.success("Form submitted successfully!");
    const r = await fetch("/api/menu", {
      method: "PUT",
      body: formData,
    });
    const res = await r.json();
    if (res.ok) {
      toast.success("Menu updated successfully!", { id: toastId });
      setName("");
      setDesc("");
      setBasePrice("");
      setUploadedImageUrl(res.imageUrl);
    } else {
      toast.error("Failed to update menu.", { id: toastId });
    }
    setRedirectToItems(true);
  };

  if (redirectToItems) {
    router.push("/menuItems");
  }

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
            className="inline-block w-full text-center px-4 py-2 text-black font-semibold border border-gray-400 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
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
                <div className="text-white text-lg">No Image </div>
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
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className="w-full p-2 rounded-lg border border-gray-300 text-black bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  rows="3"
                  className="w-full p-2 rounded-lg border border-gray-300 text-black bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
             <div>
              <label>Category</label>
              <select value={category} onChange={e=>setcategory(e.target.value)}> 
                {allcategories.map((e)=>(
                   <option key={e._id} value={e._id}>{e.name}</option>
              
                ))}
              </select >
             </div>
              <div>
                <label className="block text-lg font-medium text-gray-700">
                  Base Price
                </label>
                <input
                  type="text"
                  value={basePrice}
                  onChange={(e) => setBasePrice(e.target.value)}
                  className="w-full p-2 rounded-lg border border-gray-300 text-black bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Toggle button for sizes */}
              <button
                type="button"
                onClick={toggleSizeSection}
                className="text-xl font-semibold text-blue-600 py-2"
              >
                {issizeopen ? <div className="inline-block w-full text-center px-4 mx-3 py-1 text-black font-light border border-gray-400 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 "> Hide sizes</div> : <div className="inline-block w-full text-center px-4 mx-3 py-1 text-black font-light border border-gray-400 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 "> Add sizes</div>}
              </button>

              {issizeopen && (
                <div className="space-y-4">
                  {sizes.map((size, index) => (
                    <div key={index} className="flex space-x-4">
                      <input
                        type="text"
                        value={size.name}
                        onChange={(e) => updateSize(index, "name", e.target.value)}
                        placeholder="Size Name"
                        className="w-32 p-2 border border-gray-300 rounded-lg"
                      />
                      <input
                        type="number"
                        value={size.price}
                        onChange={(e) => updateSize(index, "price", e.target.value)}
                        placeholder="Price"
                        className="w-32 p-2 border border-gray-300 rounded-lg"
                      />
                      <button
                        onClick={() => handleDeleteSize(index)}
                        className="text-red-600 p-2"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addSize}
                    className="text-blue-600 hover:underline"
                  >
                    Add another size
                  </button>
                </div>
              )}

              {/* Toggle button for ingredients */}
              <button
                type="button"
                onClick={toggleIngredientsSection}
                className="text-xl font-semibold text-blue-600 py-2"
              >
                  {isingredientsopen ? <div className="inline-block w-full text-center px-4 mx-3 py-1 text-black font-light border border-gray-400 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 "> Hide ingredients</div> : <div className="inline-block w-full text-center px-4 mx-3 py-1 text-black font-light border border-gray-400 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 "> Add ingredients</div>}
              </button>

              {isingredientsopen && (
                <div className="space-y-4">
                  {ingredients.map((ingredient, index) => (
                    <div key={index} className="flex space-x-4">
                      <input
                        type="text"
                        value={ingredient.name}
                        onChange={(e) =>
                          updateIngredients(index, "name", e.target.value)
                        }
                        placeholder="Ingredient Name"
                        className="w-32 p-2 border border-gray-300 rounded-lg"
                      />
                      <input
                        type="number"
                        value={ingredient.price}
                        onChange={(e) =>
                          updateIngredients(index, "price", e.target.value)
                        }
                        placeholder="Price"
                        className="w-32 p-2 border border-gray-300 rounded-lg"
                      />
                      <button
                        onClick={() => handleDeleteIngredient(index)}
                        className="text-red-600 p-2"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addIngredients}
                    className="text-blue-600 hover:underline"
                  >
                    Add another ingredient
                  </button>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >  
                Submit
              </button>
           
              <button onClick={handleDelete}
                type="submit"
                className="w-full bg-white text-black border border-gray-600 py-2 rounded-lg hover:bg-blue-700"
              >
                Delete
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
