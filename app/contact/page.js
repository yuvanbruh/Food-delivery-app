"use client";
import React, { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="bg-white shadow-md">
      <header className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <Link
          className="text-blue-600 text-3xl tracking-wide hover:text-blue-600 transition-colors duration-300 font-semibold"
          href="/"
        >
          TAKE A SLICE
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex gap-6 items-center">
          <Link
            href="/"
            className="text-black font-medium hover:text-blue-600 transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            href="/menu"
            className="text-black font-medium hover:text-blue-600 transition-colors duration-300"
          >
            Menu
          </Link>
          <Link
            href="/about"
            className="text-black font-medium hover:text-blue-600 transition-colors duration-300"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-black font-medium hover:text-blue-600 transition-colors duration-300"
          >
            Contact
          </Link>
        </nav>
        <nav className="hidden md:flex gap-4 items-center">
          <Link
            href="/login"
            className="text-black font-medium hover:text-blue-600 transition-colors duration-300"
          >
            Login
          </Link>
          <button
            onClick={toggleModal}
            className="bg-blue-600 text-white font-medium rounded-full px-6 py-2 hover:bg-blue-700 transition-colors duration-300"
          >
            Register
          </button>
        </nav>
      </header>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50"
          onClick={toggleModal} // Close modal when clicking on the background
        >
          {/* Modal Content */}
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-80 relative"
            onClick={(e) => e.stopPropagation()} // Prevent background click from closing modal
          >
            {/* Close Button */}
            <button
              onClick={toggleModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4 text-center">
              Create your account
            </h2>
            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Name"
                className="p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              />
              <input
                type="email"
                placeholder="Email"
                className="p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
