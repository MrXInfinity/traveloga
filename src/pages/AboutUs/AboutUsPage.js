import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShieldAlt, faClock, faSmileBeam } from "@fortawesome/free-solid-svg-icons"
import SlidingPictures from './SlidingPictures'

const AboutUsPage = () => {

  const objectiveInfo = [
    [
      faShieldAlt, 
      "SECURITY", 
      "We prioritize our customer’s safety and ensure that their transactions and personal data are secured."
    ], 
    [
      faClock, 
      "EFFICIENT", 
      "We pride ourselves on fast and efficient transactions for a hassle-free experience."
    ], 
    [
      faSmileBeam, 
      "EXPERIENCE", 
      "We ensure a fun and worthwile experience both during the booking process and the vacation itself."
    ]
  ]

  return (
    <>
      <div className='flex h-[93vh] lg:h-screen bg-cover bg-no-repeat bg-fixed' style={{backgroundImage: `url("/images/aboutuspage-heropic.avif")`}}>
        <div className="flex flex-col items-center text-center md:items-start md:text-left h-fit md:h-full py-8 px-8 sm:py-16 md:py-12 place-self-end md:place-self-start md:w-1/2 md:mt-24 bg-[#423F3F]/90">
          <h1 className='font-["Rubik"] md:text-xl text-amber-200 mb-4 sm:mb-6'>ABOUT US</h1>
          <p className='text-white text-2xl sm:text-4xl md:text-6xl mb-6 sm:mb-10 md:mb-8'>EXPERIENCE PHILIPPINES, <br className='md:block hidden'/>LOVE PHILIPPINES</p>
          <div className="bg-white h-1 w-full mb-4 md:mb-8" />
          <p className='text-white text-sm sm:text-xl md:text-lg md:text-justify'>Traveloga offers a safe, efficient and cheap way to book your favorites sites in the Philippines even if you’re coming from abroad or just locally. Here in Traveloga, we strive to make Philippines beloved by most and known by all</p>
        </div>
      </div>
      <div className="flex bg-white w-full justify-center items-center py-16 lg:py-28 max-w-7xl xl:mx-auto">
        <div className="flex flex-col text-center w-5/6 xl:w-full">
          <h1 className='text-xl md:text-2xl lg:text-3xl mb-4 lg:mb-6 font-["Rubik"]'>OBJECTIVE</h1>
          <p className=' mb-8 text-sm md:text-base lg:text-lg text-justify'>S.E.E. the Philippines for the beauty it truly holds so everybody can appreciate and enjoy it. At Traveloga, we establish our objective S.E.E. for all of our customers to ensure the safety, efficiency, and experience for every destination they have chosen.  </p>
          <div className="grid grid-rows-3 md:grid-cols-3 md:grid-rows-1 w-5/6 md:w-full mx-auto gap-4">
          {objectiveInfo.map(([icon, title, paragraph], index)=>(
            <div className="flex flex-col p-4" key={index}>
              <FontAwesomeIcon className='text-4xl md:text-5xl mb-4 md:mb-4 text-[#2B8E9B]' icon={icon} />
              <h1 className='text-base md:text-lg mb-1 md:mb-2 font-semibold'>{title}</h1>
              <p className='text-sm md:text-base text-black/80'>{paragraph}</p>
            </div>
          ))}
          </div>
        </div>
      </div>
      <div className="flex bg-white w-full justify-center max-w-7xl mx-auto">
        <div className="flex flex-col px-8 lg:px-10 py-8 lg:py-14 lg:w-5/6 xl:w-full w-full bg-[#423F3F] text-white text-center">
          <h1 className='text-xl md:text-2xl mb-4 font-["Rubik"]'>ORIGIN</h1>
          <p className='text-sm md:text-base text-justify'>It all started as a group of friends that have a passion for traveling. We traveled all around the world, and we got to see a lot of beautiful things. When we decided to travel locally, we realized that the Philippines has untapped tourism potential. Through each expertise and overall hard work, we created Traveloga into what it is today. </p>
      </div>
      </div>
      
      <SlidingPictures />
      <div className="flex bg-center bg-no-repeat bg-cover bg-[url('https://images.pexels.com/photos/3876332/pexels-photo-3876332.jpeg?cs=srgb&dl=pexels-tomas-anunziata-3876332.jpg&fm=jpg')]">
        <div className="flex flex-col w-full bg-[#423F3F]/80 text-white p-8 md:py-14 lg:py-16 md:px-40">
          <h1 className='text-xl md:text-2xl lg:text-3xl font-["Rubik"] max-w-7xl mb-4'>PROGRESSIVILITY</h1>
          <p className='mb-4 text-sm md:text-base lg:text-lg max-w-7xl text-justify'>For the last 8 years, we have become a well-known and reliable company globally. We have also expanded our services from local to global. In this way, we made the Philippines more discoverable and reachable for those inside and outside of the country.</p>
          <div className="flex flex-col md:flex-row md:gap-12 max-w-7xl">
            {[["Local Bookings:", "30k+", "23k+"], ["Global Bookings:", "33k+", "26k+"]].map(([title, lastYear, peakBooking], index)=>(
            <div className="grid grid-rows-2 grid-cols-2 text-left text-lg max-w-lg p-4 " key={index}>
              <h1 className='lg:text-lg col-span-2 mb-2'>{title}</h1>
              <span className='ml-4 text-amber-200 text-xl md:text-2xl lg:text-3xl'>{lastYear}</span>
              <span className='text-amber-200 text-xl md:text-2xl lg:text-3xl'>{peakBooking}</span>
              <h2 className='ml-4 text-sm md:text-base lg:text-lg text-white/90'>Last Year:</h2>
              <h2 className='text-sm md:text-base lg:text-lg text-white/90'>Peak Booking:</h2>
            </div>
            ))}
          </div>  
        </div>
      </div>
    </>
  )
}

export default AboutUsPage