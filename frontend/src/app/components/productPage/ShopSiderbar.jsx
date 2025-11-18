"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function ShopSidebar() {
  // dropdown states
  const [openCategory, setOpenCategory] = useState(true);
  const [openPrice, setOpenPrice] = useState(true);
  const [openColor, setOpenColor] = useState(true);

  // show more state
  const [showMoreCategory, setShowMoreCategory] = useState(false);

  // category list (can later come from API)
  const categories = [
    "Dresses (200)",
    "T-shirts (1021)",
    "Trousers (140)",
    "Jeans (191)",
    "Sweatshirts (554)",
    "Formal Shirts (99)",
    "Casual Shirts (150)",
    "Activewear (210)",
    "Sweatshirts (554)",
    "Formal Shirts (99)",
    "Casual Shirts (150)",
    "Activewear (210)",
  ];

  return (
   <aside className="w-64 pr-6 sticky top-24 self-start 
  max-h-[100vh] overflow-y-auto scrollbar-none">

        <div className=" h-10 w-auto">

      <h3 className="text-lg font-semibold mb-4">Filters</h3>
        </div>

      {/* ---------------- CATEGORY ---------------- */}
      <div className="mb-6">
        <button
          onClick={() => setOpenCategory(!openCategory)}
          className="w-full flex justify-between items-center cursor-pointer"
        >
          <h4 className="font-semibold">Categories</h4>
          {openCategory ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

       {openCategory && (
    <div
      className={`mt-3 space-y-2 text-sm text-gray-700 
        ${showMoreCategory ? "max-h-none" : "max-h-[180px] overflow-hidden"}`}
    >
      {(showMoreCategory ? categories : categories.slice(0, 5)).map(
        (cat, i) => (
          <label key={i} className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" />
            {cat}
          </label>
        )
      )}

      {categories.length > 5 && (
        <button
          className="text-blue-600 text-xs mt-1"
          onClick={() => setShowMoreCategory(!showMoreCategory)}
        >
          {showMoreCategory ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  )}
      </div>

      {/* ---------------- PRICE ---------------- */}
      <div className="mb-6">
        <button
          onClick={() => setOpenPrice(!openPrice)}
          className="w-full flex justify-between items-center cursor-pointer"
        >
          <h4 className="font-semibold">Price</h4>
          {openPrice ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {openPrice && (
          <div className="mt-3 space-y-2 text-sm text-gray-700">
            <label className="flex items-center gap-2">
              <input type="radio" name="price" />
              ₹159 to ₹1994
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="price" />
              ₹1994 to ₹38277
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="price" />
              ₹38277 to ₹57140
            </label>
          </div>
        )}
      </div>

      {/* ---------------- COLOR ---------------- */}
      <div className="mb-6">
        <button
          onClick={() => setOpenColor(!openColor)}
          className="w-full flex justify-between items-center cursor-pointer"
        >
          <h4 className="font-semibold">Color</h4>
          {openColor ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {openColor && (
          <div className="mt-3 space-y-3 text-sm">
            {[
              { name: "Green", color: "bg-green-500" },
              { name: "Pink", color: "bg-pink-400" },
              { name: "Blue", color: "bg-blue-500" },
              { name: "Red", color: "bg-red-500" },
              { name: "Black", color: "bg-black" },
              { name: "Navy Blue", color: "bg-blue-900" },
            ].map((c, i) => (
              <label key={i} className="flex items-center gap-3 cursor-pointer">
                <span className={`w-4 h-4 rounded-full ${c.color}`}></span>
                {c.name}
              </label>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
