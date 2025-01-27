"use client"
import { useState,useEffect } from 'react';
import React, { useContext } from 'react';
import { CartContext } from '../SessionWrapper';
import toast from 'react-hot-toast';
import Image from 'next/image';
import AddToCartButton from './AddToCartButton';
const Menuitem = ({ name, desc, baseprice, userImage, sizes, ingredients }) => {
  const {addtocart}= useContext(CartContext)
  const [showpopup, setshowpopup] = useState(false)
  const [selectedSize, setselectedSize] = useState(null)
  const [selectedextras, setselectedextras] = useState([])
  const handleaddtocart=()=>{
    
    if(sizes.length===0 && ingredients.length===0){
      addtocart({ name, desc, baseprice, userImage, sizes, ingredients })
      toast.success("added to the cart!")
    }
    else {
      toast.error("Please select a size or ingredient."); // Optionally, show an error if not valid
      setshowpopup(!showpopup) 
    }
  }
  const handlextrathingclick=(e)=>{
console.log(e)
  }
  return (
<>

{showpopup && (
  <div className=" fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50 p-10" onClick={()=>setshowpopup(!showpopup)}>
    <div className="bg-gray-900 text-center p-6 rounded-lg max-w-md shadow-lg space-y-6" onClick={e=>e.stopPropagation()}>
      {/* Image */}
      <Image     
        src={userImage}
        className="mb-4 mx-auto rounded-lg"
        width={300}
        height={200}
        alt={name}
      />
      {/* Name */}
      <h2 className="text-lg font-bold text-blue-400">{name}</h2>
      {/* Description */}
      <p className="text-gray-300">{desc}</p>
      {/* Sizes Section */}
      {sizes.length>0 && ( 
        <div className="bg-gray-800 rounded-md p-4 space-y-2">
          <h3 className="text-sm font-semibold text-gray-100">Pick your size</h3>
          {sizes.map((e) => (
            <label className="block py-1 text-gray-300" key={e.name}>
              <input   
                type="checkbox"
                name="text"
                onClick={()=>setselectedSize(e)}
                checked={selectedSize?.name===e.name}
                className="mr-2 accent-blue-500"
              />
              {e.name} <span className="text-gray-400">${baseprice + e.price}</span>
            </label>
          ))}
        </div>
      )}
      {/* Ingredients Section */}
      {ingredients.length>0 && (
        <div className="bg-gray-800 rounded-md p-4 space-y-2">
          <h3 className="text-sm font-semibold text-gray-100">
            Pick your addons
          </h3>
          {ingredients.map((e) => (
            <label className="block py-1 text-gray-300" key={e.name}>
              <input
                type="checkbox" onClick={handlextrathingclick}
                className="mr-2 accent-blue-500"
              />
              {e.name} <span className="text-gray-400">${baseprice + e.price}</span>
            </label>
          ))}
        </div>
      )}
      {/* Action Button */}
      <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors w-full">
        Order
      </button>
    </div>
  </div>
)}

<div className='bg-gray-100 p-6 rounded-lg shadow-md'>
      <div className="relative w-full h-40 overflow-hidden rounded-lg">
        <img
          src={userImage}
          alt={name}
          className="object-cover w-full h-full"
        />
      </div>
      {/* Item Name */}
      <h4 className="font-semibold my-3 text-lg">{name}</h4>
      {/* Description */}
      <p className="text-gray-500 text-sm mb-2">{desc || 'No description available.'}</p>
      {/* Add to Cart Button with Dynamic Price */}
    {sizes.length>0 || ingredients.length>0 ? (<>
      <button onClick={handleaddtocart} className="bg-blue-700 p-2 my-4 rounded-lg px-4 text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full">
       Add to cart from  ${baseprice} 
      </button>
    </>) : (<>
      <button onClick={handleaddtocart} className="bg-blue-700 p-2 my-4 rounded-lg px-4 text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full">
        Add to cart  ${baseprice} 
      </button>
    </>)}
    </div>
    </>
  
  );

};

export default Menuitem;
