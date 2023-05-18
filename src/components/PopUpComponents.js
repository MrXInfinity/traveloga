import axios from 'axios';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faCashRegister } from '@fortawesome/free-solid-svg-icons';
import { useGlobalContext } from '../context.js';

const LoadingComponent = () => {
  return (
    <div className="flex w-fit items-center bg-white py-6 px-8">
      <FontAwesomeIcon
        className="mr-4 text-3xl motion-safe:animate-spin"
        icon={faSpinner}
      />
      <h1 className="text-xl">Loading</h1>
    </div>
  );
};

const ResultComponent = ({ setIsOpen, title, icon }) => {
  useEffect(() => {
    setTimeout(() => {
      setIsOpen(false);
    }, 2000);
  }, []);

  return (
    <div className="flex w-fit items-center bg-white py-6 px-8">
      <FontAwesomeIcon className=" mr-4 text-4xl lg:text-3xl" icon={icon} />
      <h1 className="text-2xl lg:text-xl">{title}</h1>
    </div>
  );
};

const SignInRequiredComponent = () => {
  const { closeModal } = useGlobalContext();

  return (
    <div className="grid w-3/4 grid-flow-row grid-cols-1 items-center gap-4 bg-white py-4 px-6 lg:w-fit lg:grid-cols-2 lg:py-6 lg:px-8">
      <h1 className="text-center text-xl lg:col-span-2">
        An Account is required to do the following task/s.
      </h1>
      <button
        className="bg-[#2B8E9B]/80 py-6 text-center text-white transition-colors ease-in-out hover:bg-[#2B8E9B] lg:p-4"
        onClick={() => closeModal()}>
        Keep Scrolling
      </button>
      <Link
        className="bg-amber-200 py-6 text-center  transition-colors ease-in-out hover:bg-amber-300 hover:text-white lg:p-4"
        to="/login"
        onClick={() => closeModal()}>
        LOG IN
      </Link>
    </div>
  );
};

const PaymentComponent = () => {
  const { authToken, isPaymentOpen, cancelPayment } = useGlobalContext();

  //   const changeStatus = async (status, id) => {
  //     try {
  //       const { data } = await axios.patch(
  //         `https://traveloga-api.onrender.com/api/v1/bookings/${id}`,
  //         { status: status },
  //         { headers: { Authorization: `Bearer ${localStorageValues}` } },
  //       );
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  return (
    <div className="flex w-3/4 flex-col items-center bg-white py-4 px-6 lg:w-fit lg:py-6 lg:px-8">
      <FontAwesomeIcon className="mb-4 text-4xl" icon={faCashRegister} />
      <h1 className='font-["Rubik"] text-xl'>Payment Confirmation</h1>
      <h2>Amount: {isPaymentOpen.value}</h2>
      <div className="mt-4 grid w-full grid-flow-row grid-cols-2 gap-2">
        <button
          className="bg-amber-200 py-2 transition-colors ease-in-out hover:bg-amber-300 hover:text-white"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            cancelPayment();
          }}>
          Cancel
        </button>
        <button className="bg-amber-200 py-2 transition-colors ease-in-out hover:bg-amber-300 hover:text-white">
          Pay
        </button>
      </div>
    </div>
  );
};

export {
  SignInRequiredComponent,
  ResultComponent,
  LoadingComponent,
  PaymentComponent,
};
