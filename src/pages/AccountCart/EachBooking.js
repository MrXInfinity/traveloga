import axios from 'axios';
import React, { useEffect } from 'react';
import { useGlobalContext } from '../../context';

const EachBooking = ({ eachBooking, fetchData }) => {
  const { setPayment, authToken } = useGlobalContext();

  const cancelStatus = async (id) => {
    try {
      const { data } = await axios.patch(
        `https://traveloga-api.onrender.com/api/v1/bookings/${id}`,
        { status: 'Cancelled' },
        { headers: { Authorization: `Bearer ${authToken}` } },
      );
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (
      Date.now() >= new Date(eachBooking.dateOfLeave).getTime() &&
      eachBooking.status === 'Cart'
    ) {
      cancelStatus(eachBooking._id);
    }
  }, [eachBooking]);

  if (eachBooking) {
    const {
      travellingTo,
      travellingFromLocation,
      regionsCategory,
      flightType,
      dateOfLeave,
      dateOfReturn,
      withHotel,
      _id,
      status,
      amount,
    } = eachBooking;
    return (
      <div className="grid grid-flow-row grid-cols-2 gap-2 border-2 border-solid border-black/50 bg-white p-4">
        <div className="flex flex-col">
          <h1 className="text-xs text-black/70 md:text-sm lg:text-base">
            Travelling To:
          </h1>
          <p className="text-lg md:text-xl">{travellingTo}</p>
        </div>
        <div className="flex flex-col">
          <h1 className="text-xs text-black/70 md:text-sm lg:text-base">
            Leave:
          </h1>
          <p className="text-lg md:text-xl">
            {new Date(dateOfLeave).toLocaleDateString()}
          </p>
        </div>
        <div className="flex flex-col">
          <h1 className="text-xs text-black/70 md:text-sm lg:text-base">
            Travelling From:
          </h1>
          <p className="text-lg md:text-xl">
            {travellingFromLocation}, {regionsCategory}
          </p>
        </div>
        <div className="flex flex-col">
          <h1 className="text-xs text-black/70 md:text-sm lg:text-base">
            Return:
          </h1>
          <p className="text-lg md:text-xl">
            {new Date(dateOfReturn).toLocaleDateString()}
          </p>
        </div>
        <div className="flex flex-col">
          <h1 className="text-xs text-black/70 md:text-sm lg:text-base">
            Flight Type:
          </h1>
          <p className="text-lg md:text-xl">{flightType}</p>
        </div>
        <div className="flex flex-col">
          <h1 className="text-xs text-black/70 md:text-sm lg:text-base">
            Hotel
          </h1>
          <p className="text-lg md:text-xl">
            {withHotel ? `Selected` : `Not Selected`}
          </p>
        </div>
        <div className="col-span-2 mt-2 flex items-center justify-between">
          <h1 className="h-fit text-xl text-[#2B8E9B]">{amount}</h1>
          {status === 'Cart' ? (
            <div className="flex gap-4 ">
              <button
                className="bg-amber-200 px-6 py-2 transition duration-300 ease-in-out hover:bg-amber-300 hover:text-white"
                onClick={(e) => {
                  setPayment('Booked', _id, amount);
                }}>
                BOOK
              </button>
              <button
                className="bg-amber-200 px-6 py-2 transition duration-300 ease-in-out hover:bg-amber-300 hover:text-white"
                onClick={() => cancelStatus(_id)}>
                CANCEL
              </button>
            </div>
          ) : (
            <h1
              className={`col-span-2 flex px-4 py-2 ${
                status === 'Booked' ? `text-green-600` : `text-red-700`
              } bg-slate-100`}>
              {status.toUpperCase()}
            </h1>
          )}
        </div>
      </div>
    );
  } else {
    return <h1>No Contents found...</h1>;
  }
};

export default EachBooking;
