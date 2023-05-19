import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(
    localStorage.getItem('authenticated'),
  );

  useEffect(() => {
    if (authToken) {
      window.localStorage.setItem('authenticated', authToken);
    }
  }, [authToken]);

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

  // Status for Success/Failed
  const [statusSnackbar, setStatusSnackbar] = useState({
    type: '',
    isOpen: false,
    message: '',
  });

  const openSuccessSnackbar = (message) => {
    setStatusSnackbar({ type: 'success', isOpen: true, message: message });
  };

  const openFailedSnackbar = (message) => {
    setStatusSnackbar({ type: 'failed', isOpen: true, message: message });
  };

  const closeSnackbar = () => {
    setStatusSnackbar({ type: '', isOpen: false, message: '' });
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
    setAuthToken(token);
  };

  const userSignOut = () => {
    setAuthToken('');
    localStorage.clear();
  };

  useEffect(() => {
    const controller = new AbortController();
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          `https://traveloga-api.onrender.com/api/v1/users`,
          { headers: { Authorization: `Bearer ${authToken}` } },
          { signal: controller.signal },
        );
        setUser(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
    return () => {
      setUser(null);
      controller.abort();
    };
  }, [authToken]);

  const value = {
    authToken,
    userSignIn,
    userSignOut,
    setPayment,
    cancelPayment,
    openSignInModal,
    closeModal,
    openDestinationUI,
    openBookingUI,
    contentModal,
    statusSnackbar,
    openSuccessSnackbar,
    openFailedSnackbar,
    closeSnackbar,
    user,
    setUser,
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
