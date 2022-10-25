import React, {Fragment} from 'react'
import { Transition, Dialog } from '@headlessui/react'
import { useGlobalContext } from '../context'
import BookingUI from './BookingUI/BookingUI'
import EachDestinationUI from './EachDestinationUI'
import { SignInRequiredComponent, LoadingComponent, ResultComponent } from './PopUpComponents'
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons"

const TransitionWrapper = ({children}) => {

  return (
    <div className="flex fixed inset-0 z-50 items-center justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200" 
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
                <Dialog.Panel className=" flex ">
                  {children}
                </Dialog.Panel>
            </Transition.Child>
          </div>
  )
}

const TransitionComponent = () => {

 const {isLoading, setIsLoading, isSuccessful, setIsSuccessful, isFailed, setIsFailed, bookingUI, setBookingUI, destinationUI, setDestinationUI, isSignInRequired, transitionOpen, setTransitionOpen} = useGlobalContext()
    
 const transitionClose = () => {
  setTransitionOpen(false)
      if (destinationUI.open) setDestinationUI({id: "", open: false})
      if (bookingUI.open) setBookingUI({id: "", open: false})
      if (isLoading) setIsLoading(false)
    }
  return (
    <Transition show={transitionOpen} as={Fragment}>
      <Dialog onClose={()=>transitionClose(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-[400ms]"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className=" fixed inset-0 bg-black/80 z-40" />
        </Transition.Child>
        {destinationUI.open && (
          <TransitionWrapper>
              <EachDestinationUI />
          </TransitionWrapper>
        )}
        {bookingUI.open && (
          <TransitionWrapper>
              <BookingUI />
          </TransitionWrapper>
        )}
        {isSignInRequired && (
          <TransitionWrapper>
              <SignInRequiredComponent />
          </TransitionWrapper>
        )}
        {isLoading && (
          <TransitionWrapper>
              <LoadingComponent />
          </TransitionWrapper>
        )}
        {isSuccessful && (
          <TransitionWrapper>
              <ResultComponent setIsOpen={setIsSuccessful} title="Successful" icon={faCircleCheck}/>
          </TransitionWrapper>
        )}
        {isFailed && (
          <TransitionWrapper>
              <ResultComponent setIsOpen={setIsFailed} title="Failed" icon={faCircleXmark}/>
          </TransitionWrapper>
        )}
      </Dialog>
    </Transition>
  )
}

export default TransitionComponent