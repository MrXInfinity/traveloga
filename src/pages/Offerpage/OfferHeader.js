import React from 'react'

const OfferHeader = () => { 
  
  return (
  <header className='flex h-60 md:h-64 lg:h-72 w-10/12 bg-cover mt-40 mb-10 md:mb-12 mx-auto bg-center bg-[url("https://images.pexels.com/photos/8031711/pexels-photo-8031711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")]'>
    <div className="flex flex-col justify-center items-center max-w-[215px] md:w-[37%] lg:w-[29%] lg:max-w-[240px] xl:w-[20%] py-4 px-2 m-auto bg-amber-300 font-['Spinnaker'] rounded-full text-center text-[#004852] " >
      <h1 className="font-['Rubik'] text-3xl md:text-4xl">SUMMER PROMOS!</h1>
      <h2 className="md:text-lg">Avail our limited offers only available during the summer</h2>
      <h3 className="font-semibold text-sm md:text-base">6/21 - 9/23</h3>
    </div>
  </header>
  )
}

export default OfferHeader