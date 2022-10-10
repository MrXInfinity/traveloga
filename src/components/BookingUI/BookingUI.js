import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { FormProvider } from "react-hook-form"
import {
    useBookingState,
    FlightypeAndRegionComponent,
    LocationComponent,
    HotelToggleComponent,
    DateOfBookingComponent,
    PriceComponent
    } from './'
import LoadingComponent from '../LoadingComponent'
import { SuccessfulComponent, FailedComponent, SignInRequiredComponent } from '../ResultComponent'
import airportsData from '../../mockdata.json'
import { useGlobalContext } from '../../context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faCartFlatbedSuitcase } from "@fortawesome/free-solid-svg-icons"

const BookingUI = () => {
  const {form, flightType, flightTypeClick, regionsCategory, regionsCategoryClick, eachRegion, eachRegionClick, withHotel, withHotelClick, dateOfLeave, dateOfReturn, setDateClick, initialAmount, initialAmountSet, discount, discountSet, amount, amountSet, open, close} = useBookingState()
  const {bookingUI: {id, open: openState}, bookingToggleUI, setIsLoading, setIsSuccessful, setIsFailed, setIsSignInRequired} = useGlobalContext()
  const [bookingInfo, setBookingInfo] = useState(null)
  const authenticationToken = localStorage.getItem("authenticated")
  const {handleSubmit, reset, formState: {errors}} = form
  const controller = new AbortController();

  const formSubmit = async data => {
    setIsLoading(true)
    try {
      const userData = await axios.post(
        `http://localhost:5000/api/v1/bookings/${id}`, 
        data,
        { headers: { 'Authorization': `Bearer ${authenticationToken}` }})
      setIsLoading(false)
      setIsSuccessful(true)
    } catch (err) {
      setIsLoading(false)
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
            const {data} = await axios.get(`http://localhost:5000/api/v1/destinations/${id}`, {signal: controller.signal})
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
    <>
    <FormProvider {...form}>
    <div className={` ${openState ? "block" : "hidden"} flex fixed h-full w-full bg-black/75 top-0 z-50 font-["Spinnaker"]`}>
      <FontAwesomeIcon className='text-white text-4xl float-right p-6 lg:p-2 xl:p-6 ml-auto' icon={faXmark} onClick={() => bookingToggleUI()}/>
      <form className="flex flex-col h-fit w-full md:w-3/4 lg:w-11/12 max-w-[1000px] bg-white absolute m-auto inset-0 p-8 lg:py-6" onSubmit={handleSubmit(formSubmit)}>
        <h1 className='font-["Rubik"] text-xl mb-2'>PLANE BOOKING</h1>
        <div className="grid grid-cols-6 gap-3 lg:grid-cols-10">
          <FlightypeAndRegionComponent flights={airportsData} {...{flightType, flightTypeClick, regionsCategory, regionsCategoryClick}}/>
          <LocationComponent flights={airportsData} {...{flightType, regionsCategory, title, limitedOffers, eachRegion, eachRegionClick}} />
          <HotelToggleComponent {...{withHotel, withHotelClick}}/>
          <DateOfBookingComponent {...{dateOfLeave, dateOfReturn, setDateClick}} />
          <PriceComponent {...{limitedOffers, domestic, international, dateOfLeave, dateOfReturn, flightType, withHotel, eachRegion, initialAmount, initialAmountSet, discount, discountSet, amount, amountSet}}/>
        </div>
      <button className="flex items-center justify-center bg-amber-200 col-span-6 py-3 mt-4 rounded-lg" type="submit">
            <FontAwesomeIcon className="text-3xl mr-4" icon={faCartFlatbedSuitcase} />
            <h1 className='text-lg'>BOOK FLIGHT</h1>
      </button>
      </form>
    </div>
    </FormProvider>
    < LoadingComponent />
    <SuccessfulComponent message={"Booking"} />
    <FailedComponent message={"Booking"}/>
    <SignInRequiredComponent />
    </>
  )}
}

export default BookingUI