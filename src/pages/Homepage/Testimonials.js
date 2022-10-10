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
    <div className='flex h-[660px] w-full bg-[url("https://images.unsplash.com/photo-1580646556945-cbdd9ae320fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80")] bg-cover lg:bg-none lg:bg-white '>
      <div className="flex justify-between lg:h-1/3 lg:max-w-[1290px] mx-auto lg:bg-black/[0.80] lg:pt-12 lg:px-12">
        <div className="flex flex-col font-['Spinnaker'] text-white h-fit lg:h-[525px] max-w-[370px]  md:max-w-none md:w-2/3 lg:w-1/2 mt-8 md:mt-12 lg:mt-0 p-8 lg:p-0 mx-auto bg-black/[0.80] lg:bg-transparent justify-between lg:justify-start">
          <h1 className='text-base lg:text-lg font-["Rubik"] text-center lg:text-left mb-4 lg:mb-8'>TESTIMONIALS</h1>
          <h2 className='text-2xl lg:text-4xl  text-center lg:text-left mb-4 lg:mb-16'>What People Say About Our Services</h2>
          <p className='text-sm lg:text-base text-center lg:text-left lg:text-black mb-8 lg:h-[100px]'>{message}</p>
          <div className="flex justify-center lg:justify-start items-center mb-4 lg:mb-10">
            {picture === "" 
            ? <FontAwesomeIcon className="text-4xl lg:text-7xl lg:text-black" icon={faCircleUser} /> 
            : <img className="h-[48px] lg:h-[75px] w-[48px] lg:w-[75px] rounded-full" src={picture} alt="" />}
            <h1 className=' lg:text-2xl ml-2 lg:text-black'>{name}</h1>
          </div>
          <div className="flex justify-center lg:justify-start lg:mb-6 xl:mb-12">
            {[[faArrowLeft, -1], [faArrowRight, 1]].map(([icon, num], index) => (
              <FontAwesomeIcon key={index} className={` ${reviewIndex === 0 ? "first:text-amber-200 last:bg-amber-200 last:hover:bg-amber-300 last:hover:border-amber-300" : reviewIndex === Reviews.length - 1 ? "last:text-amber-200 first:bg-amber-200 first:hover:bg-amber-300 first:hover:border-amber-300": "bg-amber-200 hover:bg-amber-300 hover:border-amber-300"} text-4xl px-4 py-3 rounded-full first:mr-8 border-4 border-amber-200 text-white transition-all hover:duration-300 duration-500 ease-in-out`} icon={icon} onClick={()=>arrowClick(num)}/>
            ))}
          </div>
        </div>
        <img className='hidden lg:block lg:h-[520px] lg:[400px] xl:w-[480px]' src="https://images.unsplash.com/photo-1580646556945-cbdd9ae320fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" alt="Picture of a Beach" />
      </div>
    </div>
  )
}

export default Testimonials