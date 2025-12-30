"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../../redux/cart/cartSlice";

export default function ProductInfo({ product }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);
  const [openSpecs, setOpenSpecs] = useState(false);
  const [openReviews, setOpenReviews] = useState(false);
  const [addedSize, setAddedSize] = useState(null);

  const dispatch = useDispatch();

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


  return (
    <div className="flex-1 max-w-lg">

      {/* -------- Ratings & Reviews -------- */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span className="font-semibold flex items-center gap-1">
          ⭐ {product.rating}
        </span>
        <span className="text-gray-500">{product.reviews.length} Reviews</span>

        <button className="text-blue-600 underline ml-2">
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

      {/* -------- Color Options -------- */}
      {/* <div className="mt-6">
        <h4 className="text-sm font-semibold">More Color</h4>

        <div className="flex gap-3 mt-2">
          {product.colors.map((img, i) => (
            <img
              key={i}
              src={img}
              className="w-12 h-14 rounded-md border cursor-pointer object-cover"
            />
          ))}
        </div>
      </div> */}

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
                      <span className="absolute w-[150%] h-[1.5px] bg-gray-400 rotate-[-45deg] top-1/2 left-[-25%]" />
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
            ? () => router.push("/cartpage")
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

      {/* Specifications
      <div className="border-t py-3">
        <button
          onClick={() => setOpenSpecs(!openSpecs)}
          className="flex justify-between w-full text-left"
        >
          <span className="font-semibold">Specifications</span>
          {openSpecs ? <ChevronUp /> : <ChevronDown />}
        </button>

        {openSpecs && (
          <div className="text-sm text-gray-600 mt-3 space-y-1">
            {product.specs.map((spec, i) => (
              <p key={i}>• {spec}</p>
            ))}
          </div>
        )}
      </div> */}

      {/* Reviews */}
      <div className="border-t py-3">
        {/* -------- Rating Breakdown -------- */}
        <div className="mt-6">
          <h4 className="font-semibold mb-2 text-sm">Ratings Breakdown</h4>

          {product.ratingBreakdown?.map((row, i) => (
            <div key={i} className="flex items-center gap-3 text-sm mb-1">
              <span className="w-6">{row.star}★</span>

              <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-500"
                  style={{ width: `${row.percent}%` }}
                ></div>
              </div>

              <span className="w-10 text-right">{row.percent}%</span>
            </div>
          ))}
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
            {product.reviews.map((r, i) => (
              <div key={i} className="border p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <img
                    src={r.avatar}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-sm">{r.name}</p>
                    <p className="text-yellow-500 text-xs">⭐ {r.rating}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mt-2">{r.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
