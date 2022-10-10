import React from 'react'
import { Link } from 'react-router-dom'

const AboutUsComponent = () => {

  return (
    <div className='lg:h-[650px] flex justify-center items-center lg:bg-white bg-cover lg:bg-none bg-[url("https://images.unsplash.com/photo-1542090862-474bd09df78d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80")]'>
        <div className='flex h-[665px] lg:w-full lg:max-w-[1290px] xl:w-11/12 lg:h-[430px] xl:mx-20 lg:bg-black/[0.80]'>
            <img className="w-full hidden lg:block lg:w-[480px] lg:h-[520px] lg:ml-12 xl:ml-16 lg:mt-12 xl:mt-16" src="https://images.unsplash.com/photo-1542090862-474bd09df78d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80" alt="" />
            <div className="flex flex-col font-['Spinnaker'] h-fit lg:h-[310px] w-[370px] md:w-2/3 lg:w-[580px] p-8 lg:py-0 xl:p-0 bg-black/[0.80] lg:bg-transparent text-white items-center lg:items-start mx-auto mt-12 xl:mt-16 justify-around lg:justify-start">
                <h1 className='font-["Rubik"] mb-4 lg:mb-8 md:text-xl'>ABOUT US</h1>
                <h1 className=' text-2xl md:text-4xl text-center lg:text-left mb-6'>Make Unforgettable and Delightful Memories</h1>
                <h1 className=' text-sm md:text-base lg:text-sm text-center lg:text-left mb-6' >TRAVELOGA offers a safe and efficient way to travel to your desired destinations. Don't miss out on our limited promos by learning more about your destination. Contact us through our hotline or send us an email.</h1>
                <Link className="text-amber-200 hover:border-amber-200 border-transparent border-b-4 transition-all duration-300 ease-in-out lg:text-lg" to="/about-us">Explore About Us</Link>
            </div>
        </div>
    </div>
  )
}

export default AboutUsComponent