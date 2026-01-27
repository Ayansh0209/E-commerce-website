'use client'
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  addToWishlistAPI,
  removeFromWishlistAPI
} from "@/redux/wishlist/wishlistApi";

export default function ProductCard({ product }) {

  const router = useRouter();
  const [wishlisted, setWishlisted] = useState(
    product.isWishlisted || false
  );
  const [loading, setLoading] = useState(false);

  const handleWishlist = async (e) => {
    e.stopPropagation();
    if (loading) return;

    try {
      setLoading(true);

      if (wishlisted) {
        const data = await removeFromWishlistAPI(product._id);
        setWishlisted(data.isWishlisted);
      } else {
        const data = await addToWishlistAPI(product._id);
        setWishlisted(data.isWishlisted);
      }
    } catch (err) {
      console.error("Wishlist failed", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setWishlisted(product.isWishlisted || false);
  }, [product.isWishlisted]);



  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer"
      onClick={() => router.push(`/productdetail/${product._id}`)}
    >

      {/* Image container */}
      <div className="relative w-full aspect-3/4 bg-gray-100 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.brand}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />

        <button
          onClick={handleWishlist}
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


      </div>

      {/* Product Info */}
      <div className="px-3 sm:px-4 py-2 sm:py-3 flex flex-col items-start">
        <h5 className="text-xs text-gray-600 line-clamp-1">

          {product.brand}
        </h5>
        <h5 className="text-xs text-gray-600 line-clamp-1">{product.title}</h5>
        <div className="flex items-center gap-2 mt-2 whitespace-nowrap overflow-hidden">
          <span className="text-base sm:text-lg font-semibold text-black shrink-0">
            ₹{product.discountedPrice}
          </span>

          {product.price && (
            <span className="text-xs sm:text-sm text-gray-500 line-through shrink-0">
              ₹{product.price}
            </span>
          )}

          {product.discountPercent && (
            <span className="text-xs font-semibold text-green-600 shrink-0">
              ({product.discountPercent}% OFF)
            </span>
          )}
        </div>


      </div>
    </div>
  );
}
