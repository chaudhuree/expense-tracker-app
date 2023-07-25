import React, { useState } from "react";
import { useContextData } from "../context/ExpenseTrackerContext";

const ExpenseDataForm = () => {
  const { data, addData,removeData } = useContextData();
  const [date, setDate] = useState(
    new Date(Date.now()).toISOString().slice(0, 10)
  );
  const [purpose, setPurpose] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (purpose.trim() !== "" && amount.trim() !== "") {
      addData(date, "expense", purpose, parseFloat(amount));
      setPurpose("");
      setAmount("");
    }
  };

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  };

  const handleRemove = (index) => {
    
    removeData(date, "expense", index+1);
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
          Purpose (Expense):
          <input
            type="text"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          />
        </label>
        <label>
          Amount (Expense):
          <input
            type="number"
            disabled={purpose===""}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
      </div>
      <button disabled={purpose==="" && amount===""} type="submit">Submit</button>

      {/* Display existing data for the selected date */}
      {existingDataForSelectedDate && (
        <div>
          <h2>
            Existing Data for {new Date(date).toISOString().slice(0, 10)}:
          </h2>
          <h3>
            Total Expense: $
            {existingDataForSelectedDate.expense.reduce(
              (acc, curr) => acc + curr.amount,
              0
            )}
          </h3>
          <ul>
            {existingDataForSelectedDate.expense
              .filter(
                (expenseEntry) =>
                  expenseEntry.purpose.trim() !== "" &&
                  expenseEntry.amount !== 0
              )
              .map((expenseEntry, index) => (
                <div key={index}>
                  <li >
                  Purpose: {expenseEntry.purpose}, Amount: {expenseEntry.amount}
                  </li>
                  <button onClick={() => handleRemove(index)}>Remove</button>
               
                </div>
              ))}
          </ul>
        </div>
      )}
    </form>
  );
};
export default ExpenseDataForm;
