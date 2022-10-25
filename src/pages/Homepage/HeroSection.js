import React from 'react'
import { Link } from 'react-router-dom'

const HeroSection = () => {
  return (
    <div className="flex bg-cover bg-no-repeat bg-center bg-fixed bg-[url('https://images.pexels.com/photos/3996156/pexels-photo-3996156.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')]">
      <div className='flex flex-col h-[93vh] md:h-screen pt-48 pb-24 md:pt-56 lg:pt-48 lg:pb-20 lg:pl-20 xl:pt-64 xl:pb-24 w-4/5 lg:w-7/12 mx-auto lg:mx-0 text-center lg:text-left justify-between '>
        <h1 className='font-["Rubik"] text-white text-4xl lg:text-6xl lg:text-left'>EXPLORE AND ENJOY THE BEAUTY OF THE PHILIPPINES</h1>
        <div className="flex flex-col lg:flex-row items-center justify-between md:w-full lg:w-4/5 md:p-0">
            <Link to="/destinations" className=' text-xl md:text-2xl xl:text-3xl py-3 xl:py-6 px-8 lg:px-8 bg-amber-200 hover:bg-amber-300 hover:text-white rounded-2xl lg:rounded-2xl xl:rounded-3xl transition-colors duration-300 ease-in-out'>SEARCH</Link>
            <div className='bg-white h-20 w-1 hidden lg:block' />
            <h1 className='text-black/70 lg:text-white text-base md:text-2xl xl:text-3xl mt-6 lg:m-0'>For A Destination</h1>
        </div>
    </div>
  </div>
    
  )
}

export default HeroSection