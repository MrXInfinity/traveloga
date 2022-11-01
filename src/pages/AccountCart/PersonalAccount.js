import React, {useState, useEffect, useRef} from 'react'
import AccountUIComponent from './AccountUIComponent'
import BookingsList from './BookingsList'
import BookingNavigation from './BookingNavigation'
import { useGlobalContext } from '../../context'
import TransitionComponent from '../../components/TransitionWrapper'
import { useNavigate } from 'react-router-dom'

const PersonalAccount = () => {
  const {user, setIsSignInRequired, setTransitionOpen} = useGlobalContext()
  const authenticationToken = localStorage.getItem("authenticated")
  const [bookingFilter, setBookingFilter] = useState("")
  const navigate = useNavigate()
  const accountCartRef = useRef(null)

  useEffect(() => {
    if (!user || !authenticationToken) {
      setIsSignInRequired(true)
      setTransitionOpen(true)
      navigate("/")
    }
  }, [user, authenticationToken])

  return (
  <>
    <div className="flex">
        <BookingNavigation {...{bookingFilter, setBookingFilter, accountCartRef}} />
        <div className="flex flex-col w-full">
          <AccountUIComponent {...{accountCartRef}}/>
          <BookingsList {...{bookingFilter }} />
        </div>
      </div>
      <TransitionComponent />
    </>
  )
}

export default PersonalAccount