import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className=" shadow-md sticky top-0 z-50">
      {/* Top Black Promotional Bar */}
      <div className="w-full bg-black text-white text-center py-2 text-sm md:text-sm font-light tracking-wide">
        <span className="inline-block mb-1">
          Sign up and get upto 20% off to your first order &middot;
          <Link
            href="/signup"
            className="ml-1 font-medium underline hover:text-gray-300"
          >
            Sign Up Now
          </Link>
        </span>
      </div>

      <div className="w-full bg-white px-4 md:px-8 lg:px-16 py-4 flex items-center  justify-between border-t border-gray-100">
        <div className="flexX shrink-0">
          <Link
            href="/"
            className="text-xl md:text-2xl font-extrabold tracking-widest text-black"
          >
            FALTU FASHION
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex space-x-10">
          <Link
            href="/"
            className="text-lg font-medium text-gray-800 hover:text-black transition-colors"
          >
            Home
          </Link>
          <Link
            href="/shop"
            className="text-lg font-medium text-gray-800 hover:text-black transition-colors"
          >
            Shop
          </Link>
          <Link
            href="/about"
            className="text-lg font-medium text-gray-800 hover:text-black transition-colors"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="text-lg font-medium text-gray-800 hover:text-black transition-colors"
          >
            Contact
          </Link>
        </div>

        {/* Right: Utility Icons */}
        <div className="flex items-center space-x-4 md:space-x-6 shrink-0">
          <img src="/icons/Usericon.svg" alt="User" width="24" height="24" />
          <img src="/icons/searchIcon.svg" alt="Search" width="24" height="24" />
          <img src="/icons/Whishlit.svg" alt="Wishlist" width="24" height="24" />
          <img src="/icons/CartIcon.svg" alt="Cart" width="24" height="24" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

