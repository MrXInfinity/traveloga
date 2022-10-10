import axios from "axios"
import React, {useState, useEffect} from 'react'
import EachOfferSelection from './EachOfferSelection'
import BookingUI from '../../components/BookingUI/BookingUI'

const OfferSelection = () => {

  const [info, setInfo] = useState([])
  const controller = new AbortController()

  useEffect(()=> {
    const dataFetch = async () => {
    try {
      const {data} = await axios.get(`http://localhost:5000/api/v1/destinations?limitedOffers=true`, {signal: controller.signal})
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
    <>
      <section className="flex flex-col justify-center text-center lg:text-left bg-white font-['Spinnaker'] ">
        <h1 className="text-2xl xl:text-3xl w-5/6 mx-auto mb-2">OFFERS</h1>
        <div className="w-10/12 h-1 bg-black mx-auto hidden lg:block mb-8 xl:mb-12" />
          <div className='grid grid-cols-1 gap-8 xl:gap-12 w-10/12 mx-auto last:mb-8 lg:last:mb-20'>
          {info.map((eachInfo)=>(
            <EachOfferSelection key={eachInfo._id} { ...eachInfo}/>
          ))}
          </div>
      </section>
        <BookingUI />
    </>
    )
  }
  return (
    <div>
      No offers...
    </div>
  )
}

export default OfferSelection