import {
  faCartFlatbedSuitcase,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useGlobalContext } from '../../context.js';
import airportsData from '../../mockdata.json';
import {
  DateOfBookingComponent,
  FlightypeAndRegionComponent,
  HotelToggleComponent,
  LocationComponent,
  PriceComponent,
  useBookingState,
} from './';

const BookingUI = () => {
  const {
    form,
    flightType,
    flightTypeClick,
    regionsCategory,
    regionsCategoryClick,
    eachRegion,
    eachRegionClick,
    withHotel,
    withHotelClick,
    dateOfLeave,
    dateOfReturn,
    setDateClick,
    initialAmount,
    initialAmountSet,
    discount,
    discountSet,
    amount,
    amountSet,
    open,
    close,
  } = useBookingState();
  const {
    contentModal: { id, isOpen },
    openSuccessSnackbar,
    openFailedSnackbar,
    openSignInModal,
    closeModal,
    authToken,
  } = useGlobalContext();
  const [bookingInfo, setBookingInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, reset } = form;

  const bookingRef = useRef(null);

  const formSubmit = async (data) => {
    setIsLoading(true);

    try {
      const {
        data: { message },
      } = await axios.post(
        `http://localhost:5000/api/v1/bookings/${id}`,
        data,
        { headers: { Authorization: `Bearer ${authToken}` } },
      );

      setIsLoading(false);
      closeModal();
      openSuccessSnackbar(message);
    } catch (err) {
      setIsLoading(false);
      if ((err.response.data.msg = 'Authentication Failed')) {
        openSignInModal();
        return;
      }
      openFailedSnackbar(err.response.data.msg);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const fetchEachDestinationInfo = async () => {
      try {
        const { data } = await axios.get(
          `https://traveloga-api.onrender.com/api/v1/destinations/${id}`,
          { signal: controller.signal },
        );
        setBookingInfo(data.destination);
      } catch (err) {
        console.log(err);
      }
    };
    if (id && isOpen) {
      fetchEachDestinationInfo();
    }
    return () => {
      controller.abort();
      reset();
      close();
    };
  }, [id, isOpen]);

  useEffect(() => {
    if (bookingInfo) open(bookingInfo.title);
  }, [bookingInfo]);

  if (bookingInfo) {
    const { title, limitedOffers, domestic, international } = bookingInfo;
    return (
      <FormProvider {...form}>
        <div className="flex h-fit max-h-[93vh] w-full max-w-xl flex-row-reverse bg-white md:w-fit md:max-w-4xl">
          <FontAwesomeIcon
            className="transition-color absolute z-10 ml-auto mb-auto p-6 text-3xl text-black/50 duration-150 ease-in-out hover:text-black md:text-4xl lg:mr-1 lg:p-2 xl:p-6"
            icon={faXmark}
            onClick={() => closeModal()}
          />
          <form
            className="flex flex-col bg-white p-6 md:py-6"
            onSubmit={handleSubmit(formSubmit)}>
            <h1 className='mb-1 font-["Rubik"] text-xl md:mb-2 lg:text-2xl'>
              PLANE BOOKING
            </h1>
            <div className="grid h-full grid-cols-6 content-start gap-x-3 gap-y-2 md:h-fit md:grid-cols-10 md:gap-3">
              <FlightypeAndRegionComponent
                flights={airportsData}
                {...{
                  flightType,
                  flightTypeClick,
                  regionsCategory,
                  regionsCategoryClick,
                  bookingRef,
                }}
              />
              <LocationComponent
                flights={airportsData}
                {...{
                  flightType,
                  regionsCategory,
                  title,
                  limitedOffers,
                  eachRegion,
                  eachRegionClick,
                }}
              />
              <HotelToggleComponent {...{ withHotel, withHotelClick }} />
              <DateOfBookingComponent
                {...{ dateOfLeave, dateOfReturn, setDateClick }}
              />
              <PriceComponent
                {...{
                  limitedOffers,
                  domestic,
                  international,
                  dateOfLeave,
                  dateOfReturn,
                  flightType,
                  withHotel,
                  eachRegion,
                  initialAmount,
                  initialAmountSet,
                  discount,
                  discountSet,
                  amount,
                  amountSet,
                }}
              />
            </div>
            <button
              className="col-span-6 mt-auto flex items-center justify-center rounded-lg bg-amber-200 py-3 md:mt-4"
              type="submit">
              <FontAwesomeIcon
                className="mr-4 text-3xl"
                icon={faCartFlatbedSuitcase}
              />
              <h1 className="text-lg">BOOK FLIGHT</h1>
            </button>
          </form>
        </div>
      </FormProvider>
    );
  }
};

export default BookingUI;
