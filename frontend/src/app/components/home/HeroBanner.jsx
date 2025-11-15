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
      className="relative w-full h-[650px] overflow-hidden cursor-pointer"
      onClick={() => console.log('Redirect to Page 1')}
    >
      <img
        src="/assets/Frame 161.png"
        alt="Banner 1"
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
      />
    </div>,

    <div
      key="banner2"
      className="relative w-full h-[650px] overflow-hidden cursor-pointer"
      onClick={() => console.log('Redirect to Page 2')}
    >
      <img
        src="/assets/Frame 3.png"
        alt="Banner 2"
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
      />
    </div>,

    <div
      key="banner3"
      className="relative w-full h-[650px] overflow-hidden cursor-pointer"
      onClick={() => console.log('Redirect to Page 3')}
    >
      <img
        src="/assets/Frame 2.png"
        alt="Banner 3"
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
      />
    </div>,
  ];

  return (
    <div className="relative w-full h-[650px] ">
      <AliceCarousel
        ref={carouselRef}
        mouseTracking
        items={items}
        infinite
        autoPlay
        autoPlayInterval={4000}
       
        disableDotsControls={true}
        disableButtonsControls={true}
      
        onSlideChanged={(e) => {
         
          setActiveIndex(e.item);
        }}
      />

  
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
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
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white text-black p-3 rounded-full shadow-md transition-all z-20"
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