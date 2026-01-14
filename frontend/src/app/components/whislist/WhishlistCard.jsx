'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";
import SizeModal from "./SizeModal";
import { auth } from "@/firebase/firebaseClient";

export default function WishlistCard({ product, onUpdate }) {
  const router = useRouter();
  const [showSizeModal, setShowSizeModal] = useState(false);


const getAuthHeader = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const token = await user.getIdToken();

  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};
  const removeFromWishlist = async () => {
    const headers = await getAuthHeader();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/wishlist`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          productId: product._id
        })
      }
    );

    if (!res.ok) {
      throw new Error("Failed to remove from wishlist");
    }

    onUpdate();
  };

  const moveToBag = async (size) => {
    const headers = await getAuthHeader();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/wishlist/move-to-cart`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          productId: product._id,
          size,
          quantity: 1
        })
      }
    );

    if (!res.ok) {
      throw new Error("Failed to move item to cart");
    }

    setShowSizeModal(false);
    onUpdate();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-3 relative">

      {/* Remove */}
      <button
        onClick={removeFromWishlist}
        className="absolute top-2 right-2 text-gray-500"
      >
        ✕
      </button>

      {/* Image */}
      <div
        className="cursor-pointer"
        onClick={() => router.push(`/productdetail/${product._id}`)}
      >
        <img
          src={product.imageUrl}
          alt={product.title}
          className="rounded-lg w-full h-[320px] object-cover"
        />
      </div>

      {/* Info */}
      <div className="mt-2">
        <p className="text-sm font-medium">{product.brand}</p>
        <p className="text-xs text-gray-600 line-clamp-1">
          {product.title}
        </p>
        <div className="mt-1">
          <span className="font-semibold">₹{product.discountedPrice}</span>
          <span className="text-xs line-through ml-2 text-gray-500">
            ₹{product.price}
          </span>
        </div>
      </div>

      {/* Move to Bag */}
      <button
        onClick={() => setShowSizeModal(true)}
        className="mt-3 w-full text-sm font-semibold text-red-500"
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



