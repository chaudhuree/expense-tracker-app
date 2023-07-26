import  { useState } from "react";


const  useLocalStorage = (key, defaultValue) => {

  const isLocalStorageSupported = typeof Storage !== "undefined";


  const [data, setData] = useState(() => {
    if (isLocalStorageSupported) {
      const storedData = localStorage.getItem(key);
      return storedData ? JSON.parse(storedData) : defaultValue;
    } else {

      return defaultValue;
    }
  });


  const setDataAndLocalStorage = (newData) => {
    setData(newData);
    if (isLocalStorageSupported) {
      localStorage.setItem(key, JSON.stringify(newData));
    }
  };

  return [data, setDataAndLocalStorage];
};


const useClearLocalStorage = () => {

  const clearLocalStorage = (key) => {
    localStorage.removeItem(key);
  };

  return clearLocalStorage;
};

export  {useLocalStorage,useClearLocalStorage};