import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../context';
import AccountNavigation from './AccountNavigation';
import BookingsList from './BookingsList';

const PersonalAccount = () => {
  const { user } = useGlobalContext();
  const [bookingFilter, setBookingFilter] = useState('');

  if (!user)
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-8 ">
        <h1 className="text-2xl font-semibold text-red-600">
          You need to log in to access this page
        </h1>
        <Link
          to="/login"
          className="transition-color rounded-md bg-amber-200 px-4 py-3 text-white duration-200 ease-in-out hover:bg-amber-300">
          Login
        </Link>
      </div>
    );

  return (
    <>
      <div className="flex justify-center pt-[6.5rem]">
        <div className="flex w-full max-w-[100rem] flex-col">
          <AccountNavigation {...{ bookingFilter, setBookingFilter }} />
          <BookingsList {...{ bookingFilter }} />
        </div>
      </div>
    </>
  );
};

export default PersonalAccount;
