
import React from 'react';

const Menu = () => {
  return (
    <div>
      <section>
        <div className="relative -top-28">
          {/* <div className="absolute -right-20 top-0">
            <img src={"/vecteezy_yellow-butter-on-transparent-background_45838169.png"} alt="Salad" className="object-contain" />
          </div> */}
          <div className="h-48 absolute -left-20">
            <img
              src={"/vecteezy_yellow-butter-on-transparent-background_45838169.png"}
              alt="Butter"
              className="object-contain w-full h-full"
            />
          </div>
        </div>
        <div className="text-center">
          <h3 className="uppercase text-dark font-semibold leading-4">Check out</h3>
          <h2 className="text-blue-700 font-bold text-4xl italic">Our best sellers</h2>
          <p className="mt-4 text-gray-600 text-lg">
            From mouthwatering specialties to unbeatable deals, we’ve got something delicious waiting for you!
          </p>
          <p className="text-gray-500 text-sm">
            Explore your favorites above or take a look at today’s exclusive offers below!
          </p>
        </div>
      </section>
    </div>
  );
};

export default Menu;
