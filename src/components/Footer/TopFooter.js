import axios from "axios"
import React from 'react'
import { useForm } from 'react-hook-form'
import { useGlobalContext } from "../../context"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"

const TopFooter = () => {
  const {setIsLoading, setIsSuccessful, setIsFailed, setTransitionOpen} = useGlobalContext()
  const {register, handleSubmit} = useForm({
    email: ""
  })
  
  const formSubmit = async (formData) => {
    setIsLoading(true)
    setTransitionOpen(true)
    try {
      const {data} = await axios.post(
        "https://traveloga-api.onrender.com/api/v1/subscription", 
        formData,
        { headers: { 'Content-Type': 'application/json' }})
        setIsLoading(false)
        setIsSuccessful(true)
    } catch (err) {
      setIsLoading(false)
      setIsFailed(true)
    }
  }

  return (
    <section className='bg-[#34abbb] py-6 md:py-12 xl:py-16 text-white '>
      <div className="flex flex-col w-4/5 sm:3/4 lg:w-3/4 mx-auto text-center">
        <p className='md:text-lg lg:text-xl '>TRAVEL. As much as you can. As far as you can. As long as you can. <br className="hidden lg:block"/>Life's not meant to be lived in one place.</p>
        <h1 className='md:text-lg lg:text-xl mt-2 lg:mt-4'>Martin Moodie</h1>
        <p className='text-xs  mt-4 lg:mt-6'>Subscribe now to be aware of our future promos and possible changes to our services</p>
        <form className='flex w-full lg:w-3/4 md:mx-auto bg-white text-black px-2 md:px-6 py-1 md:py-2 justify-between items-center mt-4' onSubmit={handleSubmit(formSubmit)}>
          <input className='bg-transparent py-0 md:py-0 text-sm md:text-base w-3/4 lg:w-4/5 lg:mr-4' type="email" {...register("email")}/>
          <button type="submit" className='flex items-center py-2 md:py-1 px-4 md:px-6 bg-amber-200 hover:text-white hover:bg-amber-300 transition-colors duration-300 ease-in-out'>
            <h1 className='hidden sm:block'>SUBMIT</h1>
            <FontAwesomeIcon className="text-lg sm:hidden" icon={faPaperPlane} />
          </button>
        </form>
      </div>
    </section>
  )
}

export default TopFooter