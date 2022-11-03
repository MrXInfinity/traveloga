import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser, faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import Reviews from "../../reviews.json"

const Testimonials = () => {
  const [reviewIndex, setReviewIndex] = useState(0)
  const {message, name, picture} = Reviews[reviewIndex]

  const indexChecker = (num) => {
    if(num > Reviews.length - 1) {
      return Reviews.length - 1
    }
    if (num < 0) {
      return 0
    }
    else return num
  }

  const arrowClick = (num) => {
    setReviewIndex((prev) => {
      let newNumber = prev + num
      return indexChecker(newNumber)
    })
  }

  return (
    <div className='flex justify-center md:h-[432px] lg:h-[568px] bg-cover bg-no-repeat md:!bg-none md:mb-24' style={{backgroundImage: `url("/images/testimonial.avif")`}}>
      <div className="flex md:justify-center h-[650px] md:h-[120px] lg:h-[220px] md:w-full lg:max-w-[1290px] md:bg-black/[0.80] md:pt-8 lg:pt-12 md:px-14 lg:px-12 gap-8 lg:gap-12 ">
        <div className="flex flex-col text-white h-fit max-w-sm md:max-w-lg md:w-full p-8 md:p-0 bg-black/[0.80] md:bg-transparent md:justify-start place-self-center md:place-self-start">
          <h1 className='font-["Rubik"] md:text-lg text-center lg:text-left mb-2 lg:mb-7'>TESTIMONIALS</h1>
          <h2 className='text-xl md:text-2xl lg:text-4xl text-center lg:text-left mb-4 md:mb-12 lg:mb-16 md:whitespace-nowrap lg:whitespace-normal'>What People Say About Our Services</h2>
          <p className=' text-justify text-sm lg:text-base md:text-black mb-6 lg:mb-8 lg:h-[100px]'>{message}</p>
          <div className="flex justify-center md:justify-start items-center mb-6 lg:mb-10">
            {picture === "" 
            ? <FontAwesomeIcon className="text-4xl lg:text-7xl md:text-black" icon={faCircleUser} /> 
            : <img className="h-[48px] lg:h-[75px] w-[48px] lg:w-[75px] rounded-full object-cover object-center" src={picture} alt="" />}
            <h1 className=' lg:text-2xl ml-2 md:text-black'>{name}</h1>
          </div>
          <div className="flex justify-center md:justify-start lg:mb-6 xl:mb-12">
            {[[faArrowLeft, -1], [faArrowRight, 1]].map(([icon, num], index) => (
              <FontAwesomeIcon key={index} className={` ${reviewIndex === 0 ? "first:text-amber-200 last:bg-amber-200 last:hover:bg-amber-300 last:hover:border-amber-300" : reviewIndex === Reviews.length - 1 ? "last:text-amber-200 first:bg-amber-200 first:hover:bg-amber-300 first:hover:border-amber-300": "bg-amber-200 hover:bg-amber-300 hover:border-amber-300"} text-2xl lg:text-4xl px-4 py-3 rounded-full first:mr-8 border-4 border-amber-200 text-white transition-all hover:duration-300 duration-500 ease-in-out`} icon={icon} onClick={()=>arrowClick(num)}/>
            ))}
          </div>
        </div>
        <img className='hidden md:block md:w-[300px] lg:w-[400px] md:h-[400px] lg:h-[520px] object-cover object-center' src="images/testimonial.avif" alt="Picture of a Beach" />
      </div>
    </div>
  )
}

export default Testimonials