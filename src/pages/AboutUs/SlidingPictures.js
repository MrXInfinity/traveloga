import React, {useState, useRef, useEffect} from 'react'

const SlidingPictures = () => {

    const [picIndex, setPicIndex] = useState(0)
    const slideIndex = useRef(null)
    const [widthDefault, setWidthDefault] = useState(320)
    const aboutUsPictures = [
    ["images/slidepic1.avif"],
    ["images/slidepic2.avif"],
    ["images/slidepic3.avif"],
    ["images/slidepic4.avif"],
    ["images/slidepic5.avif"],
    ["images/slidepic6.avif"],
    ["images/slidepic7.avif"],
    ["images/slidepic8.avif"],
    ["images/slidepic9.avif"] 
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
      <h1 className='text-center text-xl md:text-2xl font-["Rubik"]'>From our Customers:</h1>
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
