import axios from 'axios';
import React, { useState, useEffect } from 'react';
import EachBooking from './EachBooking';
import { useGlobalContext } from '../../context';

const BookingsList = ({ bookingFilter }) => {
  const [listOfBookings, setListOfBookings] = useState(null);
  const controller = new AbortController();
  const { authToken } = useGlobalContext()
  const bookingListData = ['Cart', 'Booked', 'Cancelled', 'Refunded'];

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        'https://traveloga-api.onrender.com/api/v1/bookings',
        { headers: { Authorization: `Bearer ${authToken}` } },
        { signal: controller.signal },
      );
      setListOfBookings(data);
    } catch (err) {
      if (axios.isCancel(err)) return console.log('fetch cancelled!');
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
    return () => controller.abort();
  }, []);

  return (
    <>
      {!bookingFilter ? (
        bookingListData.map((title, index1) => (
          <div
            className="flex w-full flex-col gap-4 p-4 odd:bg-black/10 md:odd:bg-white md:even:bg-black/10"
            key={index1}>
            <h1 className="text-xl md:text-2xl">{title.toUpperCase()}</h1>
            <div className="grid grid-flow-row grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
              {listOfBookings &&
                listOfBookings
                  .filter((eachBooking) => eachBooking.status === title)
                  .map((eachBooking, index) => (
                    <EachBooking {...{ eachBooking, fetchData }} key={index} />
                  ))}
            </div>
          </div>
        ))
      ) : (
        <div className="flex w-full flex-col gap-4 p-4 md:bg-black/10">
          <h1 className="text-2xl">{bookingFilter.toUpperCase()}</h1>
          <div className="grid grid-flow-row grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
            {listOfBookings &&
              listOfBookings
                .filter((eachBooking) => eachBooking.status === bookingFilter)
                .map((eachBooking, index) => (
                  <EachBooking {...{ eachBooking, fetchData }} key={index} />
                ))}
          </div>
        </div>
      )}
    </>
  );
};

export default BookingsList;
