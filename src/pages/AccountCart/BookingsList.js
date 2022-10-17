import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { Controller } from 'react-hook-form'

const BookingsList = ({bookingFilter}) => {
    const [listOfBookings, setListOfBookings] = useState(null)
    const controller = new AbortController();
    const authenticationToken = localStorage.getItem("authenticated")
    const bookingListData = ["Cart", "Booked", "Cancelled", "Refunded"]
    console.log(listOfBookings)
useEffect(()=> {
        const fetchData = async () => {
            try {
            const {data} = await axios.get(
                "http://localhost:5000/api/v1/bookings", 
                { headers: { 'Authorization': `Bearer ${authenticationToken}` }},
                {signal: controller.signal})
            setListOfBookings(data)
            } catch (err) {
            if(axios.isCancel(err)) return console.log("fetch cancelled!")
            console.log(err)
            }
        }

        fetchData()
        return () => controller.abort()
    }, [])

  return (
    <>
    {!bookingFilter ? bookingListData.map((title, index1)=>(
        <div className="flex flex-col odd:bg-black/10" key={index1}>
            <h1>{title}</h1>
            {listOfBookings && listOfBookings.filter(eachBooking => eachBooking.status === title).map(({travellingTo}, index)=>(
                <div className="flex">
                    <img/>
                </div>
            ))}
        </div>
    )) :  (
        <div className="flex flex-col">
            <h1>{bookingFilter.toUpperCase()}</h1>
            {listOfBookings && listOfBookings.filter(eachBooking => eachBooking.status === bookingFilter).map(({travellingTo}, index)=>(
            <h1 key={index}>{travellingTo}</h1>
        ))}
        </div>)}
    </>
  )
}

export default BookingsList
