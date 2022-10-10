import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShieldVirus, faClock, faSmileBeam, faLocationDot, faGlobe } from "@fortawesome/free-solid-svg-icons"
import SlidingPictures from './SlidingPictures'

const AboutUsPage = () => {
  return (
    <>
      <div className='flex flex-col lg:flex-row h-screen pt-48 md:pt-56 lg:pt-48 pb-12 md:pb-16 mx-auto lg:mx-0 text-center lg:text-left items-center lg:items-start bg-cover bg-no-repeat bg-fixed bg-[url("https://images.pexels.com/photos/3996156/pexels-photo-3996156.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")]'>
          <div className="flex flex-col lg:w-2/3 lg:ml-12">
            <h1 className='font-["Rubik"] text-xl md:text-2xl lg:text-xl text-amber-200 self-center lg:self-start lg:mt-12'>ABOUT US</h1>
            <p className='text-white text-5xl md:text-6xl lg:text-5xl text-["Rubik"] mt-12'>EXPERIENCE PHILIPPINES, LOVE PHILIPPINES</p>
          </div>
          <p className='text-white bg-[#423F3F]/90 w-5/6 lg:w-1/3 lg:h-full text-lg md:text-xl lg:text-xl px-6 py-8 md:px-8 md:py-12 lg:px-8 lg:py-12 mt-auto lg:items-center md:mb-0 lg:row-span-3'>Traveloga offers a safe, efficient and cheap way to book your favorites sites in the Philippines even if you’re coming from abroad or just locally. Here in Traveloga, we strive to make Philippines beloved by most and known by all</p>
      </div>
      <div className="flex bg-white w-full justify-center items-center py-16 lg:py-28 max-w-7xl xl:mx-auto">
        <div className="flex flex-col text-center w-5/6 xl:w-full">
          <h1 className='text-3xl mb-4 lg:mb-6'>OBJECTIVE</h1>
          <p className='text-sm mb-8 lg:text-base'>S.E.E. the Philippines for the beauty it truly holds so everybody can appreciate and enjoy it. At Traveloga, we establish our objective S.E.E. for all of our customers to ensure the safety, efficiency, and experience for every destination they have chosen.  </p>
          <div className="grid grid-rows-3 md:grid-cols-3 md:grid-rows-1 w-5/6 md:w-full mx-auto gap-4">
          {[[faShieldVirus, "Security", "Safe and trustworthy transactions"], [faClock, "Efficient", "Fast and Easy Interface"], [faSmileBeam, "Experience", "Fun and Memorable Experiences"]].map(([icon, title, paragraph], index)=>(
            <div className="flex flex-col bg-[#2B8E9B] text-white p-4 rounded-2xl" key={index}>
              <FontAwesomeIcon className='text-6xl mb-2 md:mb-4' icon={icon} />
              <h1 className='text-xl md:mb-2'>{title}</h1>
              <p>{paragraph}</p>
            </div>
          ))}
          </div>
        </div>
      </div>
      <div className="flex bg-white w-full justify-center max-w-7xl mx-auto">
        <div className="flex flex-col px-6 lg:px-10 py-12 lg:py-14 lg:w-5/6 xl:w-full w-full bg-[#423F3F] text-white text-center">
          <h1 className='text-3xl mb-4'>ORIGIN</h1>
          <p className=''>It all started as a group of friends that have a passion for traveling. We traveled all around the world, and we got to see a lot of beautiful things. When we decided to travel locally, we realized that the Philippines has untapped tourism potential. Through each expertise and overall hard work, we created Traveloga into what it is today. </p>
      </div>
      </div>
      
      <SlidingPictures />
      <div className="flex bg-center bg-no-repeat bg-cover bg-[url('https://images.pexels.com/photos/3876332/pexels-photo-3876332.jpeg?cs=srgb&dl=pexels-tomas-anunziata-3876332.jpg&fm=jpg')]">
        <div className="flex flex-col w-full bg-[#423F3F]/80 text-white text-center p-8 md:py-14 lg:py-16 items-center">
          <h1 className='text-3xl mb-4'>PROGRESSIVILITY</h1>
          <p className='mb-8  lg:w-5/6 max-w-7xl'>For the last 8 years, we have become a well-known and reliable company globally. We have also expanded our services from local to global. In this way, we made the Philippines more discoverable and reachable for those inside and outside of the country.</p>
          <div className="flex flex-col md:flex-row gap-6 w-5/6  max-w-7xl lg:justify-around">
            {[[faLocationDot, "Local Bookings:", "30k+", "23k+"], [faGlobe, "Global Bookings:", "33k+", "26k+"]].map(([icon, title, lastYear, peakBooking], index)=>(
              <div className="flex items-center justify-between p-4 w-3/4 bg-[#2B8E9B]/50 max-w-lg" key={index}>
                <FontAwesomeIcon className="text-5xl w-1/4 text-black lg:text-6xl lg:ml-2" icon={icon} />
                <div className="flex flex-col text-left text-lg mr-8 md:mr-4 lg:mr-12">
                  <h1>{title}</h1>
                  <h2 className='text-sm lg:text-lg'>{`Last Year: ${lastYear}`}</h2>
                  <h2 className='text-sm lg:text-lg'>{`Peak Booking: ${peakBooking}`}</h2>
                </div>
              </div>
            ))}
          </div>  
        </div>
      </div>
    </>
  )
}

export default AboutUsPage