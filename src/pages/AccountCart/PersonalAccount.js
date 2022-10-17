import React, {useState} from 'react'
import AccountUIComponent from './AccountUIComponent'
import BookingsList from './BookingsList'
import BookingNavigation from './BookingNavigation'
import { useGlobalContext } from '../../context'

const PersonalAccount = () => {
  const [bookingFilter, setBookingFilter] = useState("")
  console.log(bookingFilter)

  return (
  <div className="flex">
      <BookingNavigation {...{bookingFilter, setBookingFilter}} />
      <div className="flex flex-col">
        <AccountUIComponent />
        <BookingsList {...{bookingFilter}} />
      </div>
    </div>
  )
}

export default PersonalAccount