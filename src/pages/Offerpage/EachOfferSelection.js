import React from 'react'
import { useGlobalContext } from '../../context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTag, faCartPlus } from "@fortawesome/free-solid-svg-icons"

const EachOfferSelection = ({image, title, location, description, limitedOffers, _id}) => {
    const {bookingToggleUI} = useGlobalContext()

  return (
    <div className="flex flex-col lg:flex-row font-['Spinnaker'] h-96 md:h-[400px] lg:h-72 xl:h-[20rem] shadow-md shadow-black/[0.8] lg:shadow-none lg:rounded-none overflow-hidden justify-around" key={_id}>
        <img className='h-2/5 md:h-1/2 lg:h-full w-full lg:w-1/2 xl:w-[110%] xl:max-w-[620px] object-cover object-center' src={image} alt={title}/>
        <div className="flex flex-col h-3/5 lg:h-full md:h-1/2 lg:justify-between lg:py-4 xl:py-6 lg:pl-8">
            <div className="flex flex-col h-3/4 md:h-3/4 lg:h-fit p-4 lg:p-0 text-sm xl:text-base text-black/[0.9] justify-around lg:justify-start">
                <div className="flex items-end mb-2 lg:mb-4 xl:mb-6 ">
                    <h1 className='mr-2 text-xl xl:text-2xl'>{`${title}, `}</h1>
                    <h2 className=' '>{location}</h2>
                </div>
                <p className='text-left mb-2 lg:mb-4 xl:mb-6'>{description}</p>
                {Object.keys(limitedOffers).map((eachOffer, array)=>(
                    <div className="flex lg:last:mt-2" key={array}>
                        <FontAwesomeIcon className="text-2xl text-[#2B8E9B] mr-2" icon={faTag} />
                        <h1 className='capitalize mr-2'>{`${eachOffer}: `}</h1>
                        <h2 className='text-red-700'>{`${limitedOffers[eachOffer]}% OFF `}</h2>
                    </div>
                ))}
            </div>
            <div className="flex w-full lg:w-fit h-fit md:h-1/4 lg:h-fit items-center p-4 md:py-2 xl:px-6 xl:py-3 bg-amber-200 hover:bg-amber-300 hover:text-white justify-center transition duration-300 ease-in-out" onClick={()=>{bookingToggleUI(_id)}} >
                <FontAwesomeIcon className="text-2xl lg:text-xl mr-2 lg:mr-4 " icon={faCartPlus} />
                <p className=''>ADD TO CART</p>
            </div>
        </div>
    </div>
  )
}

export default EachOfferSelection