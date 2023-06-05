import {
  useReducer,
  useCallback,
  createContext,
  useState,
  useContext,
  useEffect,
} from 'react';
import { initialState, bookingReducer } from './BookingReducer';
import { useGlobalContext } from '../../context.js';
import moment from 'moment';
import axios from 'axios';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookingReducer, initialState);
  const {
    contentModal: { isOpen, id },
    openSuccessSnackbar,
    openFailedSnackbar,
    openSignInModal,
    closeModal,
    authToken,
  } = useGlobalContext();

  // Booking Information for the form
  const [bookingInfo, setBookingInfo] = useState({
    title: '',
    limitedOffers: {},
    domestic: {},
    international: {},
  });

  const [errors, setErrors] = useState({
    flightTypeRegion: '',
    location: '',
    date: '',
  });

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
    };
  }, [id, isOpen]);

  const flightTypeSelect = (val) => {
    if (errors.flightTypeRegion) {
      setErrors((prev) => ({
        ...prev,
        flightTypeRegion: '',
      }));
    }
    dispatch({
      type: 'CHANGE_FLIGHTTYPE',
      payload: val,
    });
  };

  const regionSelect = (prov, region) => {
    if (!state.flightType) {
      setErrors((prev) => ({
        ...prev,
        flightTypeRegion: 'Flight type field is required...',
      }));
      return;
    }
    if (errors.flightTypeRegion) {
      setErrors((prev) => ({
        ...prev,
        flightTypeRegion: '',
      }));
    }
    dispatch({
      type: 'SET_REGION',
      payload: {
        prov,
        region,
      },
    });
  };

  const locationSelect = (val) => {
    if (!state.flightType || !state.regionsCategory) {
      setErrors((prev) => ({
        ...prev,
        flightTypeRegion: 'Flight type & Region fields are required...',
      }));
      return;
    }

    if (errors.location) {
      setErrors((prev) => ({
        ...prev,
        location: '',
      }));
    }
    dispatch({
      type: 'SET_LOCATION',
      payload: val,
    });
  };

  const hotelToggle = () => {
    dispatch({ type: 'HOTEL_TOGGLE' });
  };

  const dateSelection = (label, value) => {
    if (errors.date) {
      setErrors((prev) => ({
        ...prev,
        date: '',
      }));
    }

    if (label === 'Leave') {
      if (moment(value).isBefore(moment().add(1, 'month'))) {
        setErrors((prev) => ({
          ...prev,
          date: "Pick a date of leave that's more than a month of today.",
        }));
        return;
      }

      dispatch({
        type: 'DATE_CLICK',
        payload: {
          label,
          value: moment(value).toISOString(),
        },
      });
      return;
    }

    if (!state.date.Leave) {
      setErrors((prev) => ({
        ...prev,
        date: 'Please select first the date of your leave.',
      }));
      return;
    }
    if (moment(value).isBefore(moment(state.date.Leave))) {
      setErrors((prev) => ({
        ...prev,
        date: 'Your return date should not precede your leave date.',
      }));
      return;
    }

    dispatch({
      type: 'DATE_CLICK',
      payload: {
        label,
        value: moment(value).toISOString(),
      },
    });
    return;
  };

  const initialAmountSet = useCallback(
    ({
      domestic: { travelIn, travelOut, hotelFeePerDay, stayFeePerDay },
      international,
    }) => {
      const numOfDays = moment(state.date.Return).diff(
        moment(state.date.Leave),
        'days',
      );

      if (state.flightType === 'domestic') {
        dispatch({
          type: 'INITIAL_AMOUNT_SET',
          payload: state.withHotel
            ? travelIn + travelOut + hotelFeePerDay * numOfDays
            : travelIn + travelOut + stayFeePerDay * numOfDays,
        });
        return;
      }
      if (state.flightType === 'international') {
        const { travelIn, travelOut, hotelFeePerDay, stayFeePerDay } =
          international[state.travellingFromRegion.toLowerCase()];
        dispatch({
          type: 'INITIAL_AMOUNT_SET',
          payload: state.withHotel
            ? travelIn + travelOut + hotelFeePerDay * numOfDays
            : travelIn + travelOut + stayFeePerDay * numOfDays,
        });
      }
    },
    [
      state.date.Leave,
      state.date.Return,
      state.flightType,
      state.travellingFromRegion,
      state.withHotel,
    ],
  );

  const discountSet = useCallback(
    (offers) => {
      if (state.flightType) {
        dispatch({
          type: 'DISCOUNT_SET',
          payload: offers[state.flightType],
        });
        return;
      }
      dispatch({
        type: 'DISCOUNT_REMOVE',
      });
    },
    [state.flightType],
  );

  const amountSet = useCallback(() => {
    if (state.discount > 0) {
      dispatch({
        type: 'FINAL_AMOUNT_SET',
        payload: Math.floor(state.initialAmount * (1 - state.discount / 100)),
      });

      return;
    } else {
      dispatch({
        type: 'FINAL_AMOUNT_SET',
        payload: state.initialAmount,
      });
    }
  }, [state.discount, state.initialAmount]);

  const formSubmit = async (changeLoading) => {
    changeLoading(true);
    const {
      flightType,
      regionsCategory,
      travellingFromRegion,
      travellingFromLocation,
      withHotel,
      date: { Leave, Return },
      amount,
    } = state;

    try {
      const {
        data: { message },
      } = await axios.post(
        `https://traveloga-api.onrender.com/api/v1/bookings/${id}`,
        {
          travellingFromLocation,
          regionsCategory,
          travellingFromRegion,
          travellingTo: bookingInfo.title,
          dateOfLeave: Leave,
          dateOfReturn: Return,
          withHotel,
          flightType,
          amount,
        },
        { headers: { Authorization: `Bearer ${authToken}` } },
      );
      closeModal();
      openSuccessSnackbar(message);
    } catch (err) {
      console.log(err);
      if (err.response.data.msg === 'Authentication Failed') {
        openSignInModal();
        return;
      }
      closeModal();
      openFailedSnackbar(err.response.data.msg);
    } finally {
      changeLoading(false);
    }
  };

  useEffect(() => {
    if (bookingInfo.limitedOffers) {
      discountSet(bookingInfo.limitedOffers);
    }
  }, [state.flightType, bookingInfo.limitedOffers, discountSet]);

  useEffect(() => {
    if (
      state.date.Leave &&
      state.date.Return &&
      state.travellingFromRegion &&
      bookingInfo.domestic &&
      bookingInfo.international
    ) {
      initialAmountSet({
        domestic: bookingInfo.domestic,
        international: bookingInfo.international,
      });
      return;
    }
  }, [
    state.date.Leave,
    state.date.Return,
    state.withHotel,
    state.travellingFromRegion,
    bookingInfo.domestic,
    bookingInfo.international,
    initialAmountSet,
  ]);

  useEffect(() => {
    if (state.initialAmount) {
      amountSet();
    }
  }, [amountSet, state.initialAmount]);

  const value = {
    flightType: state.flightType,
    regionsCategory: state.regionsCategory,
    eachRegion: state.travellingFromRegion,
    withHotel: state.withHotel,
    dateOfLeave: state.date.Leave,
    dateOfReturn: state.date.Return,
    initialAmount: state.initialAmount,
    initialAmountSet,
    discount: state.discount,
    discountSet,
    amount: state.amount,
    amountSet,
    flightTypeSelect,
    regionSelect,
    errors,
    locationSelect,
    hotelToggle,
    dateSelection,
    title: bookingInfo.title ?? '',
    limitedOffers: bookingInfo.limitedOffers ?? '',
    domestic: bookingInfo.domestic ?? '',
    international: bookingInfo.international ?? '',
    formSubmit,
  };

  return (
    <BookingContext.Provider {...{ value }}>{children}</BookingContext.Provider>
  );
};

const useBookingContext = () => {
  return useContext(BookingContext);
};

export default useBookingContext;
