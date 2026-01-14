'use client'
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/firebaseClient";
import { useState } from "react";
const getAuthHeader = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const token = await user.getIdToken();

  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

export default function ProductCard({ product }) {

  const router = useRouter();
  const [wishlisted, setWishlisted] = useState(
    product.isWishlisted || false
  );
  const [loading, setLoading] = useState(false);

  const toggleWishlist = async (e) => {
    e.stopPropagation(); //  prevent navigation

    try {
      setLoading(true);
      const headers = await getAuthHeader();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/wishlist`,
        {
          method: "POST",
          headers,
          body: JSON.stringify({
            productId: product._id,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to toggle wishlist");
      }

      const data = await res.json();
      setWishlisted(data.isWishlisted);
    } catch (err) {
      console.error("Wishlist toggle failed", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-transform hover:scale-[1.02]  cursor-pointer"
      onClick={() => router.push(`/productdetail/${product._id}`)}
    >
      {/* Image container */}
      <div className="relative w-full h-[395px] bg-gray-100">
        <img

          src={product.imageUrl}
          alt={product.brand}
          className="w-full h-full object-cover "
        />
        <button
          onClick={toggleWishlist}
          disabled={loading}
          className="absolute top-3 right-3 bg-white rounded-full p-2 shadow"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill={wishlisted ? "red" : "none"}
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21C12 21 4 13.5 4 8.5C4 5.46243 6.46243 3 9.5 3C11.24 3 12.91 3.81 14 5.08C15.09 3.81 16.76 3 18.5 3C21.5376 3 24 5.46243 24 8.5C24 13.5 16 21 16 21H12Z"
            />
          </svg>
        </button>

        {product.discountPercent && (
          <span className="absolute top-3 left-3 bg-black text-white text-xs font-semibold px-2 py-1 rounded-full">
            {product.discountPercent}% OFF
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="px-4 py-3 flex flex-col items-start">
        <h3 className="text-base font-medium text-gray-800 truncate">
          {product.brand}
        </h3>
        <h5 className="text-xs text-gray-600 line-clamp-1">{product.title}</h5>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-lg font-semibold text-black">
            ₹{product.discountedPrice}
          </span>
          {product.price && (
            <span className="text-sm text-gray-500 line-through">
              ₹{product.price}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
