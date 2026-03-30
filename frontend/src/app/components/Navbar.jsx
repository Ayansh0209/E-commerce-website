"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebaseClient";
import AuthModal from "./auth/AuthModal";
import { useUserProfile } from "@/context/UserProfileContext";
import { useDispatch } from "react-redux";
import { clearCart } from "@/redux/cart/cartSlice";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
const Navbar = () => {
  const { user, loading } = useAuth();
  const { profile, loading: profileLoading } = useUserProfile();
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  const [search, setSearch] = useState("");
  useEffect(() => {
    setSearch("");
  }, [pathname, searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    router.push(`/shop?query=${encodeURIComponent(search)}`);
  };


  const [openAuth, setOpenAuth] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    setOpenMenu(false);
    dispatch(clearCart());

  };
  function useMounted() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    return mounted;
  }
  const mounted = useMounted();

  if (!mounted) {
    return (
      <nav className="h-[72px] bg-white shadow-md sticky top-0 z-50" />
    );
  }

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
        <div className="flex items-center justify-center gap-2">

          <button
            className="md:hidden "
            onClick={() => setOpenSidebar(true)}
          >
            <img src="/icons/menu.svg" width={24} />
          </button>

          {/* Logo */}
          <Link href="/" className="font-extrabold tracking-widest text-xl">
            <span className="hidden md:block">E-commerce </span>
            <span className="md:hidden">FF</span>
          </Link>


        </div>

        {/* Links */}
        <div className="hidden md:flex space-x-10 absolute left-1/2 -translate-x-1/2">
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact</Link>
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-5 relative">
          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="hidden lg:flex items-center bg-gray-100 rounded-md px-3 py-2 
             w-40 xl:w-60"
          >


            <img src="/icons/searchIcon.svg" width="16" className="mr-2 opacity-60" />
            <input
              type="text"
              placeholder="Search for products, brands and more"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none text-sm w-full"
            />
          </form>
          {/* Mobile Search Icon */}
          <button
            className="flex lg:hidden "
            onClick={() => setOpenSearch(true)}
          >

            <img src="/icons/searchIcon.svg" width={22} />
          </button>


          {/* User */}
          {/* User (desktop only) */}
          {mounted && !loading && (
            <div className="hidden md:block">
              <button
                onClick={() => {
                  if (!user) {
                    setOpenAuth(true);
                  } else {
                    router.push("/account");
                  }
                }}
                className="flex items-center cursor-pointer"
              >
                <img src="/icons/Usericon.svg" width="24" alt="Account" />
              </button>
            </div>
          )}



          <Link href="/wishlist">
            <img src="/icons/Whishlit.svg" width="24" />
          </Link>

          <Link href="/cart">
            <img src="/icons/CartIcon.svg" width="24" />
          </Link>
        </div>
      </div>
      {openSidebar && (
        <div className="fixed inset-0 z-50 bg-black/40">
          <div className="bg-white w-72 h-screen p-6 flex flex-col">
            {/* Close button */}
            <button
              className="mb-6 self-start"
              onClick={() => setOpenSidebar(false)}
            >
              ✕
            </button>

            {/* Content wrapper */}
            <div className="flex flex-col flex-1">
              {/* Top Links */}
              <div className="flex flex-col gap-4">
                <Link href="/" onClick={() => setOpenSidebar(false)}>Home</Link>
                <Link href="/shop" onClick={() => setOpenSidebar(false)}>Shop</Link>
                <Link href="/about" onClick={() => setOpenSidebar(false)}>About Us</Link>
                <Link href="/contact" onClick={() => setOpenSidebar(false)}>Contact</Link>
              </div>

              {/* Bottom Account Action */}
              <div className="mt-auto pt-6 border-t">
                <button
                  onClick={() => {
                    if (!user) {
                      setOpenAuth(true);
                    } else {
                      router.push("/account");
                    }
                    setOpenSidebar(false);
                  }}
                  className={`w-full py-3 rounded-lg font-medium ${user
                      ? "border border-gray-300 text-black"
                      : "bg-black text-white"
                    }`}
                >
                  {user ? "My Account" : "Sign In / Sign Up"}
                </button>

              </div>
            </div>
          </div>

        </div>
      )}
      {openSearch && (
        <div className="fixed top-[72px] left-0 right-0 z-40 bg-white border-b px-4 py-3 md:hidden ">
          <form
            onSubmit={(e) => {
              handleSearch(e);
              setOpenSearch(false);
            }}
            className="flex items-center bg-gray-100 rounded-md px-3 py-2"
          >
            <img src="/icons/searchIcon.svg" width="16" className="mr-2 opacity-60" />
            <input
              type="text"
              autoFocus
              placeholder="Search for products"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none text-sm w-full"
            />
            <button
              type="button"
              onClick={() => setOpenSearch(false)}
              className="ml-2 text-sm text-gray-500"
            >
              ✕
            </button>
          </form>
        </div>
      )}



      {/* Auth Modal */}
      {openAuth && <AuthModal onClose={() => setOpenAuth(false)} />}
    </nav>
  );
};

export default Navbar;
