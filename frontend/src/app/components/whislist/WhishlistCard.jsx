'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import SizeModal from "./SizeModal";
import {
  removeFromWishlistAPI,
  moveWishlistToCartAPI,
} from "@/redux/wishlist/wishlistApi";

export default function WishlistCard({ product, onUpdate }) {
  const router = useRouter();
  const [showSizeModal, setShowSizeModal] = useState(false);

  const removeFromWishlist = async () => {
    try {
      await removeFromWishlistAPI(product._id);
      onUpdate();
    } catch (error) {
      console.error("Failed to remove from wishlist", error);
    }
  };

  const moveToBag = async (size) => {
    try {
      await moveWishlistToCartAPI(product._id, size, 1);
      setShowSizeModal(false);
      onUpdate();
    } catch (error) {
      console.error("Failed to move item to cart", error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">

      {/* Remove */}
      <button
        onClick={removeFromWishlist}
        className="absolute top-2 right-2 z-10 text-gray-500 hover:text-black"
      >
        ✕
      </button>

      {/* Image */}
      <div
        className="cursor-pointer "
        onClick={() => router.push(`/productdetail/${product._id}`)}
      >
        <img
          src={product.imageUrl}
          alt={product.title}
          className="
    w-full object-cover rounded-t-xl
    h-[220px]
    sm:h-[260px]
    md:h-[340px]
    lg:h-[380px]
  "
        />

      </div>

      {/* Info */}
      <div className="px-3 py-2 sm:px-4 sm:py-3">
        <p className="text-xs sm:text-sm font-medium text-gray-900">
          {product.brand}
        </p>

        <p className="text-[11px] sm:text-xs text-gray-600 line-clamp-1">
          {product.title}
        </p>

        <div className="mt-1 flex items-center gap-2">
          <span className="text-sm sm:text-base font-semibold">
            ₹{product.discountedPrice}
          </span>
          <span className="text-[11px] sm:text-xs line-through text-gray-500">
            ₹{product.price}
          </span>
        </div>
      </div>

      {/* Soft divider */}
      <div className="h-px bg-gray-200 mx-3 sm:mx-4" />

      {/* Move to Bag */}
      <button
        onClick={() => setShowSizeModal(true)}
        className="
          w-full py-3
          text-xs sm:text-sm
          font-semibold text-red-500
          hover:bg-gray-50
          transition-colors
        "
      >
        MOVE TO BAG
      </button>

      {/* Size modal */}
      {showSizeModal && (
        <SizeModal
          sizes={product.sizes}
          onSelect={moveToBag}
          onClose={() => setShowSizeModal(false)}
        />
      )}
    </div>
  );
}
