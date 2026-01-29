"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../../redux/cart/cartSlice";
import { fetchRatings } from "@/redux/rating/ratingSlice";
import { fetchReviews } from "@/redux/review/reviewSlice";
import { useRouter } from 'next/navigation';
import { useAuth } from "@/context/AuthContext";
import SizeModal from "@/app/components/whislist/SizeModal";

import {
  addToWishlistAPI,
  removeFromWishlistAPI,
} from "@/redux/wishlist/wishlistApi";

export default function ProductInfo({ product }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);
  const [openSpecs, setOpenSpecs] = useState(false);
  const [openReviews, setOpenReviews] = useState(false);
  const [addedSize, setAddedSize] = useState(null);
  const [pincode, setPincode] = useState("");
  const [deliveryInfo, setDeliveryInfo] = useState(null);
  const [checkingPincode, setCheckingPincode] = useState(false);
  const [pincodeError, setPincodeError] = useState("");
  const [cartLoading, setCartLoading] = useState(false);
  const [wishlisted, setWishlisted] = useState(product.isWishlisted || false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [showSizeModal, setShowSizeModal] = useState(false);

  const { requireAuth } = useAuth();



  const router = useRouter();
  const dispatch = useDispatch();


  const { averageRating, totalRatings, distribution } = useSelector(
    (state) => state.rating
  );

  const { reviews, loading: reviewLoading } = useSelector(
    (state) => state.review
  );

  useEffect(() => {
    if (product?._id) {
      dispatch(fetchRatings(product._id));
      dispatch(fetchReviews(product._id));
    }
  }, [product?._id, dispatch]);
  const handleSizeSelectFromModal = (size) => {
    setSelectedSize(size);
    setShowSizeModal(false);
  };


  const handleAddToCart = async () => {
    //  Size validation
    if (!selectedSize) {
      setShowSizeModal(true);
      return;
    }

    if (cartLoading) return;

    // Prepare payload
    const payload = {
      productId: product._id,
      size: selectedSize,
      quantity: 1,
    };

    console.log("ADD TO CART PAYLOAD:", payload);

    try {
      setCartLoading(true);
      const result = await dispatch(addItemToCart(payload)).unwrap();
      console.log("CART UPDATED RESPONSE:", result);
      setAddedSize(selectedSize);

    } catch (error) {
      console.error("ADD TO CART FAILED:", error);

    }
    finally {
      setCartLoading(false);
    }
  };
  useEffect(() => {
    setAddedSize(null);
  }, [selectedSize]);
  const ratingBreakdown = [5, 4, 3, 2, 1].map((star) => {
    const count = distribution?.[star] || 0;
    const percent = totalRatings
      ? Math.round((count / totalRatings) * 100)
      : 0;

    return { star, percent };
  });

  const handleCheckPincode = async () => {
    if (!/^\d{6}$/.test(pincode)) {
      setPincodeError("Please enter a valid 6-digit pincode");
      return;
    }

    try {
      setCheckingPincode(true);
      setPincodeError("");
      setDeliveryInfo(null);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/webhooks/check-pincode?pincode=${pincode}`
      );

      const data = await res.json();

      if (!data.serviceable) {
        setPincodeError(data.message || "Delivery not available");
        return;
      }

      setDeliveryInfo(data);
    } catch (err) {
      setPincodeError("Failed to check delivery. Please try again.");
    } finally {
      setCheckingPincode(false);
    }
  };

  const handleRateProduct = () => {
    requireAuth(() => {
      router.push(`/rate-product/${product._id}`);
    });
  };


  useEffect(() => {
    setWishlisted(product.isWishlisted || false);
  }, [product.isWishlisted]);

  const handleWishlistClick = () => {
    if (wishlistLoading) return;

    requireAuth(async () => {
      try {
        setWishlistLoading(true);

        if (wishlisted) {
          const res = await removeFromWishlistAPI(product._id);
          setWishlisted(res.isWishlisted);
        } else {
          const res = await addToWishlistAPI(product._id);
          setWishlisted(res.isWishlisted);
        }
      } catch (error) {
        console.error("Wishlist action failed", error);
      } finally {
        setWishlistLoading(false);
      }
    });
  };





  return (
    <div className="flex-1 max-w-lg">

      {/* -------- Ratings & Reviews -------- */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span className="font-semibold flex items-center gap-1">
          ⭐ {averageRating || 0}
        </span>

        <span className="text-gray-500">
          {totalRatings || 0} Reviews
        </span>


      </div>

      {/* -------- Product Title -------- */}
      <h1 className="text-2xl font-bold mt-2">{product.brand}</h1>
      <p className="text-gray-700 text-sm">{product.title}</p>

      {/* -------- Price Box -------- */}
      <div className="flex items-center gap-3 mt-4">
        <span className="text-3xl font-bold text-black">₹{product.discountedPrice}</span>
        <span className="line-through text-gray-400 text-lg">
          ₹{product.price}
        </span>
        <span className="text-green-600 font-semibold text-lg">
          ({product.discountPercent}% OFF)
        </span>
      </div>

      <p className="text-gray-500 text-sm mt-1">Inclusive of all taxes</p>


      {/* -------- Size Selector -------- */}
      <div className="mt-6">
        <h4 className="text-sm font-semibold mb-2">Select Size</h4>

        {product.sizes.length === 0 ? (
          <p className="text-sm text-gray-500">Size not available</p>
        ) : (
          <div className="flex gap-2 flex-wrap">
            {product.sizes.map((size, i) => {
              const isOutOfStock = size.quantity === 0;

              return (
                <button
                  key={size._id ?? size.name ?? i}
                  disabled={isOutOfStock}
                  onClick={() => setSelectedSize(size.name)}
                  className={`px-4 py-2 border rounded-lg text-sm relative overflow-hidden
              ${isOutOfStock
                      ? "border-gray-300 text-gray-400 cursor-not-allowed bg-gray-100 "
                      : selectedSize === size.name
                        ? "border-black font-semibold"
                        : "hover:border-black"
                    }
            `}
                >
                  {size.name}

                  {isOutOfStock && (
                    <span className="absolute inset-0 pointer-events-none">
                      <span className="absolute w-[150%] h-[1.5px] bg-gray-400 -rotate[-45deg] top-1/2 left-[-25%]" />
                    </span>
                  )}

                </button>
              );
            })}
          </div>
        )}
      </div>



      {/* -------- Cart + Wishlist -------- */}
      <div className="mt-6 flex gap-3 items-center">
        {/* Add to Cart */}
        <button
          disabled={cartLoading}
          onClick={
            selectedSize && addedSize === selectedSize
              ? () => router.push("/cart")
              : handleAddToCart
          }
          className={`flex-1 py-3 rounded-full font-semibold transition
      ${cartLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-black text-white hover:opacity-90"}
    `}
        >
          {cartLoading
            ? "Adding..."
            : selectedSize && addedSize === selectedSize
              ? "Go to Bag"
              : "Add to Cart"}
        </button>

        {/* Wishlist */}
        {/* Wishlist */}
        <button
          onClick={handleWishlistClick}
          disabled={wishlistLoading}
          className={`w-12 h-12 flex items-center justify-center rounded-xl border transition
    ${wishlisted
              ? "border-red-500 text-red-500"
              : "border-gray-300 hover:border-black"}
    ${wishlistLoading && "opacity-60 cursor-not-allowed"}
  `}
          aria-label="Add to wishlist"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            width="20"
            height="20"
            fill={wishlisted ? "red" : "none"}
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M50 88L15 53c-9-9-9-24 0-33s24-9 33 0l2 2 2-2c9-9 24-9 33 0s9 24 0 33L50 88z" />
          </svg>
        </button>



      </div>



      {/* ---------------- DELIVERY OPTIONS ---------------- */}
      <div className="mt-6">
        <h4 className="font-semibold mb-2 text-sm">Delivery Options</h4>

        <div className="flex gap-2 items-center">
          <input
            value={pincode}
            onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
            placeholder="Enter pincode"
            maxLength={6}
            className="border px-3 py-2 rounded-lg text-sm w-40"
          />

          <button
            onClick={handleCheckPincode}
            disabled={checkingPincode}
            className="bg-black text-white px-4 py-2 rounded-lg text-sm disabled:opacity-60"
          >
            {checkingPincode ? "Checking..." : "Check"}
          </button>
        </div>


        {pincodeError && (
          <p className="text-xs text-red-600 mt-2">{pincodeError}</p>
        )}

        {deliveryInfo && (
          <div className="mt-3 text-xs text-gray-700 space-y-1">
            <p>
              🚚 Delivery in{" "}
              <span className="font-semibold">
                {deliveryInfo.estimatedDays} days
              </span>
            </p>

            <p>
              💳 Cash on Delivery:{" "}
              <span className="font-semibold">
                {deliveryInfo.codAvailable ? "Available" : "Not Available"}
              </span>
            </p>

            <p>
              📦 Courier Partner:{" "}
              <span className="font-semibold">
                {deliveryInfo.courierName}
              </span>
            </p>
          </div>
        )}

      </div>

      {/* ---------------- ACCORDIONS ---------------- */}

      {/* Product Details */}
      <div className="border-t mt-6 py-3">
        <button
          onClick={() => setOpenDetails(!openDetails)}
          className="flex justify-between w-full text-left"
        >
          <span className="font-semibold">Product Details</span>
          {openDetails ? <ChevronUp /> : <ChevronDown />}
        </button>

        {openDetails && (
          <div className="text-sm text-gray-600 mt-3">
            {product.details}
          </div>
        )}
      </div>



      {/* Reviews */}
      <div className="border-t py-3">
        {/* -------- Rating Breakdown -------- */}

        <h4 className="font-semibold mb-3 text-sm">Ratings Breakdown</h4>

        <div className="flex gap-8 items-start">
          {/* LEFT: Average Rating */}
          <div className="min-w-[120px] gap-1 flex flex-col items-center">
            <p className="text-4xl font-bold text-gray-900 leading-none">
              {averageRating}
              <span className="text-green-600 ml-1 text-2xl">★</span>
            </p>

            <p className="text-sm text-gray-500 mt-1">
              {totalRatings === 0
                ? "0 Verified Buyers"
                : totalRatings >= 1000
                  ? `${Math.floor(totalRatings / 1000)}k Verified Buyers`
                  : `${totalRatings} Verified Buyers`}
            </p>
            <button
              onClick={handleRateProduct}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl text-sm font-semibold
             hover:border-black hover:bg-gray-50 transition"
            >

              Rate Product
            </button>


          </div>

          {/* RIGHT: Bars */}
          <div className="flex-1 space-y-2">
            {ratingBreakdown.map((row) => (
              <div key={row.star} className="flex items-center gap-3 text-sm">
                {/* Star */}
                <span className="w-6 text-gray-700">{row.star}★</span>

                {/* Bar */}
                <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${row.star >= 4
                      ? "bg-green-500"
                      : row.star === 3
                        ? "bg-yellow-400"
                        : "bg-red-400"
                      }`}
                    style={{ width: `${row.percent}%` }}
                  />
                </div>

                {/* Count */}
                <span className="w-10 text-right text-gray-500">
                  {row.count}
                </span>
              </div>
            ))}
          </div>
        </div>



        <button
          onClick={() => setOpenReviews(!openReviews)}
          className="flex justify-between w-full text-left"
        >
          <span className="font-semibold">Reviews</span>
          {openReviews ? <ChevronUp /> : <ChevronDown />}
        </button>

        {openReviews && (
          <div className="mt-3 space-y-4">
            {reviewLoading && (
              <p className="text-sm text-gray-500">Loading reviews...</p>
            )}

            {!reviewLoading && reviews.length === 0 && (
              <p className="text-sm text-gray-500">No reviews yet</p>
            )}

            {reviews.map((r) => (
              <div key={r._id} className="border p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-semibold">
                    {r.user?.firstName?.[0]}
                  </div>

                  <div>
                    <p className="font-semibold text-sm">
                      {r.user?.firstName} {r.user?.lastName}
                    </p>
                    <p className="text-yellow-500 text-xs">⭐ {r.rating}</p>
                  </div>
                </div>

                <p className="text-sm text-gray-700 mt-2">{r.review}</p>
              </div>
            ))}
          </div>
        )}


      </div>
      {showSizeModal && (
        <SizeModal
          sizes={product.sizes}
          onSelect={handleSizeSelectFromModal}
          onClose={() => setShowSizeModal(false)}
        />
      )}

    </div>
  );
}
