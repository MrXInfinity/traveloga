import axios from 'axios'
import React, {useEffect} from 'react'

const EachBooking = ({eachBooking, fetchData}) => {

    const authenticationToken = localStorage.getItem("authenticated")

    const changeStatus = async (status, id) => {
        try {
            const {data} = await axios.patch(
                `https://traveloga-api.onrender.com/api/v1/bookings/${id}`,
                {"status": status},
                { headers: { 'Authorization': `Bearer ${authenticationToken}` }}
            )
            fetchData()
        } catch (err) {
            console.log(err)
        }
    }
    
    useEffect(()=> {
        if (Date.now() >= new Date(eachBooking.dateOfLeave).getTime() && eachBooking.status === "Cart") {
            changeStatus("Cancelled",eachBooking._id)
        }
    }, [eachBooking])
    console.log(eachBooking)
    

    if (eachBooking){
    const {travellingTo, travellingFromLocation, regionsCategory, flightType, dateOfLeave, dateOfReturn, withHotel, _id, status, amount} = eachBooking
  return (
    <div className="grid grid-cols-2 grid-flow-row gap-2 border-2 border-black/50 border-solid p-4 bg-white">
        <div className="flex flex-col">
            <h1 className='text-black/70'>Travelling To:</h1>
            <p className='text-xl'>{travellingTo}</p>
        </div>
        <div className="flex flex-col">
            <h1 className='text-black/70'>Leave:</h1>
            <p className='text-xl'>{new Date(dateOfLeave).toLocaleDateString()}</p>
        </div>
        <div className="flex flex-col">
            <h1 className='text-black/70'>Travelling From:</h1>
            <p className='text-xl'>{travellingFromLocation}, {regionsCategory}</p>
        </div>
        <div className="flex flex-col">
            <h1 className='text-black/70'>Return:</h1>
            <p className='text-xl'>{new Date(dateOfReturn).toLocaleDateString()}</p>
        </div>
        <div className="flex flex-col">
            <h1 className='text-black/70'>Flight Type:</h1>
            <p className='text-xl'>{flightType}</p>
        </div>
        <div className="flex flex-col">
            <h1 className='text-black/70'>Hotel</h1>
            <p className='text-xl'>{withHotel ? `Selected` : `Not Selected`}</p>
        </div>
        <div className="flex col-span-2 justify-between mt-2 items-center">
            <h1 className='text-xl text-[#2B8E9B] h-fit'>{amount}</h1>
            {status === "Cart" ? (
            <div className="flex gap-4 ">
                {[["Booked", "BOOK"], ["Cancelled", "CANCEL"]].map(([status, title], index)=>(
                <button className='px-6 py-2 bg-amber-200 hover:bg-amber-300 hover:text-white transition duration-300 ease-in-out' onClick={()=>changeStatus(status, _id)}>{title}</button>
                ))}
            </div>
                ): <h1 className={`flex col-span-2 px-4 py-2 ${status === "Booked" ? `text-green-600` :  `text-red-700`} bg-slate-100`}>{status.toUpperCase()}</h1>
                }
        </div>
    </div>
  )}

  else {
    return (
        <h1>No Contents found...</h1>
    )
  }
}

export default EachBooking