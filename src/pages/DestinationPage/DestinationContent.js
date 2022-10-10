import axios from "axios"
import React, {useState, useEffect} from 'react'
import { useGlobalContext } from "../../context"
import EachDestinationUI from "../../components/EachDestinationUI"
import BookingUI from "../../components/BookingUI/BookingUI"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapPin, faLocationDot, faUmbrellaBeach, faMountain, faLandmark } from "@fortawesome/free-solid-svg-icons"

const DestinationContent = () => {
    const [listOfDestinations, setListOfDestinations] = useState({})
    const [categoryFilter, setCategoryFilter] = useState("")
    const {destinationToggleUI} = useGlobalContext()
    const controller = new AbortController();

    useEffect(()=> {
        const fetchAllCategory = async () => {
        try {
        if (categoryFilter) {
            const {data} = await axios.get(`http://localhost:5000/api/v1/destinations?category=${categoryFilter}`, {signal: controller.signal})
            setListOfDestinations({[categoryFilter]: data})
        }
        else {
            const {data: beachData} = await axios.get(`http://localhost:5000/api/v1/destinations?category=beach`, {signal: controller.signal})
            const {data: landMarkData} = await axios.get(`http://localhost:5000/api/v1/destinations?category=landmark`, {signal: controller.signal})
            const {data: historyData} = await axios.get(`http://localhost:5000/api/v1/destinations?category=history`, {signal: controller.signal})
            setListOfDestinations({
                beach: beachData,
                landmark: landMarkData,
                history: historyData,
            })
        }
        } catch (err) {
            if(axios.isCancel(err)){
            console.log("fetch cancelled!")
            }
            else {
            console.log(err)
            }
            }
    }
    fetchAllCategory()
    return ()=> controller.abort()
    }, [categoryFilter])

    return (
    <>
        <div className='bg-white flex-col font-["Spinnaker"] pb-4'>
            <div className="grid grid-cols-4 text-sm py-4 rounded-lg divide-x-4 divide-amber-200 border-4 w-5/6 lg:w-3/4 mx-auto border-amber-200 border-solid justify-center items-center">
                {[["", "ALL", faLocationDot], ["beach", "BEACH", faUmbrellaBeach], ["landmark", "LANDMARK", faMountain], ["history", "HISTORY", faLandmark]].map(([value, eachCategory, icon, index])=>
                <div className={`flex items-center justify-center ${categoryFilter === value ? `text-amber-300`: ``}`}  onClick={()=>setCategoryFilter(value)} key={index}>
                <FontAwesomeIcon className="text-3xl lg:hidden xl:block xl:mr-4" icon={icon} />
                <button className="hidden lg:block text-xl">{eachCategory}</button>
                </div>
                )}
            </div>
            <div className="flex flex-col gap-4 w-5/6 lg:w-3/4 mx-auto mt-8">
                {listOfDestinations && Object.keys(listOfDestinations).map((eachDestination, index)=>(
                    <div className="flex flex-col mb-8" key={index}>
                        <div className="flex flex-col mb-4">
                            <h1 className="text-2xl md:text-3xl lg:text-2xl text-center lg:text-left">{eachDestination.toLocaleUpperCase()}</h1>
                            <div className="bg-black w-full h-1 lg:h-1"></div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {listOfDestinations[eachDestination].map(({title, location, image, _id})=>(
                            <div className="flex h-52 md:h-72 lg:h-60 xl:h-80 bg-cover bg-center text-white group" style={{backgroundImage: `url(${image})`}} onClick={()=>destinationToggleUI(_id)} key={_id}>
                                <div className="flex bg-gradient-to-t from-black/[0.7] md:from-black/80 via-black/[0.4] to-transparent lg:hidden lg:group-hover:flex w-full h-full items-end pl-2 pb-2 md:pl-3 md:pb-2">
                                    <FontAwesomeIcon className="text-amber-200 text-2xl mb-1" icon={faMapPin} />
                                    <h1 className="text-xl md:text-2xl lg:text-xl ml-2 whitespace-nowrap">{title}</h1>
                                    <h2 className="truncate md:text-lg lg:text-base">{`, ${location}`}</h2>
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>
                )
                )}
            </div>
        </div>
        <EachDestinationUI />
        <BookingUI />
    </>
    )
}

export default DestinationContent