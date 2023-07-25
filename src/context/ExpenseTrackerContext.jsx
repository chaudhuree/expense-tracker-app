import React, { createContext, useContext, useState } from "react";

const ExpenseTrackerContext = createContext();

const initialData = {
  date: new Date(Date.now()).toISOString().slice(0, 10),
  income: [{ purpose: "", amount: 0 }],
  expense: [{ purpose: "", amount: 0 }]
};

const ExpenseTrackerProvider = ({ children }) => {
  const [data, setData] = useState([initialData]);

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

  return (
    <ExpenseTrackerContext.Provider value={{ data, addData }}>
      {children}
    </ExpenseTrackerContext.Provider>
  );
};

const useContextData = () => {
  return useContext(ExpenseTrackerContext);
};

export { ExpenseTrackerProvider, useContextData };
