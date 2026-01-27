'use client';
import React, { useRef, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const HeroBanner = () => {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

 const items = [
 
  <div
    key="banner1"
    className="relative w-full h-[85vh] sm:h-[90vh] md:h-[50vh] lg:h-[87vh] overflow-hidden cursor-pointer"
  >
    <picture>
      {/* Desktop image */}
      <source
        media="(min-width: 768px)"
        srcSet="/assets/Frame 161.png"
      />

      {/* Mobile image */}
      <source
        media="(max-width: 767px)"
        srcSet="/assets/Frame161-Vertical.png"
      />

      {/* Fallback */}
      <img
        src="/assets/Frame 161.png"
        alt="Wear What You Want"
        className="w-full h-full object-cover object-center"
        loading="eager"
        fetchPriority="high"
      />
    </picture>
  </div>,

  // 💤 SLIDE 2 — LAZY LOAD
  <div
    key="banner2"
    className="relative w-full h-[85vh] sm:h-[90vh] md:h-[5wish0vh] lg:h-[87vh] overflow-hidden cursor-pointer"
  >
    <picture>
      {/* Desktop image */}
      <source
        media="(min-width: 768px)"
        srcSet="/assets/Frame 2.png"
      />

      {/* Mobile image */}
      <source
        media="(max-width: 767px)"
        srcSet="/assets/Frame2-Vertical.png"
      />

      <img
        src="/assets/Frame 2.png"
        alt="Oversized T-Shirts"
        className="w-full h-full object-cover object-center"
        loading="lazy"
      />
    </picture>
  </div>,

  // 💤 SLIDE 3 — LAZY LOAD
  <div
    key="banner3"
    className="relative w-full h-[85vh] sm:h-[90vh] md:h-[50vh] lg:h-[87vh] overflow-hidden cursor-pointer"
  >
    <picture>
      {/* Desktop image */}
      <source
        media="(min-width: 768px)"
        srcSet="/assets/Frame 3.png"
      />

      {/* Mobile image */}
      <source
        media="(max-width: 767px)"
        srcSet="/assets/Frame3-Vertical.png"
      />

      <img
        src="/assets/Frame 3.png"
        alt="Streetwear Collection"
        className="w-full h-full object-cover object-center"
        loading="lazy"
      />
    </picture>
  </div>,
];

  return (
    <div className="relative w-full h-[vh] sm:h-[90vh] md:h-[50vh] lg:h-[87vh] overflow-hidden">

      <AliceCarousel
        ref={carouselRef}
        mouseTracking
        items={items}
        infinite
        autoPlay
        autoPlayInterval={2000}

        disableDotsControls={true}
        disableButtonsControls={true}

        onSlideChanged={(e) => {

          setActiveIndex(e.item);
        }}
      />


      <div className="absolute bottom-6 sm:bottom-8 md:bottom-6
 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => carouselRef.current?.slideTo(idx)}
            className={
              'w-3 h-3 rounded-full transition-colors ' +
              (activeIndex === idx
                ? 'bg-white'
                : 'bg-white/50 hover:bg-white/80')
            }
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Overlay Left/Right Controls */}
      <button
        aria-label="Previous"
        className="hidden md:flex absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white text-black p-3 rounded-full shadow-md transition-all z-20"

        onClick={() => carouselRef.current?.slidePrev()}
      >
        ‹
      </button>

      <button
        aria-label="Next"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white text-black p-3 rounded-full shadow-md transition-all z-20"
        onClick={() => carouselRef.current?.slideNext()}
      >
        ›
      </button>
    </div>
  );
};

export default HeroBanner;