'use client';

import { useState } from "react";

export default function SizeModal({ sizes = [], onSelect, onClose }) {
  const [selectedSize, setSelectedSize] = useState(null);

  const handleDone = () => {
    if (!selectedSize) return;
    onSelect(selectedSize);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-[90%] max-w-sm p-4 relative">

        {/* ❌ Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 text-lg"
        >
          ✕
        </button>

        <h2 className="font-semibold mb-4 text-center">
          Select Size
        </h2>

        {/* Sizes */}
        <div className="grid grid-cols-4 gap-2">
          {sizes.map((size) => {
            const isSelected = selectedSize === size.name;

            return (
              <button
                key={size._id}
                onClick={() => setSelectedSize(size.name)}
                className={`border rounded-lg py-2 text-sm
                  ${isSelected
                    ? "border-black bg-black text-white"
                    : "hover:border-black"
                  }
                `}
              >
                {size.name}
              </button>
            );
          })}
        </div>

        {/* Done Button */}
        <button
          onClick={handleDone}
          disabled={!selectedSize}
          className={`mt-5 w-full py-2 rounded-lg text-sm font-semibold
            ${selectedSize
              ? "bg-black text-white"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }
          `}
        >
          Done
        </button>
      </div>
    </div>
  );
}
