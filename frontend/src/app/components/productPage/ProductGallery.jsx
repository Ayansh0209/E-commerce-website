"use client";
import { useState } from "react";

export default function ProductGallery({ images = [] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="w-full">

      {/* ================= MOBILE + TABLET ================= */}
      <div className="lg:hidden">
        {/* Main Image */}
        <div className="w-full aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden">
          <img
            src={images[active]}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* Dots */}
        {images.length > 1 && (
          <div className="flex justify-center gap-2 mt-3">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-2 h-2 rounded-full transition
                  ${active === i ? "bg-black" : "bg-gray-300"}
                `}
              />
            ))}
          </div>
        )}
      </div>

      {/* ================= DESKTOP ================= */}
      <div className="hidden lg:flex gap-4">
        {/* Thumbnails */}
        <div className="flex flex-col gap-3 w-16">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              onClick={() => setActive(i)}
              className={`w-16 h-20 object-cover rounded-md cursor-pointer border
                ${active === i ? "border-black" : "border-gray-300"}
              `}
            />
          ))}
        </div>

        {/* Main Image */}
        <div className="flex-1">
          <div className="w-full h-[500px] bg-gray-100 rounded-xl overflow-hidden">
            <img
              src={images[active]}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

    </div>
  );
}
