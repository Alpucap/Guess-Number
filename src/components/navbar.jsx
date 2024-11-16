import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="flex justify-center items-center py-5">
      <ul className="flex gap-6 md:gap-8 lg:gap-16">
        <li>
          <Link to="/" className="text-md md:text-lg lg:text-xl text-[#F0EDCC] font-montserrat hover:underline">Home</Link>
        </li>
        <li>
          <Link to="/about" className="text-md md:text-lg lg:text-xl text-[#F0EDCC] font-montserrat hover:underline">About</Link>
        </li>
        <li>
          <Link to="/contact" className="text-md md:text-lg lg:text-xl text-[#F0EDCC] font-montserrat hover:underline">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
