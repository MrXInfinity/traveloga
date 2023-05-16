import axios from 'axios';
import React, { useState, useEffect, useContext, createContext } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const { localStorageValues, setLocalValue } =
    useLocalStorage('authenticated');

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const [isAccountEditOpen, setIsAccountEditOpen] = useState(false);

  // Booking, Destination, SignIn Modal
  const [contentModal, setContentModal] = useState({
    id: '',
    type: '',
    isOpen: false,
  });

  const openBookingUI = (value) => {
    setContentModal((prev) => ({
      id: value ?? prev.id,
      type: 'booking',
      isOpen: true,
    }));
  };

  const openDestinationUI = (value) => {
    setContentModal({
      id: value,
      type: 'destination',
      isOpen: true,
    });
  };

  const openSignInModal = () => {
    setContentModal({
      id: '',
      type: 'signin',
      isOpen: true,
    });
  };

  const closeModal = () => {
    setContentModal({
      id: '',
      type: '',
      isOpen: false,
    });
  };

  console.log(contentModal);
  // Status for Success/Failed
  const [statusModal, setStatusModal] = useState({
    type: '',
    isOpen: false,
    message: '',
  });

  const openLoadingModal = (bool) => {
    bool
      ? setStatusModal({ type: 'loading', isOpen: bool })
      : setStatusModal((prev) => ({ type: 'loading', isOpen: !prev.isOpen }));
  };

  //Payment Modal
  const [isPaymentOpen, setIsPaymentOpen] = useState({
    isOpen: false,
    value: '',
    status: '',
    id: '',
  });

  const setPayment = (status, id, value) => {
    setIsPaymentOpen({
      isOpen: true,
      value: value,
      status: status,
      id: id,
    });
  };

  const cancelPayment = () => {
    setIsPaymentOpen({
      isOpen: false,
      value: '',
      status: '',
      id: '',
    });
  };

  //User
  const [user, setUser] = useState(null);

  const userSignIn = (token) => {
    setLocalValue(token);
  };

  const userSignOut = () => {
    localStorage.clear();
  };

  useEffect(() => {
    const controller = new AbortController();
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          `https://traveloga-api.onrender.com/api/v1/users`,
          { headers: { Authorization: `Bearer ${localStorageValues}` } },
          { signal: controller.signal },
        );
        setUser(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
    return () => controller.abort();
  }, [localStorageValues]);

  const value = {
    setPayment,
    cancelPayment,
    openSignInModal,
    closeModal,
    openDestinationUI,
    openBookingUI,
    contentModal,
    statusModal,
    openLoadingModal,
    isLoading,
    setIsLoading,
    user,
    setUser,
    userSignIn,
    userSignOut,
    isSuccessful,
    setIsSuccessful,
    isFailed,
    setIsFailed,
    isAccountEditOpen,
    setIsAccountEditOpen,
    isPaymentOpen,
  };

  return <AppContext.Provider {...{ value }}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export default AppProvider;
