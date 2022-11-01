import React from 'react'
import { Link } from 'react-router-dom'

const AboutUsComponent = () => {

  return (
    <div className='md:h-[400px] lg:h-[600px] flex justify-center items-center md:items-start bg-cover bg-no-repeat bg-center md:!bg-none' style={{backgroundImage: `url("/images/aboutus.avif")`}}>
        <div className='flex md:justify-center h-[520px] md:h-[300px] lg:h-[430px] md:w-full lg:max-w-[1290px] md:bg-black/[0.80]'>
            <img className="w-full hidden md:block md:w-[300px] lg:w-[400px] md:h-[400px] lg:h-[520px] md:mx-8 md:mt-8 lg:ml-12 lg:mt-12 object-cover object-center" src='images/aboutus.avif' alt="" />
            <div className="flex flex-col h-fit md:h-[310px] md:w-full max-w-sm md:max-w-lg p-8 md:pl-0 lg:p-0  bg-black/[0.80] md:bg-transparent text-white items-center md:items-start mx-4 lg:mx-6 mt-12 md:m-0 lg:mt-16 justify-around md:justify-start">
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