import React, { useState } from "react";
import { useContextData } from "../context/ExpenseTrackerContext";

const IncomeDataForm = () => {
  const { data, addData } = useContextData();
  const [date, setDate] = useState(
    new Date(Date.now()).toISOString().slice(0, 10)
  );
  const [purpose, setPurpose] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (purpose.trim() !== "" && amount.trim() !== "") {
      addData(date, "income", purpose, parseFloat(amount));
      setPurpose("");
      setAmount("");
    }
  };

  const handleDateChange = (selectedDate) => {
    // console.log('selectedDate', selectedDate);
    // selectedDate 2023-07-07
    setDate(selectedDate);
  };

  const existingDataForSelectedDate = data.find((item) => item.date === date);

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Date:
        <input
          type="date"
          value={date}
          onChange={(e) => handleDateChange(e.target.value)}
        />
      </label>
      <div>
        <label>
          Purpose (Income):
          <input
            type="text"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          />
        </label>
        <label>
          Amount (Income):
          <input
            disabled={purpose === ""}
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
      </div>
      <button disabled={purpose === "" && amount === ""} type="submit">
        Submit
      </button>

      {/* Display existing data for the selected date */}
      {existingDataForSelectedDate && (
        <div>
          <h2>
            Existing Data for {new Date(date).toISOString().slice(0, 10)}:
          </h2>
          <h3>
            Total Income: $
            {existingDataForSelectedDate.income.reduce(
              (acc, curr) => acc + curr.amount,
              0
            )}
          </h3>
          <ul>
            {existingDataForSelectedDate.income
              .filter(
                (incomeEntry) =>
                  incomeEntry.purpose.trim() !== "" && incomeEntry.amount !== 0
              )
              .map((incomeEntry, index) => (
                <li key={index}>
                  Purpose: {incomeEntry.purpose}, Amount: {incomeEntry.amount}
                </li>
              ))}
          </ul>
        </div>
      )}
    </form>
  );
};

export default IncomeDataForm;
