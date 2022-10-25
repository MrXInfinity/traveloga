import React, {useState, useRef, useEffect} from 'react'

const SlidingPictures = () => {

    const [picIndex, setPicIndex] = useState(0)
    const slideIndex = useRef(null)
    const [widthDefault, setWidthDefault] = useState(320)
    const aboutUsPictures = [
      ["https://images.pexels.com/photos/11504424/pexels-photo-11504424.jpeg?cs=srgb&dl=pexels-levi-vaagenes-11504424.jpg&fm=jpg", "Camiguin Island"],
      ["https://images.pexels.com/photos/2463675/pexels-photo-2463675.jpeg?cs=srgb&dl=pexels-gerald-jake-abangan-2463675.jpg&fm=jpg", "Central Visayas"],
      ["https://images.pexels.com/photos/3047993/pexels-photo-3047993.jpeg?cs=srgb&dl=pexels-palu-malerba-3047993.jpg&fm=jpg", "San Vicente, MIMAROPA"],
      ["https://images.pexels.com/photos/2407265/pexels-photo-2407265.jpeg?cs=srgb&dl=pexels-crizaldy-diverson-2407265.jpg&fm=jpg", "Alamada, SOCCSKSARGEN"],
      ["https://images.pexels.com/photos/2623690/pexels-photo-2623690.jpeg?cs=srgb&dl=pexels-daniel-lazarov-2623690.jpg&fm=jpg", "Badian, Central Visayas"],
      ["https://images.pexels.com/photos/2762909/pexels-photo-2762909.jpeg?cs=srgb&dl=pexels-daniel-lazarov-2762909.jpg&fm=jpg", "El Nido, MIMAROPA"],
      ["https://images.pexels.com/photos/5240166/pexels-photo-5240166.jpeg?cs=srgb&dl=pexels-jondave-libiran-5240166.jpg&fm=jpg", "Chocolate Hills in Bohol"],
      ["https://images.pexels.com/photos/3047990/pexels-photo-3047990.jpeg?cs=srgb&dl=pexels-palu-malerba-3047990.jpg&fm=jpg", "El Nido, MIMAROPA"],
      ["https://images.pexels.com/photos/13542485/pexels-photo-13542485.jpeg?cs=srgb&dl=pexels-christopher-camitan-13542485.jpg&fm=jpg", "Maasin City, Eastern Visayas"]
    ]

  const resetTimeout = () => {
  if (slideIndex.current) {
    clearTimeout(slideIndex.current)
  }
  }

  useEffect(()=> {
    resetTimeout()
    slideIndex.current = setTimeout(()=>
    setPicIndex((prev) => prev === aboutUsPictures.length - 1 ? 0 : prev + 1), 5000)

    return () => resetTimeout()
  }, [picIndex])

  return (
    <div className='bg-white flex flex-col overflow-hidden w-full h-fit py-20 lg:py-24'>
      <h1 className='text-center text-2xl font-["Rubik"]'>From our Customers:</h1>
      <div className={`flex flex-nowrap ml-52 lg:ml-96 transition-transform duration-1000 ease-in-out h-[650px] items-center`} style={{ transform: `translate3d(${-picIndex * 11.11}%, 0, 0)`, width: `${widthDefault * (aboutUsPictures.length)}px` }}>
        {aboutUsPictures.map(([img, caption], index) => (
          <div className={`flex h-5/6 w-80 ${index % 2 === 1 && `mt-auto`}`} key={index}>
            <img className="object-cover px-2 h-full w-full" src={img}  alt={caption} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default SlidingPictures
