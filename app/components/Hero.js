// // // import React from 'react';
// // // import Right from './icons/Right';
// // // import Link from 'next/link';
// // // const Hero = () => {
// // //   return (
// // //     <div className="py-7">
// // //       <section className="grid grid-cols-2 items-center gap-8">
// // //         <div className="px">
// // //           <h1 className="text-4xl font-semibold text-gray-800  ">
// // //             Everything is better with a 
// // //             <p className='text-blue-700'>Pizza</p> 
            
// // //           </h1>
// // //           <p className="mt-4 text-gray-600">
// // //             Pizza is the missing piece that makes the day complete—a simple yet
// // //             delightful joy in our lives.
// // //           </p>
// // //           <div className="mt-6 flex gap-4">
// // //             <Link href={"/menu"} className="bg-blue-600 text-white font-medium rounded-full px-4 py-2 hover:bg-blue-700 transition-colors duration-300 flex gap-2 uppercase">
// // //               Order now
// // //               <Right />
// // //             </Link>
// // //             <button className="py-2 text-gray-800 font-semibold">Learn more</button>
// // //           </div>
// // //         </div>

// // //         {/* Image Container */}
// // //         <div className='h-96 relative'>
// // //           <img src={"/vecteezy_delicious-pizza-cut-out-on-transparent_45969707.png"} alt="salad" className="object-contain w-full h-full" />
// // //         </div>
// // //       </section>
// // //     </div>
// // //   );
// // // };

// // // export default Hero;

// // import React from 'react';
// // import Right from './icons/Right';
// // import Link from 'next/link';

// // const Hero = () => {
// //   return (
// //     <div className="py-7">
// //       <section className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
// //         <div className="px-4">
// //           <h1 className="text-4xl font-semibold text-gray-800">
// //            what are

// //             <p className='text-blue-700'>Pizza</p>
// //           </h1>
// //           <p className="mt-4 text-gray-600">
// //             Pizza is the missing piece that makes the day complete—a simple yet delightful joy in our lives.
// //           </p>
// //           <div className="mt-6 flex gap-4">
// //             <Link href={"/menu"} className="bg-blue-600 text-white font-medium rounded-full px-6 py-3 hover:bg-blue-700 transition-colors duration-300 flex gap-2 uppercase">
// //               Order now
// //               <Right />
// //             </Link>
// //             <button className="py-2 text-gray-800 font-semibold">Learn more</button>
// //           </div>
// //         </div>

// //         <div className='h-96 relative'>
// //           <img src={"/vecteezy_delicious-pizza-cut-out-on-transparent_45969707.png"} alt="Pizza" className="object-contain w-full h-full" />
// //         </div>
// //       </section>
// //     </div>
// //   );
// // };

// // export default Hero;
// import React from 'react';
// import Right from './icons/Right';
// import Link from 'next/link';

// const Hero = () => {
//   return (
//     <div className="py-16">
//       <section className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 px-6 md:px-16">
//         {/* Left Section - Text */}
//         <div className="space-y-6">
//           <h1 className="text-4xl font-semibold text-gray-800 leading-snug">
//             Craving a Slice? <span className="text-blue-700">Discover</span> the best pizza in town!
//           </h1>
//           <p className="text-lg text-gray-600">
//             From classic Margherita to gourmet toppings, our pizzas are made with the finest ingredients, baked fresh just for you.
//           </p>
          
//           {/* Subtext (optional) */}
//           <p className="text-md text-gray-500">
//             Whether you're looking for a quick bite or catering for a party, we have something for everyone!
//           </p>

//           <div className="mt-6 flex gap-6">
//             <Link 
//               href={"/menu"} 
//               className="bg-blue-600 text-white font-medium rounded-full px-6 py-3 hover:bg-blue-700 transition-colors duration-300 flex gap-2 uppercase"
//             >
//               Explore Menu
//               <Right />
//             </Link>
//             <Link 
//               href={"/order"} 
//               className="bg-yellow-600 text-white font-medium rounded-full px-6 py-3 hover:bg-yellow-700 transition-colors duration-300 flex gap-2 uppercase"
//             >
//               Order Now
//               <Right />
//             </Link>
//           </div>
//         </div>

