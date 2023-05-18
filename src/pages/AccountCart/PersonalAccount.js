import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../context';
import AccountUIComponent from './AccountUIComponent';
import BookingNavigation from './BookingNavigation';
import BookingsList from './BookingsList';

const PersonalAccount = () => {
  const { user } = useGlobalContext();
  const [bookingFilter, setBookingFilter] = useState('');
  const accountCartRef = useRef(null);

  if (!user)
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-8 ">
        <h1 className="text-2xl font-semibold text-red-600">
          YOu need to log in to access this page
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
      <div className="flex">
        <BookingNavigation
          {...{ bookingFilter, setBookingFilter, accountCartRef }}
        />
        <div className="flex w-full flex-col">
          <AccountUIComponent {...{ accountCartRef }} />
          <BookingsList {...{ bookingFilter }} />
        </div>
      </div>
    </>
  );
};

export default PersonalAccount;
