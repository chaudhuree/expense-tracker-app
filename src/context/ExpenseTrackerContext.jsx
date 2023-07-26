import React, { createContext, useContext, useState } from "react";
import { useLocalStorage } from "../hook/localStoregeHook";
const ExpenseTrackerContext = createContext();

const initialData = {
  date: "",
  income: [{ purpose: "", amount: 0 }],
  expense: [{ purpose: "", amount: 0 }]
};

const ExpenseTrackerProvider = ({ children }) => {
  // const [data, setData] = useState([initialData]);
  const [data,setData]=useLocalStorage("expense-tracker",[initialData]);

  const addData = (date, type, purpose, amount) => {
    const newData = [...data];
    const existingData = newData.find((item) => item.date === date);

    if (type === "income") {
      if (!existingData) {
        newData.push({
          date,
          income: [{ purpose, amount }],
          expense: []
        });
      } else {
        existingData.income.push({ purpose, amount });
      }
    } else if (type === "expense") {
      if (!existingData) {
        newData.push({
          date,
          income: [],
          expense: [{ purpose, amount }]
        });
      } else {
        existingData.expense.push({ purpose, amount });
      }
    }

    setData(newData);
  };

  // remove data
  // const removeData = (date, type, index) => {
  //   const newData = [...data];
  //   const existingData = newData.find((item) => item.date === date);

  //   if (type === 'income') {
  //     existingData.income.splice(index, 1);
  //   } else if (type === 'expense') {
  //     existingData.expense.splice(index, 1);
  //   }

  //   setData(newData);
  // };
  const removeData = (date, type, index) => {
    const newData = data.map((entry) => {
      if (entry.date === date) {
        if (type === 'income') {
          return {
            ...entry,
            income: entry.income.filter((_, idx) => idx !== index),
          };
        } else if (type === 'expense') {
          return {
            ...entry,
            expense: entry.expense.filter((_, idx) => idx !== index),
          };
        }
      }
      return entry;
    });

    setData(newData);
  };

  return (
    <ExpenseTrackerContext.Provider value={{ data, addData,removeData }}>
      {children}
    </ExpenseTrackerContext.Provider>
  );
};

const useContextData = () => {
  return useContext(ExpenseTrackerContext);
};

export { ExpenseTrackerProvider, useContextData };
