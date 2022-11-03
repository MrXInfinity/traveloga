import React from 'react'
import { Link } from 'react-router-dom'

const HeroSection = () => {
  return (
    <div className="flex bg-cover bg-no-repeat bg-center bg-fixed" style={{backgroundImage: `url("/images/homepage-pic.avif")`}}>
      <div className='flex flex-col h-[93vh] md:h-screen pt-48 pb-24 md:pt-56 lg:pt-48 xl:pt-56 lg:pb-20 lg:pl-20 xl:pb-24 w-4/5 md:w-full md:max-w-[600px] lg:max-w-[700px] xl:max-w-3xl lg:w-7/12 mx-auto lg:mx-0 text-center lg:text-left justify-between '>
        <h1 className='font-["Rubik"] text-white text-4xl md:text-5xl lg:text-6xl xl:text-7xl md:text-left '>EXPLORE AND ENJOY THE BEAUTY OF THE PHILIPPINES</h1>
        <div className="flex flex-col md:flex-row items-center md:gap-8 lg:gap-0 lg:justify-between md:w-full md:p-0">
            <Link to="/destinations" className=' text-xl md:text-2xl py-3 xl:py-5 px-8 lg:px-8 xl:px-10 bg-amber-200 hover:bg-amber-300 hover:text-white rounded-2xl lg:rounded-2xl xl:rounded-3xl transition-colors duration-300 ease-in-out'>SEARCH</Link>
            <div className='bg-white h-20 w-1 hidden md:block' />
            <h1 className='text-black/70 lg:text-white text-base md:text-2xl mt-6 md:m-0'>For A Destination</h1>
        </div>
    </div>
  </div>
    
  )
}

export default HeroSection