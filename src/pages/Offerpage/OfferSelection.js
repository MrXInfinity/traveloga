import axios from "axios"
import React, {useState, useEffect} from 'react'
import EachOfferSelection from './EachOfferSelection'
import { useGlobalContext } from "../../context"

const OfferSelection = () => {
  const {setTransitionOpen, setIsLoading} = useGlobalContext()
  const [info, setInfo] = useState([])
  const controller = new AbortController()

  useEffect(()=> {
    const dataFetch = async () => {
      setTransitionOpen(true)
      setIsLoading(true)
    try {
      const {data} = await axios.get(`https://traveloga-api.onrender.com/api/v1/destinations?limitedOffers=true`, {signal: controller.signal})
      setInfo(data)
      setIsLoading(false)
      setTransitionOpen(false)
    } catch (err) {
      setIsLoading(false)
      setTransitionOpen(false)
      if(axios.isCancel(err))return console.log("fetch cancelled!")
      alert(err.response.data.msg)
    }
  }
    dataFetch()
    return () => controller.abort()
  }, [])


  if (info.length > 0) {
    return (
      <section className="flex flex-col justify-center ">
        <h1 className="text-2xl w-5/6  mx-auto mb-2 text-center lg:text-left">OFFERS</h1>
        <div className="w-10/12 md:w-11/12 lg:w-5/6 h-1 bg-black mx-auto hidden md:block mb-8" />
          <div className='grid grid-cols-1 gap-8 xl:gap-12 w-10/12 md:w-11/12 lg:w-10/12 mx-auto last:mb-8 lg:last:mb-20'>
          {info.map((eachInfo)=>(
            <EachOfferSelection key={eachInfo._id} { ...eachInfo}/>
          ))}
          </div>
      </section>
    )
  }
  return (
    <div className="w-5/6 mx-auto bg-black/20 text-center text-2xl text-white py-4 mb-8 lg:mb-20 ">
      No offers...
    </div>
  )
}

export default OfferSelection