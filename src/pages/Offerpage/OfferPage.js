import React from 'react'
import OfferSelection from "./OfferSelection"

const OfferPage = () => {
  
  return (
    <>
      <header className='flex h-48 md:h-64 lg:h-72 w-10/12 mt-36 md:mt-40 mb-10 md:mb-12 mx-auto bg-center bg-cover bg-no-repeat ' style={{backgroundImage: `url("/images/offerpage-pic.avif")`}}>
        <div className="flex flex-col justify-center items-center max-w-[175px] md:w-[37%] lg:w-[29%] lg:max-w-[240px] xl:w-[20%] py-4 px-2 m-auto bg-amber-300 font-['Spinnaker'] rounded-full text-center text-[#004852] " >
          <h1 className="font-['Rubik'] text-2xl md:text-3xl lg:text-4xl">SUMMER PROMOS!</h1>
          <h2 className="text-sm md:text-base lg:text-lg">Avail our limited offers only available during the summer</h2>
          <h3 className="font-semibold text-sm md:text-base">6/21 - 9/23</h3>
        </div>
      </header>
      <OfferSelection />
    </>
    
  )
}

export default OfferPage