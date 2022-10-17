import React, {useEffect, useState, Fragment} from 'react'
import { Link } from 'react-router-dom'
import { Dialog, Transition } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import { useGlobalContext } from '../context'

const TransitionComponent = ({children, isOpen, setIsOpen}) => {
    return (
        <Transition show={isOpen} as={Fragment}>
        <Dialog onClose={() => setIsOpen(false)}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0">
                    <div className="flex justify-center items-center bg-black/40 inset-0 fixed top-0 z-50" />
            </Transition.Child>
            <div className="fixed inset-0">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95">
                        <Dialog.Panel className="flex py-6 px-8 bg-white w-fit items-center transition-all ease-out inset-0 duration-300">
                            {children}
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </Dialog>
    </Transition>
    )
}

const SuccessfulComponent = ({message}) => {
    const {isSuccessful, setIsSuccessful, bookingUI, setBookingUI} = useGlobalContext()
    const [localMessage, setLocalMessage] = useState("")

    useEffect(()=> {
        /*setTimeout(()=> {
            setIsSuccessful(false)
        }, 3000)*/
        if (isSuccessful){
        setTimeout(()=> {
            setBookingUI({
            ...bookingUI, 
            open: false
        })
        }, 1000)}
    })

    useEffect(()=> {
        setLocalMessage(message)
    }, [message])

    return (
        <TransitionComponent isOpen={isSuccessful} setIsOpen={setIsSuccessful}>
            <>
                <FontAwesomeIcon className="mr-4 text-3xl" icon={faCircleCheck} />
                <h1 className="text-xl">{localMessage} Successful</h1>
            </>
        </TransitionComponent>
    )
}

const FailedComponent = ({message}) => {
    const {isFailed, setIsFailed, bookingUI, setBookingUI} = useGlobalContext()

    useEffect(()=> {
        setTimeout(()=> {
            setIsFailed(false)
        }, 3000)
        if (isFailed){
        setTimeout(()=> {
            setBookingUI({
            ...bookingUI, 
            open: false
        })
        }, 1000)}
        
    })

    return (
    <div className={`flex justify-center items-center bg-black/40 w-screen h-screen fixed top-0 z-50 transition-all ease-out inset-0 duration-300 ${isFailed ? `block` : 'hidden'}`}>
        <div className="flex py-6 px-8 bg-white w-fit items-center transition-all ease-out inset-0 duration-300">
            <FontAwesomeIcon className=" mr-4 text-3xl" icon={faCircleXmark} />
            <h1 className="text-xl">{message} Failed</h1>
        </div>
    </div>
    )
}

const SignInRequiredComponent = () => {
    const {isSignInRequired, setIsSignInRequired, bookingToggleUI} = useGlobalContext()

    const buttonClick = () => {
        setIsSignInRequired(false)
        bookingToggleUI()
    }

    return (
    <Transition show={isSignInRequired} as={Fragment}>
        <Dialog onClose={() => setIsSignInRequired(false)}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0">
                    <div className=" bg-black/40 inset-0 fixed top-0 z-50" />
            </Transition.Child>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="flex py-6 px-8 bg-white w-fit items-center transition-all ease-out inset-0 duration-300">
                    <h1 className="text-xl col-span-2">An Account is required for you to book flights.</h1>
                    <button className='text-center bg-[#2B8E9B]/80 hover:bg-[#2B8E9B] p-4 text-white transition-all duration-150 ease-in-out' onClick={()=>buttonClick()}>Keep Scrolling</button>
                    <Link className='text-center p-4 bg-amber-200 hover:bg-amber-300 hover:text-white transition-all duration-150 ease-in-out' to="/login" onClick={()=>buttonClick()}>LOG IN</Link>
                </Dialog.Panel>
            </Transition.Child>
        </Dialog>
    </Transition> 
    )
}

export {SuccessfulComponent, FailedComponent, SignInRequiredComponent}

/*<Transition show={isSuccessful} as={Fragment}>
        <Dialog onClose={() => setIsSuccessful(false)}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0">
                    <div className="flex justify-center items-center bg-black/40 inset-0 fixed top-0 z-50" />
            </Transition.Child>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="flex py-6 px-8 bg-white w-fit items-center transition-all ease-out inset-0 duration-300">
                    <FontAwesomeIcon className="mr-4 text-3xl" icon={faCircleCheck} />
                    <h1 className="text-xl">{localMessage} Successful</h1>
                </Dialog.Panel>
            </Transition.Child>
        </Dialog>
    </Transition> */