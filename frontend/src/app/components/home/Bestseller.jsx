'use client'

import React, { useState, useEffect, useRef } from 'react'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import ProductCard from '../ProductCard/ProductCard'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import { useRouter } from 'next/navigation'

const responsive = {
  0: { items: 2 },
  640: { items: 2 },
  768: { items: 3 },
  1024: { items: 4 },
  1280: { items: 5 },
}

const Bestseller = ({ data, sectionName, link }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [visibleItems, setVisibleItems] = useState(2)
  const carouselRef = useRef(null)
  const router = useRouter()

  useEffect(() => {
    const updateItems = () => {
      const width = window.innerWidth
      if (width >= 1280) setVisibleItems(5)
      else if (width >= 1024) setVisibleItems(4)
      else if (width >= 768) setVisibleItems(3)
      else setVisibleItems(2)
    }
    updateItems()
    window.addEventListener('resize', updateItems)
    return () => window.removeEventListener('resize', updateItems)
  }, [])

  const items = data.slice(0, 15).map((item) => (
    <div key={item._id} className="px-1.5">
      <ProductCard product={item} />
    </div>
  ))

  return (
    <section className="relative px-0.5 lg:px-3 pt-6">
      {/* HEADER - Premium styling with subtle background */}
      <div className="flex items-center justify-between mb-6 px-3 py-4 gap-4 
                    bg-gradient-to-r from-gray-50/50 to-transparent rounded-lg">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight 
                     bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
          {sectionName}
        </h2>

        {link && (
          <button
            onClick={() => router.push(link)}
            className="group relative text-sm sm:text-base font-bold text-gray-900 
                     hover:text-white transition-all duration-300 
                     px-4 sm:px-6 py-2 rounded-full whitespace-nowrap flex-shrink-0
                     bg-white hover:bg-black border-2 border-gray-900
                     shadow-sm hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <span className="relative z-10">View All</span>
          </button>
        )}
      </div>

      <div className="relative">
        <AliceCarousel
          ref={carouselRef}
          mouseTracking
          items={items}
          responsive={responsive}
          disableDotsControls
          disableButtonsControls
          onSlideChanged={(e) => setActiveIndex(e.item)}
        />

        {/* LEFT ARROW */}
        {activeIndex > 0 && (
          <button
            onClick={() => carouselRef.current?.slidePrev()}
            className="hidden sm:flex absolute top-1/2 left-3 -translate-y-1/2 z-30 bg-white rounded-full shadow-md p-2"
          >
            <KeyboardArrowLeftIcon />
          </button>
        )}

        {/* RIGHT ARROW */}
        {activeIndex < items.length - visibleItems && (
          <button
            onClick={() => carouselRef.current?.slideNext()}
            className="hidden sm:flex absolute top-1/2 right-3 -translate-y-1/2 z-30 bg-white rounded-full shadow-md p-2"
          >
            <KeyboardArrowLeftIcon className="rotate-180" />
          </button>
        )}
      </div>
    </section>
  )
}

export default Bestseller