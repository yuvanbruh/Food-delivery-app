
"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Menuitem from './components/Menuitem';
import SectionHeaders from './components/SectionHeaders';

const Page = () => {
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
    <div>
      <Hero />
      <div className="mt-12"> {/* Added margin to push the menu section down */}
        <Menu />
      </div>




      <section className="mt-12">
        <div className="text-center">
          {/* <h2 className="text-3xl font-semibold text-gray-800">Deals of the day</h2> */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {menuItems.slice(0, 3).map((item) => (
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

      <section className='text-center my-16' id='about'>
  <SectionHeaders mainheader={""} subheader={"About us"} />
  <div className='mx-auto max-w-2xl mt-4 text-dark flex flex-col gap-4'>
    <p>
      Welcome to <strong>Take A Slice</strong>, where we bring delicious meals to your doorstep with just a few clicks! 
      We are passionate about connecting people with incredible food experiences, making your cravings a delightful journey.
    </p>
    <p>
      At <strong>Take A Slice</strong>, we prioritize quality, convenience, and variety. Our carefully selected menu offers something for everyone—from gourmet delights to everyday comfort food. Each dish is crafted with fresh ingredients and a whole lot of love.
    </p>
    <p>
      Whether you're dining solo, hosting a gathering, or looking to discover new flavors, our app simplifies the process with a seamless interface, real-time updates, and reliable service. Your satisfaction is our mission!
    </p>
    <p>
      Thank you for making us a part of your food journey. Let’s create delicious memories together!
    </p>
  </div>
</section>


<section className='text-center my-8' id='contact'>
  <SectionHeaders subheader={"Get in Touch"} mainheader={"Contact Us"} />
  <div className="my-8">
    <a href="tel:91-8143251139" className='text-4xl mt-8 block'>
      8143251139
    </a>
    <a href="mailto:powerrangersyuvan@gmail.com" className='text-xl text-blue-600 underline'>
      powerrangersyuvan@gmail.com
    </a>
  </div>
</section>

    </div>
  );
};
export default Page;

