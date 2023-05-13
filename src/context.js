import axios from 'axios';
import React, { useState, useEffect, useContext, createContext } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const { localStorageValues } = useLocalStorage('authenticated');

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [isSignInRequired, setIsSignInRequired] = useState(false);
  const [isAccountEditOpen, setIsAccountEditOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState({
    open: false,
    value: '',
    status: '',
    id: '',
  });
  const [transitionOpen, setTransitionOpen] = useState(false);
  const [user, setUser] = useState(null);

  const [bookingUI, setBookingUI] = useState({
    id: '',
    open: false,
  });

  const [destinationUI, setDestinationUI] = useState({
    id: '',
    open: false,
  });

  const userSignIn = (userInfo, token) => {
    localStorage.setItem('authenticated', token);
  };

  const userSignOut = () => {
    localStorage.clear();
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/v1/users`,
          { headers: { Authorization: `Bearer ${localStorageValues}` } },
          { signal: controller.signal },
        );
        setUser(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
    return () => controller.abort();
  }, [localStorageValues]);

  const value = {
    isLoading,
    setIsLoading,
    user,
    setUser,
    userSignIn,
    userSignOut,
    bookingUI,
    setBookingUI,
    destinationUI,
    setDestinationUI,
    isSuccessful,
    setIsSuccessful,
    isFailed,
    setIsFailed,
    isSignInRequired,
    setIsSignInRequired,
    transitionOpen,
    setTransitionOpen,
    isAccountEditOpen,
    setIsAccountEditOpen,
    isPaymentOpen,
    setIsPaymentOpen,
  };

  return <AppContext.Provider {...{ value }}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export default AppProvider;
