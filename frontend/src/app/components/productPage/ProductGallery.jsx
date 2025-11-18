"use client";
import { useState } from "react";

export default function ProductGallery({ images }) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex gap-4">
      {/* Thumbnails */}
      <div className="flex flex-col gap-3 w-16">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            onClick={() => setActive(i)}
            className={`w-16 h-20 object-cover rounded-md cursor-pointer border 
              ${active === i ? "border-black" : "border-gray-300"}`}
          />
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1">
        <img
          src={images[active]}
          className="w-full h-[500px] object-cover rounded-xl bg-gray-100"
        />
      </div>
    </div>
  );
}
