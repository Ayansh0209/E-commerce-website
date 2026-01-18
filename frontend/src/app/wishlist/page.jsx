'use client';

import { useEffect, useState } from "react";
import WishlistCard from "../components/whislist/WhishlistCard";
import { auth } from "@/firebase/firebaseClient";
import { onAuthStateChanged } from "firebase/auth";
import { getWishlistAPI } from "@/redux/wishlist/wishlistApi";



export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authReady, setAuthReady] = useState(false);

  const fetchWishlist = async () => {
  try {
    const data = await getWishlistAPI();
    setWishlist(data.wishlist || []);
  } catch (error) {
    console.error("Failed to fetch wishlist", error);
  } finally {
    setLoading(false);
  }
};


  //  Wait for Firebase auth to be ready
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthReady(true);
        fetchWishlist();
      } else {
        setLoading(false); // user not logged in
      }
    });

    return () => unsubscribe();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        Loading your wishlist...
      </div>
    );
  }

  // User not logged in
  if (!authReady) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-600">
        Please login to view your wishlist ❤️
      </div>
    );
  }

  // Empty wishlist
  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-gray-600">
        <p className="text-lg font-medium">Your wishlist is empty ❤️</p>
        <p className="text-sm mt-1">Start adding your favourite products</p>
      </div>
    );
  }

  // Wishlist products
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-xl font-semibold mb-6">My Wishlist</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <WishlistCard
            key={product._id}
            product={product}
            onUpdate={fetchWishlist}
          />
        ))}
      </div>
    </div>
  );
}
