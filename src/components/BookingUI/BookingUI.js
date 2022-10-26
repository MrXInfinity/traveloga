import axios from 'axios'
import React, {useEffect, useState, useRef} from 'react'
import { FormProvider } from "react-hook-form"
import {
    useBookingState,
    FlightypeAndRegionComponent,
    LocationComponent,
    HotelToggleComponent,
    DateOfBookingComponent,
    PriceComponent
    } from './'
import airportsData from '../../mockdata.json'
import { useGlobalContext } from '../../context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faCartFlatbedSuitcase } from "@fortawesome/free-solid-svg-icons"

const BookingUI = () => {
  const {form, flightType, flightTypeClick, regionsCategory, regionsCategoryClick, eachRegion, eachRegionClick, withHotel, withHotelClick, dateOfLeave, dateOfReturn, setDateClick, initialAmount, initialAmountSet, discount, discountSet, amount, amountSet, open, close} = useBookingState()
  const {bookingUI: {id, open: openState}, setTransitionOpen, setIsLoading, setIsSuccessful, setIsFailed, setIsSignInRequired, setBookingUI} = useGlobalContext()
  const [bookingInfo, setBookingInfo] = useState(null)
  const authenticationToken = localStorage.getItem("authenticated")
  const {handleSubmit, reset} = form
  const controller = new AbortController();
  const bookingRef = useRef(null)

  const closeBookingUI = () => {
    setBookingUI({
      id: "", 
      open: false
    })
    setTransitionOpen(false)
  }

  const formSubmit = async data => {
    setIsLoading(true)
    try {
      const userData = await axios.post(
        `https://traveloga-api.onrender.com/api/v1/bookings/${id}`, 
        data,
        { headers: { 'Authorization': `Bearer ${authenticationToken}` }})
      setIsLoading(false)
      setBookingUI({id: "", open:false})
      setIsSuccessful(true)
    } catch (err) {
      setIsLoading(false)
      setBookingUI({id: "", open: false})
      if (err.response.data.msg = "Authentication Failed") {
        setIsSignInRequired(true)
        return
      }
      setIsFailed(true)
    }
    
  }
    useEffect(()=> {
      const fetchEachDestinationInfo = async () => {
        try {
            const {data} = await axios.get(`https://traveloga-api.onrender.com/api/v1/destinations/${id}`, {signal: controller.signal})
            setBookingInfo(data.destination)
        } catch (err) {
            console.log(err)
        }
    }
      if  (id && openState) {
        fetchEachDestinationInfo()
      }
      return () => {
        controller.abort()
        reset()
        close()
      }
    }, [id, openState])

    useEffect(()=> {
      if (bookingInfo)
      open(bookingInfo.title)
    }, [bookingInfo])

    if (bookingInfo) {
  const {title, limitedOffers, domestic, international} = bookingInfo
  return (
    <FormProvider {...form}>
      <div className="flex flex-row-reverse h-[93vh] w-full md:w-3/4 lg:w-11/12 max-w-[1000px] bg-white">
        <FontAwesomeIcon className='z-10 text-3xl md:text-4xl absolute p-6 lg:p-2 xl:p-6 ml-auto mb-auto lg:mr-1 text-black/50 transition-color duration-150 ease-in-out hover:text-black' icon={faXmark} onClick={() => closeBookingUI()}/>
        <form className="flex flex-col bg-white p-6 lg:py-6" onSubmit={handleSubmit(formSubmit)}>
          <h1 className='font-["Rubik"] text-xl lg:text-2xl mb-1 md:mb-2'>PLANE BOOKING</h1>
          <div className="grid grid-cols-6 gap-x-3 gap-y-2 md:gap-3 content-start h-full md:h-fit lg:grid-cols-10">
            <FlightypeAndRegionComponent flights={airportsData} {...{flightType, flightTypeClick, regionsCategory, regionsCategoryClick, bookingRef}}/>
            <LocationComponent flights={airportsData} {...{flightType, regionsCategory, title, limitedOffers, eachRegion, eachRegionClick}} />
            <HotelToggleComponent {...{withHotel, withHotelClick}}/>
            <DateOfBookingComponent {...{dateOfLeave, dateOfReturn, setDateClick}} />
            <PriceComponent {...{limitedOffers, domestic, international, dateOfLeave, dateOfReturn, flightType, withHotel, eachRegion, initialAmount, initialAmountSet, discount, discountSet, amount, amountSet}}/>
          </div>
          <button className="flex items-center justify-center bg-amber-200 col-span-6 py-3 lg:mt-4 rounded-lg mt-auto" type="submit">
            <FontAwesomeIcon className="text-3xl mr-4" icon={faCartFlatbedSuitcase} />
            <h1 className='text-lg'>BOOK FLIGHT</h1>
          </button>
        </form>
      </div>
    </FormProvider>
  )}
}

export default BookingUI