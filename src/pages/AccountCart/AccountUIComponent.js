import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { useGlobalContext } from '../../context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from "@fortawesome/free-solid-svg-icons"

const AccountUIComponent = ({accountCartRef}) => {
  const [localUser, setLocalUser] = useState()
  const { user, userSignOut} = useGlobalContext()
  const authenticationToken = localStorage.getItem("authenticated")
  const controller = new AbortController()
  const signOffClick = () => {
    userSignOut()
  }

    useEffect(() => {
      const userFetch = async () => {
      try {
        const {data} = await axios.get(`https://traveloga-api.onrender.com/api/v1/users/${user.userId}`,
        { headers: { 'Authorization': `Bearer ${authenticationToken}` }}, 
        {signal: controller.signal}
        )
        setLocalUser(data)
      } catch (err) {
        console.log(err)
      }
    }
    if (user){
    userFetch()
  }
    return ()=> controller.abort()
    }, [user])

  return (
    <div className="text-sm md:text-base text-center w-full md:w-fit md:ml-4 h-fit bg-[#423F3F] grid grid-cols-5 md:flex md:gap-6 grid-flow-row gap-3 justify-center items-center p-4 mt-28 md:mb-12" ref={accountCartRef}>
      <h1 className='text-white col-span-2 break-words'>{localUser ? `${localUser.firstname}, ${localUser.lastname}` : `username`}</h1>
      <h1 className='text-white break-all col-span-2 text-justify'>{localUser ? localUser.email : `email`}</h1>
      <button className='bg-amber-200 h-full py-4 md:p-2 md:px-4 flex flex-col justify-center items-center hover:bg-amber-300 transition duration-300 ease-in-out' onClick={()=>signOffClick()}>
        <FontAwesomeIcon className="text-2xl" icon={faPowerOff} />
      </button>
    </div>
  )
}

export default AccountUIComponent