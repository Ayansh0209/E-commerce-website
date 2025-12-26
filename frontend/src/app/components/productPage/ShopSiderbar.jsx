"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function ShopSidebar({
  showCategoryFilter = true,
  selectedCategories = [],
  selectedColors = [],
  selectedSizes = [],
  selectedFits = [],
  selectedPrints = [],
  selectedPrice = "",
  onCategoryChange,
  onColorChange,
  onSizeChange,
  onFitChange,
  onPrintChange,
  onPriceChange,
}) {
  const [openCategory, setOpenCategory] = useState(true);
  const [openPrice, setOpenPrice] = useState(true);
  const [openColor, setOpenColor] = useState(true);

  const categories = [
    "T-Shirts",
    "Gym Wear",
    "Trousers",
    "Polos",
  ];


  return (
    <aside className="w-64 pr-6 sticky top-24 self-start max-h-[100vh] overflow-y-auto">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>

      {/* ---------------- CATEGORY ---------------- */}
      {showCategoryFilter && (
        <div className="mb-6">
          <button
            onClick={() => setOpenCategory(!openCategory)}
            className="w-full flex justify-between items-center"
          >
            <h4 className="font-semibold">Categories</h4>
            {openCategory ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>

          {openCategory && (
            <div className="mt-3 space-y-2 text-sm">
              {categories.map((cat) => (
                <label key={cat} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => onCategoryChange(cat)}
                  />
                  {cat}
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ---------------- PRICE (RADIO) ---------------- */}
      <div className="mb-6">
        <button
          onClick={() => setOpenPrice(!openPrice)}
          className="w-full flex justify-between items-center"
        >
          <h4 className="font-semibold">Price</h4>
          {openPrice ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {openPrice && (
          <div className="mt-3 space-y-2 text-sm">
            <label className="flex gap-2">
              <input
                type="radio"
                name="price"
                checked={selectedPrice === "0-1994"}
                onChange={() => onPriceChange("0-1994")}
              />
              ₹159 – ₹1994
            </label>

            <label className="flex gap-2">
              <input
                type="radio"
                name="price"
                checked={selectedPrice === "1994-38277"}
                onChange={() => onPriceChange("1994-38277")}
              />
              ₹1994 – ₹38277
            </label>

            <label className="flex gap-2">
              <input
                type="radio"
                name="price"
                checked={selectedPrice === "38277-57140"}
                onChange={() => onPriceChange("38277-57140")}
              />
              ₹38277 – ₹57140
            </label>
          </div>
        )}
      </div>

      {/* ---------------- COLOR ---------------- */}
      <div className="mb-6">
        <button
          onClick={() => setOpenColor(!openColor)}
          className="w-full flex justify-between items-center"
        >
          <h4 className="font-semibold">Color</h4>
          {openColor ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {openColor && (
          <div className="mt-3 space-y-2 text-sm">
            {[
              { name: "Green", color: "bg-green-500" },
              { name: "Pink", color: "bg-pink-400" },
              { name: "Blue", color: "bg-blue-500" },
              { name: "Red", color: "bg-red-500" },
              { name: "Black", color: "bg-black" },
              { name: "White", color: "bg-white" },
            ].map((c) => (
              <label key={c.name} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selectedColors.includes(c.name)}
                  onChange={() => onColorChange(c.name)}
                />
                <span className={`w-4 h-4 rounded-full ${c.color}`} />
                {c.name}
              </label>
            ))}
          </div>
        )}
      </div>
      {/* ---------------- SIZE ---------------- */}
      <div className="mb-6">
        <h4 className="font-semibold mb-2">Size</h4>
        <div className="space-y-2 text-sm">
          {["S", "M", "L", "XL"].map((size) => (
            <label key={size} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedSizes.includes(size)}
                onChange={() => onSizeChange(size)}
              />
              {size}
            </label>
          ))}
        </div>
      </div>
      {/* ---------------- FIT ---------------- */}
      <div className="mb-6">
        <h4 className="font-semibold mb-2">Fit</h4>
        <div className="space-y-2 text-sm">
          {["oversized", "regular", "drop-shoulder"].map((fit) => (
            <label key={fit} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedFits.includes(fit)}
                onChange={() => onFitChange(fit)}
              />
              {fit.replace("-", " ")}
            </label>
          ))}
        </div>
      </div>
      {/* ---------------- PRINT ---------------- */}
      <div className="mb-6">
        <h4 className="font-semibold mb-2">Print</h4>
        <div className="space-y-2 text-sm">
          {["solid", "graphic", "waffle"].map((print) => (
            <label key={print} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedPrints.includes(print)}
                onChange={() => onPrintChange(print)}
              />
              {print}
            </label>
          ))}
        </div>
      </div>



    </aside>
  );
}
