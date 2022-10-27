import React from 'react'
import DestinationContent from './DestinationContent'

const DestinationPage = () => {
  return (
    <>
      <div className="flex items-center justify-center h-36 md:h-44 w-5/6 lg:w-3/4 mx-auto bg-center bg-cover mt-36 md:mt-40 mb-10 md:mb-12  bg-[url('https://images.unsplash.com/photo-1512936277470-f73e86854d79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1129&q=80')]">
        <div className="flex bg-black/[0.4] h-full w-full justify-center items-center">
          <h1 className='font-["Rubik"] text-white text-3xl md:text-4xl lg:text-5xl'>DESTINATIONS</h1>
        </div>
      </div>
      <DestinationContent />
    </>
  )
}

export default DestinationPage