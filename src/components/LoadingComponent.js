import React, {Fragment} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { useGlobalContext } from '../context'

const LoadingComponent = () => {
    const {isLoading, setIsLoading} = useGlobalContext()
  return (
    <Transition show={isLoading} as={Fragment}>
    <Dialog onClose={() => setIsLoading(false)}>
      <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black/40 z-50"/>
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
                <Dialog.Panel className="flex py-6 px-8 bg-white w-fit items-center">
                  <FontAwesomeIcon className="motion-safe:animate-spin mr-4 text-3xl" icon={faSpinner} />
                  <Dialog.Title className="text-xl">Loading</Dialog.Title>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
    </Transition>
  )
}

export default LoadingComponent