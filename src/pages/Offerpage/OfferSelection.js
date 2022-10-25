import axios from "axios"
import React, {useState, useEffect} from 'react'
import EachOfferSelection from './EachOfferSelection'

const OfferSelection = () => {

  const [info, setInfo] = useState([])
  const controller = new AbortController()

  useEffect(()=> {
    const dataFetch = async () => {
    try {
      const {data} = await axios.get(`https://traveloga-api.onrender.com/api/v1/destinations?limitedOffers=true`, {signal: controller.signal})
      setInfo(data)
    } catch (err) {
      if(axios.isCancel(err)){
        console.log("fetch cancelled!")
      }
      else {
        console.log(err)
      }
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
    <div>
      No offers...
    </div>
  )
}

export default OfferSelection