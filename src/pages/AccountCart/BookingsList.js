import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { Controller } from 'react-hook-form'

const BookingsList = () => {
    const [listOfBookings, setListOfBookings] = useState({})
    const [bookingFilter, setBookingFilter] = useState("")
    const controller = new AbortController();

    
useEffect(()=> {
        const fetchData = async () => {
            try {
            const {data} = await axios.get("http://localhost:5000/api/v1/bookings", {signal: controller.signal})
            setListOfBookings(data)
            } catch (err) {
            if(axios.isCancel(err)) return console.log("fetch cancelled!")
            console.log(err)
            }
        }

        fetchData()
        return () => Controller.abort()
    })
    console.log(listOfBookings && listOfBookings)

  return (
    <div>
    
    </div>
  )
}

export default BookingsList

/*if (bookingFilter) {
                const {data} = await axios.get("http://localhost:5000/api/v1/bookings")
                setListOfBookings({[bookingFilter]: data})
            }
{listOfBookings && listOfBookings.find(({status}) => Object.hasOwn(status, "onCart")).map((filteredList)=> {
        console.log(filteredList)
    })
        
    }            
*/