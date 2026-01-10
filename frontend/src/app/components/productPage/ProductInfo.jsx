"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../../redux/cart/cartSlice";
import { fetchRatings } from "@/redux/rating/ratingSlice";
import { fetchReviews } from "@/redux/review/reviewSlice";
import { useRouter } from 'next/navigation';
export default function ProductInfo({ product }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);
  const [openSpecs, setOpenSpecs] = useState(false);
  const [openReviews, setOpenReviews] = useState(false);
  const [addedSize, setAddedSize] = useState(null);
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


  const handleAddToCart = async () => {
    //  Size validation
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    // Prepare payload
    const payload = {
      productId: product._id,
      size: selectedSize,
      quantity: 1,
    };

    console.log("ADD TO CART PAYLOAD:", payload);

    try {
      const result = await dispatch(addItemToCart(payload)).unwrap();
      console.log("CART UPDATED RESPONSE:", result);
      setAddedSize(selectedSize);

    } catch (error) {
      console.error("ADD TO CART FAILED:", error);

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

        <button
          onClick={() => setOpenReviews(true)}
          className="text-blue-600 underline ml-2"
        >
          Write a Review
        </button>
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


      {/* -------- Add to Cart -------- */}
      <button
        onClick={
          selectedSize && addedSize === selectedSize
            ? () => router.push("/cart")
            : handleAddToCart
        }
        className="mt-6 w-full bg-black text-white py-3 rounded-full"
      >
        {selectedSize && addedSize === selectedSize ? "Go to Bag" : "Add to Cart"}
      </button>



      {/* ---------------- DELIVERY OPTIONS ---------------- */}
      <div className="mt-6">
        <h4 className="font-semibold mb-2 text-sm">Delivery Options</h4>

        <div className="flex gap-2">
          <input
            placeholder="Enter pincode"
            className="border px-3 py-2 rounded-lg text-sm w-40"
          />
          <button className="bg-black text-white px-4 rounded-lg text-sm">
            Check
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-2">
          Enter pincode to check delivery time & cash-on-delivery availability
        </p>

        <ul className="text-xs text-gray-600 mt-3 space-y-1">
          <li>100% Original Products</li>
          <li>Pay on delivery might be available</li>
          <li>Easy 14 days returns and exchanges</li>
          <li>Try & Buy might be available</li>
        </ul>
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
          <div className="min-w-[120px]">
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
    </div>
  );
}
