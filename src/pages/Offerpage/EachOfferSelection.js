import React from 'react'
import { useGlobalContext } from '../../context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTag, faCartPlus } from "@fortawesome/free-solid-svg-icons"

const EachOfferSelection = ({image, title, location, description, limitedOffers, _id}) => {
    const {setBookingUI, setTransitionOpen} = useGlobalContext()
    const bookingToggleUI = (id) => {
        setBookingUI({
            id: id,
            open: true
        })
        setTransitionOpen(true)
    }

  return (
    <div className="flex flex-col md:grid md:grid-cols-2 md:gap-6 xl:gap-8 font-['Spinnaker'] h-fit md:h-[285px] lg:h-[300px] shadow-md shadow-black/[0.8] md:shadow-none md:rounded-none overflow-hidden" key={_id}>
        <img className='h-2/5 max-h-60 md:max-h-fit md:h-full w-full object-cover object-center' src={image} alt={title}/>
        <div className="flex flex-col h-fit md:justify-between lg:py-4">
            <div className="flex flex-col h-3/4 lg:h-fit p-4 md:py-4 md:px-0 text-black/[0.9]">
                <div className="flex items-end mb-1 md:mb-4 ">
                    <h1 className='mr-2 text-lg md:text-xl lg:text-2xl'>{title}, </h1>
                    <h2 className='text-sm md:text-base'>{location}</h2>
                </div>
                <p className='text-left mb-2 sm:mb-4 text-sm md:text-base'>{description}</p>
                {Object.keys(limitedOffers).map((eachOffer, array)=>(
                    <div className="flex items-center" key={array}>
                        <FontAwesomeIcon className="text-2xl text-[#2B8E9B] mr-2" icon={faTag} />
                        <h1 className='capitalize mr-2 text-sm md:text-base'>{eachOffer}: </h1>
                        <h2 className='text-red-700 md:text-lg'>{limitedOffers[eachOffer]}% OFF </h2>
                    </div>
                ))}
            </div>
            <div className="flex w-full md:w-fit h-fit items-center p-4 md:py-2 lg:mt-2 bg-amber-200 hover:bg-amber-300 hover:text-white justify-center transition duration-300 ease-in-out" onClick={()=>{bookingToggleUI(_id)}} >
                <p className=''>ADD TO CART</p>
            </div>
        </div>
    </div>
  )
}

export default EachOfferSelection