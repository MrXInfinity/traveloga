import axios from "axios"
import React from 'react'
import { useForm } from 'react-hook-form'
import LoadingComponent from "../LoadingComponent"
import { useGlobalContext } from "../../context"
import { SuccessfulComponent, FailedComponent } from "../ResultComponent"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAt, faPaperPlane } from "@fortawesome/free-solid-svg-icons"

const TopFooter = () => {
  const {setIsLoading, setIsSuccessful, setIsFailed} = useGlobalContext()
  const {register, handleSubmit} = useForm({
    email: ""
  })
  
  const formSubmit = async (formData) => {
    setIsLoading(true)
    try {
      const {data} = await axios.post(
        "http://localhost:5000/api/v1/subscription", 
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
    <>
        <section className='flex font-["Spinnaker"] bg-[#34abbb] py-12 xl:py-16 text-white '>
        <div className="flex flex-col w-4/5 lg:w-3/5 mx-auto text-center">
          <p className='text-xl lg:text-2xl '>TRAVEL. As much as you can. As far as you can. As long as you can. Life's not meant to be lived in one place.</p>
          <h1 className='text-xl lg:text-2xl mt-6 lg:mt-12'>Martin Moodie</h1>
          <p className='text-xs md:text-base lg:text-xl mt-6 lg:mt-12'>Subscribe now to be aware of our future promos and possible changes to our services</p>
          <form className='flex w-full bg-[#423F3F] p-3 rounded-2xl lg:rounded-3xl justify-between items-center mt-4 lg:mt-6' onSubmit={handleSubmit(formSubmit)}>
            <FontAwesomeIcon className="hidden lg:block text-3xl" icon={faAt} />
            <input className='bg-transparent w-3/4 lg:w-4/5 lg:mx-4' type="email" {...register("email")}/>
            <button type="submit" className='flex items-center py-3 lg:py-2 px-4 lg:px-4 bg-amber-200 rounded-xl text-[#423F3F] hover:text-white hover:bg-amber-300 transition-all duration-300 ease-in-out'>
              <h1 className='hidden lg:block mr-2'>SUBMIT</h1>
              <FontAwesomeIcon className="text-2xl" icon={faPaperPlane} />
            </button>
          </form>
        </div>
      </section>
      <LoadingComponent />
      <SuccessfulComponent/>
      <FailedComponent/>
    </>
  )
}

export default TopFooter