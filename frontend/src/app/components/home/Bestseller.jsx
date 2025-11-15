'use client'
import React, { useState } from 'react'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import ProductCard from '../ProductCard/ProductCard'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'

const Bestseller = ({ data, sectionName }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 5 },
  }

const items = data.slice(0,15).map((item)=>(<div key={item} className="px-2"><ProductCard product={item}/>
</div> 
))


  const prev=()=>setActiveIndex(activeIndex - 1)
  const next=()=>setActiveIndex(activeIndex + 1)

 
  return (
    <div className='relative px-2 lg:px-5 py-6'>
      <h2 className='text-3xl font-bold mb-5 pb-3 pt-2 text-center'>
        {sectionName}
      </h2>

      {/* Carousel Wrapper */}
      <div className='relative'>
        <AliceCarousel
        key={activeIndex}
          items={items}
          disableButtonsControls
          responsive={responsive}
          disableDotsControls
          activeIndex={activeIndex}
          onSlideChanged={(e) => setActiveIndex(e.item)}
        />

        {/* Left Arrow */}
        {/* LEFT ARROW */}
        {activeIndex > 0 && (
          <button
            onClick={prev}
            className='absolute top-1/2 left-5 -translate-y-1/2 bg-white rounded-full shadow-md p-2 hover:bg-gray-100 transition'
          >
            <KeyboardArrowLeftIcon className='text-black text-3xl' />
          </button>
        )}

        {/* RIGHT ARROW */}
        {activeIndex < items.length - 5 && (
          <button
            onClick={next}
            className='absolute top-1/2 right-5 -translate-y-1/2 bg-white rounded-full shadow-md p-2 hover:bg-gray-100 transition'
          >
            <KeyboardArrowLeftIcon className='text-black text-3xl rotate-180' />
          </button>
        )}

      </div>
    </div>
  )
}

export default Bestseller
