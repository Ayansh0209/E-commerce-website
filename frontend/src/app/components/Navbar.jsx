"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebaseClient";
import AuthModal from "./auth/AuthModal";
import { useUserProfile } from "@/context/UserProfileContext";


const Navbar = () => {
  const { user, loading } = useAuth();
  const { profile, loading: profileLoading } = useUserProfile();

  const [openAuth, setOpenAuth] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    setOpenMenu(false);
  };

  return (
    <nav className="shadow-md sticky top-0 z-50 bg-white">
      {/* Top Bar */}
      {!user && (
        <div className="bg-black text-white text-center py-2 text-sm">
          Sign up and get upto 20% off ·{" "}
          <button
            onClick={() => setOpenAuth(true)}
            className="underline font-medium"
          >
            Sign Up Now
          </button>
        </div>
      )}

      <div className="px-6 py-4 flex items-center justify-between border-t">
        {/* Logo */}
        <Link href="/" className="text-2xl font-extrabold tracking-widest">
          FALTU FASHION
        </Link>
        

        {/* Links */}
        <div className="hidden md:flex space-x-10">
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact</Link>
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-5 relative">
          {/* Search */}
          <img src="/icons/searchIcon.svg" width="24" />

          {/* User */}
          {!loading && (
            <>
              {!user ? (
                <button onClick={() => setOpenAuth(true)}>
                  <img src="/icons/Usericon.svg" width="24" />
                </button>
              ) : (
                <div className="relative">
                  <img
                    onClick={() => setOpenMenu(!openMenu)}
                    src={
                      user.photoURL ||
                      (profile?.firstName
                        ? `https://ui-avatars.com/api/?name=${profile.firstName}`
                        : "/icons/Usericon.svg")
                    }
                    className="w-8 h-8 rounded-full cursor-pointer object-cover"
                    alt="User Avatar"
                  />


                  {openMenu && (
                    <div className="absolute right-0 mt-2 bg-white shadow-lg rounded w-48">
                      <div className="px-4 py-2 text-sm text-gray-600">
                        {profileLoading ? "Loading..." : profile?.email}
                      </div>

                      <Link
                        href="/profile"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setOpenMenu(false)}
                      >
                        My Profile
                      </Link>
{/* !profile?.address?.length */}
                      {!profileLoading && !profile?.address?.length && (
                        <Link
                          href="/profile/address"
                          className="block px-4 py-2 text-yellow-600 hover:bg-gray-100"
                          onClick={() => setOpenMenu(false)}
                        >
                          Add Address
                        </Link>
                      )}

                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}

                </div>
              )}
            </>
          )}

          <Link href="/wishlist">
            <img src="/icons/Whishlit.svg" width="24" />
          </Link>

          <Link href="/cart">
            <img src="/icons/CartIcon.svg" width="24" />
          </Link>
        </div>
      </div>

      {/* Auth Modal */}
      {openAuth && <AuthModal onClose={() => setOpenAuth(false)} />}
    </nav>
  );
};

export default Navbar;
