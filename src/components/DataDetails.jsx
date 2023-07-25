import React, { useState } from "react";
import { useContextData } from "../context/ExpenseTrackerContext";

const DataDetails = () => {
  const { data } = useContextData();
  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const getDataForSelectedDate = () => {
    return data.find((item) => item.date === selectedDate);
  };

  const selectedData = getDataForSelectedDate();

  return (
    <div>
      <h2>Data Details</h2>
      <label>
        Select Date:
        <input type="date" value={selectedDate} onChange={handleDateChange} />
      </label>

      {selectedData && (
        <div>
          <h3>Date: {selectedData.date}</h3>
          <h3>
            Total Income: $
            {selectedData.income.reduce((acc, curr) => acc + curr.amount, 0)}
          </h3>
          <table>
            <thead>
              <tr>
                <th>Purpose</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {selectedData.income.map((incomeEntry, index) => (
                <tr key={index}>
                  <td>{incomeEntry.purpose}</td>
                  <td>${incomeEntry.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3>
            Total Expense: $
            {selectedData.expense.reduce((acc, curr) => acc + curr.amount, 0)}
          </h3>
          <table>
            <thead>
              <tr>
                <th>Purpose</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {selectedData.expense.map((expenseEntry, index) => (
                <tr key={index}>
                  <td>{expenseEntry.purpose}</td>
                  <td>${expenseEntry.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DataDetails;
