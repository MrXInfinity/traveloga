import axios from "axios"
import React, {useState, useEffect} from 'react'
import Selection from "./EachHomeSelection"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons"

const HomeSelection = ({showCase}) => {
    const [info, setInfo] = useState([])
    const [leftPosition, setLeftPosition] = useState(0)
    const controller = new AbortController();

    const indexChecker = (num) => {
        if (num > info.length - 1) return info.length - 1
        if (num < 0) return 0
        else return num
    }

    const arrowClick = (number) => {
        setLeftPosition((prev)=>{
            let newNumber = prev + number
            return indexChecker(newNumber)
        })
    }

    useEffect(()=>{
        const data = async () => {
        try {
            const {data} = await axios.get(`https://traveloga-api.onrender.com/api/v1/destinations?showCase=${showCase}`, {signal: controller.signal})
            setInfo(data.destinations)
        } catch (err) {
            console.log(err)
        }
    }
        data()
    return () => controller.abort()
    }, [])
    
    return (
    <>
        <div className="md:py-36 md:pl-32 pl-12 py-16 flex flex-col w-full">
            <div className="flex justify-between md:pr-32">
                <div className="flex flex-col">
                    <h1 className="md:text-lg lg:text-xl mb-1 md:mb-2 text-black/90">Where to Go:</h1>
                    <h1 className="font-['Rubik'] text-xl md:text-2xl lg:text-3xl md:mb-4 mb-1">{`${showCase.toUpperCase()} DESTINATIONS`}</h1>
                </div>
                <div className=" hidden lg:flex lg:text-5xl">
                    {[[faArrowLeft, -1], [faArrowRight, 1]].map(([icon, number], index)=>(
                        <FontAwesomeIcon key={index} className={`${leftPosition === 0 ? "first:bg-white first:text-amber-200 last:hover:border-amber-300 last:hover:bg-amber-300 ": leftPosition === info.length-1 ? "last:bg-white last:text-amber-200 first:hover:border-amber-300 first:hover:bg-amber-300": "hover:border-amber-300 hover:bg-amber-300" } border-4 border-amber-200 text-white bg-amber-200 rounded-full lg:px-2 lg:py-1 first:mr-6 transition-all hover:duration-300 duration-500 ease-in-out`} icon={icon} onClick={()=>arrowClick(number)} />
                    ))}
                    
                </div>
            </div>
            <Selection {...{info, leftPosition}} />
        </div>
    </>
    )
}


export default HomeSelection