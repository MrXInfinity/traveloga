import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { useGlobalContext } from '../context'

const LoadingComponent = () => {
  
  return (
    <div className="flex py-6 px-8 bg-white w-fit items-center">
        <FontAwesomeIcon className="motion-safe:animate-spin mr-4 text-3xl" icon={faSpinner} />
        <h1 className="text-xl">Loading</h1>
    </div>
  )
}

const ResultComponent = ({ setIsOpen, title, icon}) => {
    const {setTransitionOpen} = useGlobalContext()

    useEffect(()=> {
        setTimeout(()=> {
            setIsOpen(false)
            setTransitionOpen(false)
        }, 2000)
    }, [])

    return (
        <div className="flex py-6 px-8 bg-white w-fit items-center transition-all ease-out inset-0 duration-300">
            <FontAwesomeIcon className=" mr-4 text-4xl lg:text-3xl" icon={icon} />
            <h1 className="text-2xl lg:text-xl">{title}</h1>
        </div>
    )
}

const SignInRequiredComponent = () => {
    const {setIsSignInRequired, setTransitionOpen} = useGlobalContext()

    const buttonClick = () => {
        setIsSignInRequired(false)
        setTransitionOpen(false)
    }

    return (
    <div className="grid grid-cols-1 lg:grid-cols-2 grid-flow-row gap-4 py-4 lg:py-6 px-6 lg:px-8 bg-white w-3/4 lg:w-fit items-center transition-all ease-out inset-0 duration-300">
        <h1 className="text-xl lg:col-span-2 text-center">An Account is required to do the following task/s.</h1>
        <button className='text-center bg-[#2B8E9B]/80 hover:bg-[#2B8E9B] py-6 lg:p-4 text-white transition-all duration-150 ease-in-out' onClick={()=>buttonClick()}>Keep Scrolling</button>
        <Link className='text-center py-6 lg:p-4  bg-amber-200 hover:bg-amber-300 hover:text-white transition-all duration-150 ease-in-out' to="/login" onClick={()=>buttonClick()}>LOG IN</Link>
    </div>
    )
}

export { SignInRequiredComponent, ResultComponent, LoadingComponent}