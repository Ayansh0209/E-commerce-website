'use client'
import React from 'react'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import ProductCard from '../ProductCard/ProductCard'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'

const Bestseller = () => {
  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 5 },
  }

  const items = [1, 1, 1, 1, 1].map((item, index) => (
    <div key={index} className='px-2'>
      <ProductCard />
    </div>
  ))

  return (
    <div className='relative px-2 lg:px-5 py-6'>
      <h2 className='text-3xl font-bold mb-5 pb-3 pt-2 text-center'>
        
      </h2>

      {/* Carousel Wrapper */}
      <div className='relative'>
        <AliceCarousel
          mouseTracking
          items={items}
          disableDotsControls
          disableButtonsControls
          responsive={responsive}
        />

        {/* Left Arrow */}
        <button
          className='absolute top-1/2 left-5 translate-y-1/2 -translate-x-1/2 bg-white rounded-full shadow-md p-2 hover:bg-gray-100 transition'
        >
          <KeyboardArrowLeftIcon className='text-black text-3xl' />
        </button>

        {/* Right Arrow */}
        <button
          className='absolute top-1/2 right-5 -translate-y-1/2 translate-x-1/2 bg-white rounded-full shadow-md p-2 hover:bg-gray-100 transition'
        >
          <KeyboardArrowLeftIcon className='text-black text-3xl rotate-180' />
        </button>
      </div>
    </div>
  )
}

export default Bestseller
