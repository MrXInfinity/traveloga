import { useState } from 'react';

const useLocalStorage = (key) => {
  const [localStorageValues, setLocalStorageValues] = useState(() => {
    if (typeof window === 'undefined') {
      return null;
    }
    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      console.log(error);
      return null;
    }
  });

  const setLocalValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(localStorageValues) : value;
      setLocalStorageValues(valueToStore);

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { localStorageValues, setLocalValue };
};

export default useLocalStorage;
