import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faCartFlatbedSuitcase, faPassport, faPlaneSlash, faMoneyBills} from "@fortawesome/free-solid-svg-icons"

const BookingNavigation = ({bookingFilter, setBookingFilter}) => {
    const navList = [
        [faList, ""],
        [faCartFlatbedSuitcase, "Cart"],
        [faPassport, "Booked"],
        [faPlaneSlash, "Cancelled"],
        [faMoneyBills, "Refunded"]
    ]

  return (
    <div className='grid grid-cols-5 grid-rows-1 md:grid-cols-1 md:grid-rows-5 lg:h-[87vh] lg:mt-[5.7rem] fixed md:sticky inset-x-0 bottom-0 md:inset-x-auto md:top-[5.7rem]  md:left-0 bg-[#004852] px-2 py-4 gap-2 text-white transition-colors duration-500 ease-in-out'>
        {navList.map(([icon, title], index)=>(    
        <div className={`flex flex-col items-center ${ title === bookingFilter && `text-amber-200`}`} onClick={()=>setBookingFilter(title)} key={index}>
            <FontAwesomeIcon className='text-3xl mb-4' icon={icon} />
            <p>{title === "" ? `All`: title}</p>
        </div>
        ))}
    </div>
  )
}

export default BookingNavigation

