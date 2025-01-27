
// "use client";
// import React, { useState, useEffect, useContext } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '../context/page';
// import { useSession, signIn, signOut } from 'next-auth/react';
// import App from '../Register/page';
// import { getUserFromToken } from '../utils/tokenUtils';
// import { CartContext } from '../SessionWrapper';

// // Import a cart icon from a library or use your own
// import { FaShoppingCart } from 'react-icons/fa'; 

// const Navbar = () => {
//   const [username, setUsername] = useState('');
//   const [UploadedImageUrl, setUploadedImageUrl] = useState("")
//   const { isLoggedin, user, isLoading, logout } = useAuth();
//   const { data: session } = useSession();
//   const router = useRouter();
//   const [isModelOpen, setIsModelOpen] = useState(false);
//   const { cartProducts, addtocart } = useContext(CartContext);

//   useEffect(() => {
//     if (session?.user?.name) {
//       setUsername(session.user.name); // Set username from session
//     }
//   }, [session]);

//   useEffect(() => {
//     if (user) {
//       setUsername(user.name); // Set username from decoded token if available
//     }
//   }, [user]);

//   const handleLogout = async () => {
//     logout(); // Logout function from context
//     signOut({ callbackUrl: "/" }); // NextAuth signOut
//     router.push("/"); // Redirect to homepage after logging out
//   };

//   useEffect(() => {
//     const getdata = async () => {
//       const response = await fetch("/api/profile", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//       });
//       if (response.ok) {
//         const data = await response.json();
//         setUploadedImageUrl(data.userProfile.userImage || "");
//       }
//     };
//     getdata();
//   }, []);

//   const toggleChange = () => {
//     setIsModelOpen(!isModelOpen);
//   };

//   if (isLoading) {
//     return <div>Loading...</div>; // Show loading state
//   }

//   return (
//     <div className="bg-white shadow-md">
//       <header className="container mx-auto flex items-center justify-between py-4 px-6">
//         <nav className="hidden md:flex gap-6 items-center">
//           {(isLoggedin || session) && (
//             <>
//               <img
//                 src={UploadedImageUrl}
//                 alt="Profile Image"
//                 className="w-10 h-10 rounded-full object-cover border-2 border-gray-300"
//               />
//             </>
//           )}
//           <Link href="/" className="text-blue-600 text-3xl tracking-wide hover:text-blue-600 transition-colors duration-300 font-semibold">
//             TAKE A SLICE
//           </Link>
//           <Link href="/" className="text-black font-semibold hover:text-blue-600 transition-colors duration-300">Home</Link>
//           <Link href="/menu" className="text-black font-semibold hover:text-blue-600 transition-colors duration-300">Menu</Link>
//           <Link href="/#about" className="text-black font-semibold hover:text-blue-600 transition-colors duration-300">About</Link>
//           <Link href="/#contact" className="text-black font-semibold hover:text-blue-600 transition-colors duration-300 py-3">Contact</Link>
//         </nav>
//         <nav className='hidden md:flex gap-4 items-center'>
//           {(isLoggedin || session) ? (
//             <>
//               <Link href={"/profile"}>Hello, {username}</Link>
//               <button onClick={handleLogout} className="bg-blue-600 text-white font-semibold rounded-full px-6 py-2 hover:bg-blue-700 transition-colors duration-300">
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <Link href="/login" className="text-black font-semibold hover:text-blue-600 transition-colors duration-300">
//                 Login
//               </Link>
//               <button onClick={toggleChange} className="bg-blue-600 text-white font-medium rounded-full px-6 py-2 hover:bg-blue-700 transition-colors duration-300">
//                 Register
//               </button>
//             </>
//           )}
//        <Link href="/cart" className="relative flex items-center text-black font-medium hover:text-blue-600 transition-colors duration-300">
//   <FaShoppingCart size={24} />
//   {cartProducts.length > 0 && (
//     <span className="absolute top-[-4px] right-[-4px] bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//       {cartProducts.length}
//     </span>
//   )}
// </Link>

//         </nav>
//         {isModelOpen && (
//           <div className='fixed inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-center z-50' onClick={toggleChange}>
//             <div className='p-6 bg-black shadow-lg rounded-lg relative w-[700px] h-[600px]' onClick={(e) => e.stopPropagation()}>
//               <button className='absolute top-2 right-2' onClick={toggleChange}>X</button>
//               <App closeModal={toggleChange} />
//             </div>
//           </div>
//         )}
//       </header>
//     </div>
//   );
// };

