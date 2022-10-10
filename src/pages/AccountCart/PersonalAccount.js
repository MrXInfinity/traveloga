import React from 'react'
import AccountUIComponent from './AccountUIComponent'
import BookingsList from './BookingsList'
import { useGlobalContext } from '../../context'

const PersonalAccount = () => {
  return (
    <>
      <AccountUIComponent />
      <BookingsList />
    </>
  )
}

export default PersonalAccount