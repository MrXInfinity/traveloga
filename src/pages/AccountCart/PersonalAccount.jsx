import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../context';
import AccountNavigation from './AccountNavigation';
import BookingsList from './BookingsList';
import TransitionWrapper from '../../components/TransitionWrapper';
import PaymentModal from '../../components/PaymentModal';

const PersonalAccount = () => {
  const {
    user,
    isPaymentOpen: { isOpen },
  } = useGlobalContext();
  const [bookingFilter, setBookingFilter] = useState('');
  const [listOfBookings, setListOfBookings] = useState(null);

  const setFilter = (val) => {
    setBookingFilter(val);
  };

  const alterBookingList = (data) => {
    setListOfBookings(data);
  };

  console.log(listOfBookings);
  if (!user)
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-8 ">
        <h1 className="text-2xl font-semibold text-red-600">
          You need to log in to access this page
        </h1>
        <Link
          to="/login"
          className="button_transition rounded-md bg-amber-200 px-4 py-3 text-white hover:bg-amber-300">
          Login
        </Link>
      </div>
    );

  return (
    <div className="relative">
      <div className="flex justify-center pt-[6.2rem] sm:pt-[5.5rem] lg:pt-[5.7rem]">
        <div className="flex w-full max-w-[100rem] flex-col">
          <AccountNavigation {...{ bookingFilter, setFilter }} />
          <BookingsList
            {...{ listOfBookings, alterBookingList, bookingFilter }}
          />
        </div>
      </div>
      <TransitionWrapper isOpen={isOpen}>
        {isOpen && <PaymentModal {...{ alterBookingList }} />}
      </TransitionWrapper>
    </div>
  );
};

export default PersonalAccount;
