import React from 'react';

const Menucomp = ({ name, desc, baseprice, userImage, sizes, ingredients }) => {
  return (
    <div className="p-4 rounded-lg text-center bg-gray-200 shadow-md">
      {/* Dynamic Image */}
      <div className="relative w-full h-32 overflow-hidden rounded-md mx-auto max-w-[150px]">
        <img
          src={userImage}
          alt={name}
          className="object-cover w-full h-full"
        />
      </div>
      {/* Item Name */}
      <h4 className="font-semibold my-3 text-base">{name}</h4>
      {/* Description */}
      <p className="text-gray-500 text-sm mb-2">{desc || 'No description available.'}</p>
      {/* Add to Cart Button with Dynamic Price */}
      <button className="bg-blue-700 p-2 my-4 rounded-lg px-4 text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
        Add to cart ${baseprice}
      </button>
    </div>
  );
};

export default Menucomp;
