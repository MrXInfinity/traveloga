import axios from "axios"
import React, {useState, useEffect} from 'react'
import { useGlobalContext } from "../../context"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapPin, faLocationDot, faUmbrellaBeach, faMountain, faLandmark } from "@fortawesome/free-solid-svg-icons"

const DestinationContent = () => {
    const [listOfDestinations, setListOfDestinations] = useState()
    const [categoryFilter, setCategoryFilter] = useState("")
    const {setDestinationUI, setTransitionOpen, setIsLoading} = useGlobalContext()
    const controller = new AbortController();

    const destinationToggleUI = (id) => {
    setDestinationUI({
            id: id, 
            open: true})
            setTransitionOpen(true)
    }

    useEffect(()=> {
        const fetchAllCategory = async () => {
            setTransitionOpen(true)
            setIsLoading(true)
        try {
        if (categoryFilter) {
            const {data} = await axios.get(`https://traveloga-api.onrender.com/api/v1/destinations?category=${categoryFilter}`, {signal: controller.signal})
            setListOfDestinations({[categoryFilter]: data})
            setIsLoading(false)
            setTransitionOpen(false)
        }
        else {
            const {data: beachData} = await axios.get(`https://traveloga-api.onrender.com/api/v1/destinations?category=beach`, {signal: controller.signal})
            const {data: landMarkData} = await axios.get(`https://traveloga-api.onrender.com/api/v1/destinations?category=landmark`, {signal: controller.signal})
            const {data: historyData} = await axios.get(`https://traveloga-api.onrender.com/api/v1/destinations?category=history`, {signal: controller.signal})
            setListOfDestinations({
                beach: beachData,
                landmark: landMarkData,
                history: historyData,
            })
            setIsLoading(false)
            setTransitionOpen(false)
        }
        } catch (err) {
            setIsLoading(false)
            setTransitionOpen(false)
            if(axios.isCancel(err)) return console.log("fetch cancelled!")
            alert(err.response.data.msg)
            }
    }
    fetchAllCategory()
    return ()=> controller.abort()
    }, [categoryFilter])

    return (
        <div className='bg-white flex-col pb-4'>
            <div className="grid grid-cols-4 text-sm py-4 rounded-lg divide-x-4 divide-amber-200 border-4 w-5/6 lg:w-3/4 mx-auto border-amber-200 border-solid justify-center items-center">
                {[["", "ALL", faLocationDot], ["beach", "BEACH", faUmbrellaBeach], ["landmark", "LANDMARK", faMountain], ["history", "HISTORY", faLandmark]].map(([value, eachCategory, icon], index)=>
                <div className={`flex items-center justify-center hover:text-black/70 transition=colors ease-in-out ${categoryFilter === value ? `text-amber-300 hover:text-amber-300/70`: ``}`}  onClick={()=>setCategoryFilter(value)} key={index}>
                <FontAwesomeIcon className="text-3xl md:hidden xl:block xl:mr-4" icon={icon} />
                <button className="hidden md:block text-lg lg:text-xl">{eachCategory}</button>
                </div>
                )}
            </div>
            <div className="flex flex-col gap-4 w-5/6 sm:w-3/4 md:w-5/6 lg:w-3/4 mx-auto mt-8">
                {listOfDestinations ? Object.keys(listOfDestinations).map((eachDestination, index)=>(
                    <div className="flex flex-col mb-8" key={index}>
                        <div className="flex flex-col mb-4">
                            <h1 className="text-2xl md:text-3xl lg:text-2xl text-center lg:text-left font-['Rubik']">{eachDestination.toLocaleUpperCase()}</h1>
                            <div className="bg-black w-full h-1 lg:h-1"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {listOfDestinations[eachDestination].map(({title, location, image, _id})=>(
                            <div className="flex flex-col" key={_id}>
                                <div className="flex h-52 sm:h-60 md:h-40 lg:h-60 xl:h-80 group relative" onClick={()=>destinationToggleUI(_id)}>
                                    <img className="w-full h-full object-cover object-center bg-black" src={image} />
                                    <div className="group-hover:bg-black/50 w-full h-full absolute transition-colors ease-in-out duration-300"></div>
                                </div>
                                <div className="flex items-center px-2">
                                    <FontAwesomeIcon className="text-[#2B8E9B] text-3xl md:text-4xl" icon={faMapPin} />
                                    <div className="flex flex-col mt-2 ml-3 md:ml-4">
                                        <h1 className="text-lg lg:text-xl whitespace-nowrap">{title}</h1>
                                        <h2 className="text-black/70 text-xs lg:text-sm">{location}</h2>
                                    </div>
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>
                )
                ) : (
                <div className="w-full mx-auto bg-black/20 text-center text-2xl text-white py-4 mb-8 lg:mb-20 ">
                    No Destinations Available...
                </div>
                )}
            </div>
        </div>
    )
}

export default DestinationContent