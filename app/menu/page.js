// "use client";
// import React, { useState, useEffect } from 'react';
// import SectionHeaders from '../components/SectionHeaders';
// import Menuitem from '../components/Menuitem';
// import Menucomp from '../components/Menucomp';

// const page = () => {
//   const [allcategories, setallcategories] = useState([]);
//   const [menuItems, setmenuItems] = useState([]);

//   useEffect(() => {
//     const getdata = async () => {
//       const r = await fetch("/api/categories");
//       const res = await r.json();
//       if (res.ok) {
//         setallcategories(res.finduser);
//       } else {
//         console.log("Failed to fetch categories.");
//       }
//     };
//     getdata();
//   }, []);

//   useEffect(() => {
//     const getdata = async () => {
//       const r = await fetch("/api/menu");
//       const res = await r.json();
//       if (res.ok) {
//         setmenuItems(res.finduser);
//         console.log("Menu items fetched successfully.");
//       } else {
//         console.log("Failed to fetch menu items.");
//       }
//     };
//     getdata();
//   }, []);

//   return (
//     <section className="mt-8">
//       {allcategories.map((e) => (
//         <div key={e._id}>
//           <div className="text-center">
//             <SectionHeaders sideheader={e.name} />
//           </div>
//           <div className="grid grid-cols-3 gap-4">
//             {menuItems.filter((i) => i.category === e._id).map((i) => (
//               <Menuitem  
//                 key={i._id} 
//                 name={i.name}
//                 desc={i.desc}
//                 baseprice={i.baseprice}
//                 userImage={i.userImage}
//                 sizes={i.sizes}
//                 ingredients={i.ingredients}
//               />
//             ))}
//           </div>
//         </div>
//       ))}
//     </section>
//   );
// };

// export default page;
"use client";
import React, { useState, useEffect } from 'react';
import SectionHeaders from '../components/SectionHeaders';
import Menuitem from '../components/Menuitem';

const page = () => {
  const [allcategories, setallcategories] = useState([]);
  const [menuItems, setmenuItems] = useState([]);

  useEffect(() => {
    const getdata = async () => {
      const r = await fetch("/api/categories");
      const res = await r.json();
      if (res.ok) {
        setallcategories(res.finduser);
      } else {
        console.log("Failed to fetch categories.");
      }
    };
    getdata();
  }, []);

  useEffect(() => {
    const getdata = async () => {
      const r = await fetch("/api/menu");
      const res = await r.json();
      if (res.ok) {
        setmenuItems(res.finduser);
        console.log("Menu items fetched successfully.");
      } else {
        console.log("Failed to fetch menu items.");
      }
    };
    getdata();
  }, []);

  return (
    <section className="mt-8 px-4">
      {allcategories.map((e) => (
        <div key={e._id}>
          <div className="text-center">
            <SectionHeaders sideheader={e.name} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {menuItems.filter((i) => i.category === e._id).map((i) => (
              <Menuitem  
                key={i._id} 
                name={i.name}
                desc={i.desc}
                baseprice={i.baseprice}
                userImage={i.userImage}
                sizes={i.sizes}
                ingredients={i.ingredients}
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default page;
