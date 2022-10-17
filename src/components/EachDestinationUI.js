import axios from 'axios'
import React, {useState, useEffect, Fragment, useRef} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapPin, faXmark, faPlaneDeparture, faBookAtlas } from "@fortawesome/free-solid-svg-icons"
import { useGlobalContext } from '../context'

const EachDestinationUI = () => {
    const [destinationInfo, setDestinationInfo] = useState(null)
    const bookingButton = useRef(null)
    const {destinationUI: {id, open}, destinationToggleUI, bookingToggleUI} = useGlobalContext()
    const controller = new AbortController();

    useEffect(()=> {
        const fetchEachDestinationInfo = async () => {
        try {
            const {data} = await axios.get(`http://localhost:5000/api/v1/destinations/${id}`, {signal: controller.signal})
            setDestinationInfo(data.destination)
        } catch (err) {
            console.log(err)
        }
    }
        if (id && open) {
            fetchEachDestinationInfo()
        }
        return () => controller.abort()
    }, [id, open])

    if (destinationInfo) {
        const {title, location, description, image, international} = destinationInfo
        return (
        <Transition show={open} as={Fragment}>
            <Dialog onClose={()=>destinationToggleUI()}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-black/80 z-40" />
                </Transition.Child>
                <div className="fixed inset-0 z-50">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95">
                <Dialog.Panel className=" flex flex-col lg:flex-row h-full lg:h-[90vh] lg:w-11/12 w-full max-w-[1000px] justify-between !bg-none lg:bg-cover lg:bg-no-repeat lg:bg-center lg:relative" style={{backgroundImage: `url(${image})`}}>
                    <img className="h-1/2 lg:h-full w-full object-cover object-center" src={image} alt={title}/>
                    <div className="flex flex-col h-1/2 lg:h-auto w-full lg:w-1/3 justify-between bg-white lg:absolute lg:inset-y-0 lg:right-0">
                        <div className="flex flex-col pb-4 w-5/6 mx-auto lg:h-full">
                            <FontAwesomeIcon className="text-4xl right-0 absolute pr-4 pt-2" icon={faXmark} onClick={()=>destinationToggleUI()}/>
                            <h1 className='text-center text-2xl w-3/4 mx-auto lg:mt-4 whitespace-nowrap pt-4'>{title}</h1>
                            <div className="flex justify-center items-center">
                                <FontAwesomeIcon className='mr-2 text-sm' icon={faMapPin} />
                                <h2 className='text-sm text-center'>{location}</h2>
                            </div>
                            <p className='text-center mt-4 text-sm'>{description}</p>
                            <div className="flex flex-col mt-4 mb-4">
                                <div className="flex items-center mb-2">
                                    <h1 className=''>DOMESTIC</h1>
                                    <FontAwesomeIcon className=" ml-2" icon={faPlaneDeparture} />
                                </div>
                            <div className='grid grid-cols-3 lg:grid-cols-2 gap-4'>
                            {["LUZON", "VISAYAS", "MINDANAO"].map((eachRegion, index)=>(
                                <span className=' text-[#2B8E9B] py-1 rounded-lg text-center drop-shadow-lg border-1 border-black border-solid text-sm' key={index}>{eachRegion}</span>
                            ))}
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex mb-2">
                                <h1>INTERNATIONAL</h1>
                                <FontAwesomeIcon className="ml-2" icon={faPlaneDeparture} />
                            </div>
                            <div className="grid grid-cols-3 lg:grid-cols-2 gap-4">
                            {Object.keys(international).map((eachRegion, index)=>(
                                <span className='text-white bg-[#2B8E9B] py-1 rounded-lg text-center text-sm' key={index}>{eachRegion === "southeastAsia" ? `S.E. ASIA` : eachRegion.toLocaleUpperCase()}</span>
                            ))}
                            </div>
                        </div>
                    </div>
                    <button className="flex w-full lg:w-fit mx-auto lg:mb-6 py-4 lg:py-2 lg:p-3 lg:rounded-2xl bg-amber-200 text-black hover:bg-amber-300 hover:text-white justify-center items-center" onClick={()=>bookingToggleUI(id)} ref={bookingButton}>
                        <FontAwesomeIcon className="text-4xl lg:text-3xl mr-4" icon={faBookAtlas} />
                        <h1 className='text-2xl lg:text-xl'>BOOK NOW!</h1>
                    </button>
                </div>
            </Dialog.Panel>
        </Transition.Child>
        </div>
        </div>
        </Dialog>
    </Transition>
    )}
    }
    


export default EachDestinationUI