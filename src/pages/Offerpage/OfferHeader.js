import React from 'react'

const OfferHeader = () => { 
  
  return (
      <header className="w-full h-fit flex justify-center items-center pt-48 md:pt-44 lg:pt-40 pb-16 md:pb-12 lg:pb-12">
        <div className='flex h-60 md:h-64 lg:h-72 w-10/12 bg-cover rounded-3xl md:rounded-none bg-center bg-[url("https://images.pexels.com/photos/8031711/pexels-photo-8031711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")]'>
          <div className="flex flex-col justify-center items-center mx-auto w-[50vw] max-w-[215px] md:w-[37%] lg:w-[29%] lg:max-w-[240px] xl:w-[20%] p-1 px-2 my-4 md:my-3 lg:my-6 bg-amber-300 font-['Spinnaker'] rounded-full text-center text-[#004852] " >
            <h1 className="font-['Rubik'] text-3xl lg:text-4xl">SUMMER PROMOS!</h1>
            <h2 className="text-lg lg:text-xl">Avail our limited offers only available during the summer</h2>
            <h3 className="font-bold lg:text-lg">6/21 - 9/23</h3>
          </div>
        </div>
      </header>
  )
}

export default OfferHeader