import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { useGlobalContext } from '../../context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPen, faPowerOff } from "@fortawesome/free-solid-svg-icons"

const AccountUIComponent = () => {
  const [localUser, setLocalUser] = useState({})
  const {setIsLoading, user} = useGlobalContext()
  const controller = new AbortController()

    useEffect(() => {
      const userFetch = async () => {
      setIsLoading(true)
      try {
        const {data} = await axios.get(`http://localhost:5000/api/v1/users/${user.userId}`, {signal: controller.signal})
        setLocalUser(data)
        setIsLoading(false)
      } catch (err) {
        console.log(err)
        setIsLoading(false)
      }
    }
    if (user){
    userFetch()
  }
    return ()=> controller.abort()
    }, [user])

  return (
    <div className="w-full h-fit bg-[#423F3F] grid grid-cols-5 grid-rows-1 gap-2 justify-center items-center p-4 mt-36 md:mt-44 lg:mt-40 mb-16 md:pb-12 lg:mb-12">
      <h1 className='text-white col-span-2 break-words'>{localUser.firstname}, {localUser.lastname}</h1>
      <h1 className='text-white break-all col-span-2'>{localUser.email}</h1>
      <button className='bg-amber-200 h-full m-2'>
        <FontAwesomeIcon className="text-2xl" icon={faUserPen} />
        <p>EDIT</p>
      </button>
      <button>
        <FontAwesomeIcon className="text-2xl" icon={faPowerOff} />
      </button>
    </div>
  )
}

export default AccountUIComponent