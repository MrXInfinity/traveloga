import React from 'react'
import { Link } from 'react-router-dom'

const AboutUsComponent = () => {

  return (
    <div className='md:h-[432px] lg:h-[568px] flex justify-center items-center md:items-start bg-cover bg-no-repeat bg-center md:!bg-none' style={{backgroundImage: `url("/images/aboutus.avif")`}}>
        <div className='flex justify-center h-[520px] md:h-[300px] lg:h-[405px] md:w-full lg:max-w-[1290px] md:bg-black/[0.80] md:pt-8 lg:pt-12 md:px-14 lg:px-12 gap-8 lg:gap-12'>
            <img className="hidden md:block md:w-[300px] lg:w-[400px] md:h-[400px] lg:h-[520px] object-cover object-center" src='images/aboutus.avif' alt="" />
            <div className="flex flex-col h-fit md:w-full max-w-sm md:max-w-lg p-8 md:p-0 bg-black/[0.80] md:bg-transparent text-white place-self-center md:place-self-start items-center md:items-start justify-around md:justify-start">
                <h1 className='font-["Rubik"] mb-2 lg:mb-6 lg:text-lg'>ABOUT US</h1>
                <h1 className='text-xl md:text-2xl lg:text-4xl text-center md:text-left mb-4 lg:mb-6'>Make Unforgettable and Delightful Memories</h1>
                <h1 className='text-justify text-sm lg:text-base md:text-left mb-6 md:mb-4 lg:mb-6' >TRAVELOGA offers a safe and efficient way to travel to your desired destinations. Don't miss out on our limited promos by learning more about your destination. Contact us through our hotline or send us an email.</h1>
                <Link className="text-amber-200 hover:border-amber-200 border-transparent border-b-4 transition-all duration-300 ease-in-out lg:text-lg" to="/about-us">EXPLORE MORE</Link>
            </div>
        </div>
    </div>
  )
}

export default AboutUsComponent