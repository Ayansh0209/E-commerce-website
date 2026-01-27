'use client'
import React, { useState, useEffect } from 'react'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import ProductCard from '../ProductCard/ProductCard'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'

const responsive = {
  0: { items: 2 },
  640: { items: 2 },
  768: { items: 3 },
  1024: { items: 4 },
  1280: { items: 5 },
}

const Bestseller = ({ data, sectionName }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [visibleItems, setVisibleItems] = useState(2)
  const carouselRef = React.useRef(null)

  //  dynamically calculate visible items
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
    <div
      key={item._id}
      className="
    px-1.5      /* phones */
    sm:px-1.5   /* small tablets */
    md:px-1.5   /* tablets */
    lg:px-1.5   /* laptops */
  "
    >
      <ProductCard product={item} />
    </div>

  ))

  return (
    <section className="relative px-0.5 lg:px-3 pt-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-9 text-center">
        {sectionName}
      </h2>

      <div className="relative">
        <AliceCarousel
          ref={carouselRef}
          mouseTracking
          items={items}
          responsive={responsive}
          disableDotsControls
          disableButtonsControls
          //activeIndex={activeIndex}
          onSlideChanged={(e) => setActiveIndex(e.item)}
        />

        {/* LEFT ARROW */}
        {activeIndex > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              carouselRef.current?.slidePrev()
            }}
            className="
      hidden sm:flex
      absolute top-1/2 left-3 -translate-y-1/2
      z-30 pointer-events-auto
      bg-white rounded-full shadow-md
      p-2 hover:bg-gray-100 transition
    "
          >
            <KeyboardArrowLeftIcon className="text-black" />
          </button>
        )}


        {/* RIGHT ARROW */}
        {activeIndex < items.length - visibleItems && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              carouselRef.current?.slideNext()
            }}
            className="
      hidden sm:flex
      absolute top-1/2 right-3 -translate-y-1/2
      z-30 pointer-events-auto
      bg-white rounded-full shadow-md
      p-2 hover:bg-gray-100 transition
    "
          >
            <KeyboardArrowLeftIcon className="text-black rotate-180" />
          </button>
        )}

      </div>
    </section>
  )
}

export default Bestseller
