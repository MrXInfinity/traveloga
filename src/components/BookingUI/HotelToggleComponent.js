import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useFormContext } from "react-hook-form"
import { faHotel } from "@fortawesome/free-solid-svg-icons"

const HotelToggleComponent = ({withHotel, withHotelClick}) => {
    const { formState: {errors}} = useFormContext()
    console.log(errors)
    
    return (
        <div className="flex flex-col col-span-2 lg:col-span-2 lg:row-span-2 lg:-order-1">
            <h2 className='md:text-lg md:mb-1'>HOTEL</h2>
            <p className="text-xs md:text-sm mb-3">Toggle to book or unbook a hotel.</p>
            <div className={`${withHotel ? `bg-amber-200` : `bg-white`} ${errors.travellingFromLocation ? `lg:py-20` : ` lg:py-16`} flex h-full ring-1 ring-black/[0.6] items-center justify-center rounded-lg`} onClick={() => withHotelClick()}>
                <FontAwesomeIcon className="text-6xl lg:text-9xl" icon={faHotel} />
            </div>
        </div>

        
    )
}

export default HotelToggleComponent