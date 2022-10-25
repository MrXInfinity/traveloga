import axios from 'axios'
import React, {useState, useEffect} from 'react'
import EachBooking from './EachBooking'

const BookingsList = ({bookingFilter}) => {
    const [listOfBookings, setListOfBookings] = useState(null)
    const controller = new AbortController();
    const authenticationToken = localStorage.getItem("authenticated")
    const bookingListData = ["Cart", "Booked", "Cancelled", "Refunded"]

    const fetchData = async () => {
            try {
            const {data} = await axios.get(
                "https://traveloga-api.onrender.com/api/v1/bookings", 
                { headers: { 'Authorization': `Bearer ${authenticationToken}` }},
                {signal: controller.signal})
            setListOfBookings(data)
            } catch (err) {
            if(axios.isCancel(err)) return console.log("fetch cancelled!")
            console.log(err)
            }
        }
    
useEffect(()=> {
        fetchData()
        return () => controller.abort()
    }, [])

  return (
    <>
    {!bookingFilter ? bookingListData.map((title, index1)=>(
        <div className="flex flex-col gap-4 odd:bg-black/10 w-full p-4" key={index1}>
            <h1 className='text-2xl'>{title.toUpperCase()}</h1>
            <div className="grid grid-cols-1 grid-flow-row lg:grid-cols-2 gap-2">
                {listOfBookings && listOfBookings.filter(eachBooking => eachBooking.status === title).map((eachBooking, index)=>(
                <EachBooking {...{eachBooking, fetchData}} key={index}/>
            ))}
            </div>
        </div>
    )) :  (
        <div className="flex flex-col gap-4 odd:bg-black/10 w-full p-4">
            <h1 className='text-2xl'>{bookingFilter.toUpperCase()}</h1>
            <div className="grid grid-cols-1 grid-flow-row lg:grid-cols-2 gap-2">
            {listOfBookings && listOfBookings.filter(eachBooking => eachBooking.status === bookingFilter).map((eachBooking, index)=>(
                <EachBooking {...{eachBooking, fetchData}} key={index}/>
            ))}
            </div>
        </div>
        )}
    </>
  )
}

export default BookingsList
