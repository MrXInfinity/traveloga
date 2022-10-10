import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { useGlobalContext } from '../context'

const LoadingComponent = () => {
    const {isLoading} = useGlobalContext()
  return (
    <div className={`flex justify-center items-center bg-black/40 w-screen h-screen fixed top-0 z-50 ${isLoading ? `block` : 'hidden'}`}>
        <div className="flex py-6 px-8 bg-white w-fit items-center">
            <FontAwesomeIcon className="motion-safe:animate-spin mr-4 text-3xl" icon={faSpinner} />
            <h1 className="text-xl">Loading</h1>
        </div>
    </div>
  )
}

export default LoadingComponent