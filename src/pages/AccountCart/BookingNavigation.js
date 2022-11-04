import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faCartFlatbedSuitcase, faPassport, faPlaneSlash, faMoneyBills} from "@fortawesome/free-solid-svg-icons"

const BookingNavigation = ({bookingFilter, setBookingFilter, accountCartRef}) => {
    const navList = [
        [faList, ""],
        [faCartFlatbedSuitcase, "Cart"],
        [faPassport, "Booked"],
        [faPlaneSlash, "Cancelled"],
        [faMoneyBills, "Refunded"]
    ]

    const scrollUp = () => {
    accountCartRef.current?.scrollIntoView({behavior: 'smooth'});
    };

  return (
    <div className='grid grid-cols-5 grid-rows-1 md:grid-cols-1 md:grid-rows-5 md:h-[87vh] max-h-[700px] md:align-items-center  md:mt-[6.5rem] lg:mt-[5.7rem] fixed md:sticky inset-x-0 bottom-0 md:inset-x-auto md:top-[6.5rem] lg:top-[5.7rem] md:left-0 bg-[#004852] px-2 py-4 gap-2 text-white transition-colors duration-500 ease-in-out'>
        {navList.map(([icon, title], index)=>(    
        <div className={`flex flex-col items-center ${ title === bookingFilter && `text-amber-200`}`} 
        onClick={()=>{
          setBookingFilter(title)
          scrollUp()
        }} key={index}>
            <FontAwesomeIcon className='text-2xl md:text-3xl mb-4' icon={icon} />
            <p className='text-sm md:text-base'>{title === "" ? `All`: title}</p>
        </div>
        ))}
    </div>
  )
}

export default BookingNavigation