// export default Navbar;
"use client";
import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/page';
import { useSession, signIn, signOut } from 'next-auth/react';
import App from '../Register/page';
import { getUserFromToken } from '../utils/tokenUtils';
import { CartContext } from '../SessionWrapper';

// Import a cart icon from a library or use your own
import { FaShoppingCart } from 'react-icons/fa'; 

const Navbar = () => {
  const [username, setUsername] = useState('');
  const [UploadedImageUrl, setUploadedImageUrl] = useState("");
  const { isLoggedin, user, isLoading, logout } = useAuth();
  const { data: session } = useSession();
  const router = useRouter();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const { cartProducts, addtocart } = useContext(CartContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle mobile menu

  useEffect(() => {
    if (session?.user?.name) {
      setUsername(session.user.name); // Set username from session
    }
  }, [session]);

  useEffect(() => {
    if (user) {
      setUsername(user.name); // Set username from decoded token if available
    }
  }, [user]);

  const handleLogout = async () => {
    logout(); // Logout function from context
    signOut({ callbackUrl: "/" }); // NextAuth signOut
    router.push("/"); // Redirect to homepage after logging out
  };

  useEffect(() => {
    const getdata = async () => {
      const response = await fetch("/api/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setUploadedImageUrl(data.userProfile.userImage || "");
      }
    };
    getdata();
  }, []);

  const toggleChange = () => {
    setIsModelOpen(!isModelOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (isLoading) {
    return <div>Loading...</div>; // Show loading state
  }

  return (
    <div className="bg-white shadow-md">
      <header className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Mobile Navbar */}
        <nav className="md:hidden flex items-center justify-between w-full">
          <Link href="/" className="text-blue-600 text-3xl tracking-wide hover:text-blue-600 transition-colors duration-300 font-semibold">
            TAKE A SLICE
          </Link>

          {/* Hamburger Menu for Mobile */}
          <button onClick={toggleMenu} className="text-black text-2xl">
            {isMenuOpen ? "X" : "☰"}
          </button>
        </nav>

        {/* Desktop Navbar */}
        <nav className="hidden md:flex gap-6 items-center w-full">
          <Link href="/" className="text-blue-600 text-3xl tracking-wide hover:text-blue-600 transition-colors duration-300 font-semibold">
            TAKE A SLICE
          </Link>
          <Link href="/" className="text-black font-semibold hover:text-blue-600 transition-colors duration-300">Home</Link>
          <Link href="/menu" className="text-black font-semibold hover:text-blue-600 transition-colors duration-300">Menu</Link>
          <Link href="/#about" className="text-black font-semibold hover:text-blue-600 transition-colors duration-300">About</Link>
          <Link href="/#contact" className="text-black font-semibold hover:text-blue-600 transition-colors duration-300 py-3">Contact</Link>
        </nav>

        {/* Right Side (Login, Register, Cart) */}
        <div className="flex items-center gap-4">
          {(isLoggedin || session) ? (
            <>
              <Link href={"/profile"}>Hello, {username}</Link>
              <button onClick={handleLogout} className="bg-blue-600 text-white font-semibold rounded-full px-6 py-2 hover:bg-blue-700 transition-colors duration-300">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-black font-semibold hover:text-blue-600 transition-colors duration-300">
                Login
              </Link>
              <button onClick={toggleChange} className="bg-blue-600 text-white font-medium rounded-full px-6 py-2 hover:bg-blue-700 transition-colors duration-300">
                Register
              </button>
            </>
          )}
          
          <Link href="/cart" className="relative flex items-center text-black font-medium hover:text-blue-600 transition-colors duration-300">
            <FaShoppingCart size={24} />
            {cartProducts.length > 0 && (
              <span className="absolute top-[-4px] right-[-4px] bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartProducts.length}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Menu (Dropdown) */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-md p-4">
            <Link href="/" className="block text-black font-semibold py-2">Home</Link>
            <Link href="/menu" className="block text-black font-semibold py-2">Menu</Link>
            <Link href="/#about" className="block text-black font-semibold py-2">About</Link>
            <Link href="/#contact" className="block text-black font-semibold py-2">Contact</Link>
          </div>
        )}

        {/* Modal for Register */}
        {isModelOpen && (
          <div className='fixed inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-center z-50' onClick={toggleChange}>
            <div className='p-6 bg-black shadow-lg rounded-lg relative w-[700px] h-[600px]' onClick={(e) => e.stopPropagation()}>
              <button className='absolute top-2 right-2' onClick={toggleChange}>X</button>
              <App closeModal={toggleChange} />
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default Navbar;
