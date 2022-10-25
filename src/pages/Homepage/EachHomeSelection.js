import React from 'react'
import { useGlobalContext } from '../../context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from "@fortawesome/free-solid-svg-icons"

const Selection = ({info, leftPosition}) => {
  const {setDestinationUI, setTransitionOpen} = useGlobalContext()
  const destinationToggleUI = (id) => {
    setDestinationUI({
            id: id, 
            open: true})
            setTransitionOpen(true)
  }
  
 if (info.length > 0){
  return(
    <>
      <div className="flex sm:touch-none lg:overflow-hidden overflow-x-scroll mt-4 ">
            <div className={`flex w-fit relative snap-x lg:snap-none touch-pan-x transition-all duration-500 delay-150 ease-in-out pb-2 lg:px-2`} style={{left: `${-leftPosition*35}rem`}} >
                {info.map(({title, image, location, _id})=>(
                  <div className="flex flex-col h-80 md:h-96 w-80 md:w-[400px] lg:w-[522px] shadow-lg hover:shadow-md hover:shadow-black rounded-[50px] lg:rounded-none overflow-hidden mr-11 last:mr-6 snap-start transition-all duration-300 ease-in-out" key={_id} onClick={()=>destinationToggleUI(_id)}>
                    <img src={image} alt={title} className='h-full lg:h-5/6 object-cover object-center'/>
                    <div className="flex h-fit pl-10 pr-4 py-3 md:px-4 md:py-4 justify-around lg:justify-between flex-col lg:flex-row">
                      <h1 className='text-lg lg:text-2xl my-auto'>{title}</h1>
                      <div className="flex text-black/70 lg:text-black/70">
                        <FontAwesomeIcon icon={faLocationDot} className='text-sm lg:text-2xl my-auto mr-1 lg:mr-2'/>
                        <h1 className='my-auto lg:text-xl'>{location}</h1>
                      </div>
                    </div>    
                  </div>
                ))}
            </div>
        </div>
    </>
  )}

  else {
    return (
    <div className="flex flex-col h-80 md:h-96 w-80 md:w-[400px] lg:w-[522px] shadow-lg rounded-3xl overflow-hidden lg:rounded-none animate-pulse">
      <div className=" h-3/4 bg-[#004852]" />
      <div className="flex h-1/4 p-4 justify-around lg:justify-between flex-col lg:flex-row lg:items-center">
        <div className='h-5 my-auto bg-[#004852] lg:w-1/2' />
        <div className="flex lg:w-1/3 h-3 lg:h-5">
          <div className='h-full w-1/3 lg:w-1/4 my-auto mr-1 bg-[#004852]'/>
          <div className='h-full w-2/3 lg:w-3/4 my-auto bg-[#004852]' />
        </div>
      </div>
    </div>
  )
  }
 
  
}

export default Selection