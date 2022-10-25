import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useGlobalContext } from "../../context"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompass } from "@fortawesome/free-solid-svg-icons"
import { faPinterestP, faInstagram, faTwitter, faFacebookF } from "@fortawesome/free-brands-svg-icons"

const BottomFooter = () => {
    const {setIsLoading, setIsSuccessful, setIsFailed} = useGlobalContext()
    const {register, handleSubmit} = useForm({
        name: "",
        subject: "",
        email: "",
        message: ""
    })

    const formSubmit = async (formData) => {
    setIsLoading(true)
    try {
        const {data} = await axios.post(
        "https://traveloga-api.onrender.com/api/v1/message", 
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
    <section className='flex flex-col md:flex-row-reverse w-full bg-[#2B8E9B] py-8 px-14 lg:px-14 lg:py-8 items-center md:items-start'>
        <form className='flex flex-col w-full lg:w-2/3 md:pl-4 xl:pl-8 lg:md-0' onSubmit={handleSubmit(formSubmit)}>
            <div className="grid grid-rows-4 lg:grid-rows-3 grid-flow-col gap-4 h-full mb-4 ">
                {[["text", "Name", "name"], ["email", "Email", "email"], ["text", "Subject", "subject"], ["paragraph", "Message", "message"]].map(([type, placeholder, inputName], index)=>(
                <input className='last:lg:row-span-3 bg-transparent border-2 border-white hover:border-amber-200 p-4 placeholder:italic placeholder:text-slate-400 transition duration-300 ease-in-out' {...register(inputName)} type={type} placeholder={placeholder} key={index} />
                ))}
            </div>
            <button className='text-amber-200 hover:text-amber-300 translation-all duration-300 ease-in-out md:text-right' type="submit">Submit</button>
        </form>
        <div className="flex flex-col lg:w-1/3 mt-6 md:mt-0 items-center md:items-start">
            <div className="flex lg:items-center">
                <FontAwesomeIcon className='text-white text-2xl md:text-3xl mt-1 mr-2' icon={faCompass} />
                <div className="text-white flex-col w-40 md:w-fit">
                    <h1 className='-mb-1'>TRAVELOGA</h1>
                    <h1 className='text-xs'>Experience Philippines, Love Philippines</h1>
                </div>
            </div>
            <div className="flex flex-col text-center md:text-left mt-6 md:mt-3">
                {["500 Terry Francois Street", "San Francisco, CA 94158", "info@mysite.com", "Tel: 123-456-7890", "Fax: 123-456-7890", "Copymark: TRAVELOGA 2022. by: Johann Isaiah Mendoza"].map((text, index)=>
                <h1 className="text-sm lg:text-base text-[#004852]" key={index}>{text}</h1>
                )}
            </div>
            <div className="flex text-3xl text-white mt-6 lg:mt-3 mx-auto md:mx-0">
                {[
                [faPinterestP, "https://www.pinterest.ph/"], 
                [faInstagram, "https://www.instagram.com/"], 
                [faTwitter, "https://twitter.com/"], 
                [faFacebookF, "https://www.facebook.com/"]]
                .map(([icon, link], index)=>(
                <a className='first:ml-0 ml-4 hover:text-amber-200 transition duration-300 ease-in-out' href={link} key={index}><FontAwesomeIcon icon={icon} /></a>
                ))}
            </div>
        </div>
    </section>
  )
}

export default BottomFooter