//         {/* Right Section - Images */}
//         <div className="h-[400px] md:h-[500px] relative mt-6 md:mt-0">
//           {/* Add more images here if needed */}
//           <img 
//             src={"/vecteezy_delicious-pizza-cut-out-on-transparent_45969707.png"} 
//             alt="Delicious Pizza" 
//             className="object-contain w-full h-full rounded-lg shadow-xl transition-transform transform hover:scale-105"
//           />
//         </div>
//       </section>

//       {/* Optional: Showcase a few other items */}
//       <section className="mt-12">
//         <div className="text-center">
//           <h2 className="text-3xl font-semibold text-gray-800">Our Specialties</h2>
//           <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//             <div className="bg-gray-100 p-6 rounded-lg shadow-md">
//               <img src="/pizza1.png" alt="Pizza 1" className="w-full h-[150px] object-cover rounded-t-lg" />
//               <h3 className="mt-4 font-medium">Pepperoni Perfection</h3>
//               <p className="text-sm text-gray-600">Spicy pepperoni with a rich, melted cheese base.</p>
//             </div>
//             <div className="bg-gray-100 p-6 rounded-lg shadow-md">
//               <img src="/pizza2.png" alt="Pizza 2" className="w-full h-[150px] object-cover rounded-t-lg" />
//               <h3 className="mt-4 font-medium">Veggie Delight</h3>
//               <p className="text-sm text-gray-600">A fresh combination of seasonal veggies and cheese.</p>
//             </div>
//             <div className="bg-gray-100 p-6 rounded-lg shadow-md">
//               <img src="/pizza3.png" alt="Pizza 3" className="w-full h-[150px] object-cover rounded-t-lg" />
//               <h3 className="mt-4 font-medium">BBQ Chicken</h3>
//               <p className="text-sm text-gray-600">Tender chicken, tangy BBQ sauce, and lots of cheese!</p>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Hero;
"use client"
import React from 'react';
import Right from './icons/Right';
import Link from 'next/link';
import { useState,useEffect } from 'react';
// import Menuitem from './components/Menuitem';
import Menuitem from './Menuitem';
const Hero = () => {
  const [menuItems, setMenuItems] = useState([]);
    useEffect(() => {
      const getData = async () => {
        const r = await fetch("/api/menu");
        const res = await r.json();
        if (res.ok) {
          setMenuItems(res.finduser);
        } else {
          console.log("This isn't working");
        }
      };
      getData();
    }, []);
  
  return (
    <div className="py-16">
      <section className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 px-6 md:px-16">
        {/* Left Section - Text */}
        <div className="space-y-6">
          <h1 className="text-4xl font-semibold text-gray-800 leading-snug">
            Craving a Slice? <span className="text-blue-700">Discover</span> the best pizza in town!
          </h1>
          <p className="text-lg text-gray-600">
            From classic Margherita to gourmet toppings, our pizzas are made with the finest ingredients, baked fresh just for you.
          </p>
          
          {/* Subtext (optional) */}
          <p className="text-md text-gray-500">
            Whether you're looking for a quick bite or catering for a party, we have something for everyone!
          </p>

          <div className="mt-6 flex gap-6">
            <Link 
              href={"/menu"} 
              className="bg-blue-600 text-white font-medium rounded-full px-6 py-3 hover:bg-blue-700 transition-colors duration-300 flex gap-2 uppercase"
            >
              Explore Menu
              <Right />
            </Link>
            <Link 
              href={"/order"} 
              className="bg-yellow-600 text-white font-medium rounded-full px-6 py-3 hover:bg-yellow-700 transition-colors duration-300 flex gap-2 uppercase"
            >
              Order Now
              <Right />
            </Link>
          </div>
        </div>

        {/* Right Section - Images */}
        <div className="h-[400px] md:h-[500px] relative mt-6 md:mt-0">
          {/* Add more images here if needed */}
          <img 
            src={"/vecteezy_delicious-pizza-cut-out-on-transparent_45969707.png"} 
            alt="Delicious Pizza" 
            className="object-contain w-full h-full rounded-lg "
          />
        </div>
      </section>

      {/* Optional: Showcase a few other items */}
      <section className="mt-12">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-800">Our Specialties</h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {menuItems.slice(3, 6).map((item) => (
          <article key={item._id}>
            <Menuitem
              name={item.name}
              desc={item.desc}
              baseprice={item.baseprice}
              userImage={item.userImage}
              sizes={item.sizes}
              ingredients={item.ingredients}
            />
          </article>
        ))}

          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
