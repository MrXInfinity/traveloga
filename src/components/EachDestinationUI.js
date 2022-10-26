import axios from 'axios'
import React, {useState, useEffect, useRef} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { useGlobalContext } from '../context'

const EachDestinationUI = () => {
    const [destinationInfo, setDestinationInfo] = useState(null)
    const bookingButton = useRef(null)
    const {destinationUI: {id, open}, setTransitionOpen, setDestinationUI, setBookingUI} = useGlobalContext()
    const controller = new AbortController();

    const openBookingUI = (id) => {
        setDestinationUI({
            id: "",
            open: false
        })
        setBookingUI({
            id: id,
            open: true
        })
    }

    const closeDestinationUI = () => {
        setTransitionOpen(false)
        setDestinationUI({
            id: "",
            open: false
        })
    }

    useEffect(()=> {
        const fetchEachDestinationInfo = async () => {
        try {
            const {data} = await axios.get(`https://traveloga-api.onrender.com/api/v1/destinations/${id}`, {signal: controller.signal})
            setDestinationInfo(data.destination)
        } catch (err) {
            console.log(err)
        }
    }
        if (id && open) {
            fetchEachDestinationInfo()
        }
        return () => controller.abort()
    }, [id, open])

    if (destinationInfo) {
        const {title, location, description, image, international} = destinationInfo
        return (
            <div className=" flex flex-col lg:flex-row h-[93vh] lg:h-[90vh] w-full max-w-[1000px] justify-between" >
                <img className="h-1/2 lg:h-full w-full object-cover object-center" src={image} alt={title}/>
                    <div className="flex flex-col h-fit lg:h-auto w-full lg:w-1/3 justify-between bg-white lg:absolute lg:inset-y-0 lg:right-0">
                        <div className="flex flex-col pb-4 w-5/6 mx-auto lg:h-full">
                            <FontAwesomeIcon className="text-3xl md:text-4xl right-0 absolute pr-4 pt-2" icon={faXmark} onClick={()=>closeDestinationUI()}/>
                            <h1 className='text-center text-xl md:text-2xl w-3/4 mx-auto lg:mt-4 whitespace-nowrap pt-4'>{title}</h1>
                            <h2 className='text-center text-sm'>{location}</h2>
                            <p className='text-center mt-2 md:mt-4 text-sm md:text-base'>{description}</p>
                            <div className="flex flex-col mt-5 mb-4">
                                <h1 className='mb-2 md:text-lg'>DOMESTIC</h1>
                                <div className='grid grid-cols-3 lg:grid-cols-2 gap-4'>
                                {["LUZON", "VISAYAS", "MINDANAO"].map((eachRegion, index)=>(
                                    <span className=' text-[#2B8E9B] py-1 text-center text-xs md:text-sm shadow shadow-black/30' key={index}>{eachRegion}</span>
                                ))}
                                </div>
                        </div>
                        <div className="flex flex-col">
                            <h1 className='mb-2 md:text-lg'>INTERNATIONAL</h1>
                            <div className="grid grid-cols-3 lg:grid-cols-2 gap-4">
                            {Object.keys(international).map((eachRegion, index)=>(
                                <span className='text-[#2B8E9B] py-1 text-center text-xs md:text-sm shadow shadow-black/30' key={index}>{eachRegion === "southeastAsia" ? `S.E. ASIA` : eachRegion.toLocaleUpperCase()}</span>
                            ))}
                            </div>
                        </div>
                    </div>
                    <button className="flex text-xl lg:text-2xl mb-4 mx-auto lg:mb-6 py-3 w-5/6 lg:w-fit lg:py-2 lg:px-4 bg-amber-200 text-black hover:bg-amber-300 hover:text-white justify-center items-center transition-colors duration-300 ease-in-out" onClick={()=>openBookingUI(id)} ref={bookingButton}>
                        BOOK NOW!
                    </button>
                </div>
            </div>
    )}
    }
    


export default EachDestinationUI