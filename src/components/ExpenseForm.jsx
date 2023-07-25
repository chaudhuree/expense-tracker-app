import React, { useState } from 'react';

const ExpenseForm = ({ addData, existingData }) => {
  const [date, setDate] = useState(new Date(Date.now()).toISOString().slice(0, 10));
  const [purposeIncome, setPurposeIncome] = useState('');
  const [amountIncome, setAmountIncome] = useState('');
  const [purposeExpense, setPurposeExpense] = useState('');
  const [amountExpense, setAmountExpense] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (purposeIncome && amountIncome) {
      addData(date, 'income', purposeIncome, parseFloat(amountIncome));
    }
    if (purposeExpense && amountExpense) {
      addData(date, 'expense', purposeExpense, parseFloat(amountExpense));
    }
    setDate(new Date(Date.now()).toISOString().slice(0, 10));
    setPurposeIncome('');
    setAmountIncome('');
    setPurposeExpense('');
    setAmountExpense('');
  };

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  };
  const existingDataForSelectedDate = existingData.find((item) => item.date === date);
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Date:
        <input type="date" value={date} onChange={(e) => handleDateChange(e.target.value)} />
      </label>
      <div>
        <label>
          Purpose (Income):
          <input type="text" value={purposeIncome} onChange={(e) => setPurposeIncome(e.target.value)} />
        </label>
        <label>
          Amount (Income):
          <input type="number" value={amountIncome} onChange={(e) => setAmountIncome(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Purpose (Expense):
          <input type="text" value={purposeExpense} onChange={(e) => setPurposeExpense(e.target.value)} />
        </label>
        <label>
          Amount (Expense):
          <input type="number" value={amountExpense} onChange={(e) => setAmountExpense(e.target.value)} />
        </label>
      </div>
      <button type="submit">Submit</button>

      {/* Display existing data for the selected date */}
      {existingDataForSelectedDate && (
        <div>
          <h2>Existing Data for {new Date(date).toISOString().slice(0, 10)}:</h2>
          <h3>Total Income: {existingDataForSelectedDate.income.reduce((acc, curr) => acc + curr.amount, 0)}</h3>
          <ul>
            {existingDataForSelectedDate.income.map((incomeEntry, index) => (
              <li key={index}>
                Purpose: {incomeEntry.purpose}, Amount: {incomeEntry.amount}
              </li>
            ))}
          </ul>
          <h3>Total Expense: {existingDataForSelectedDate.expense.reduce((acc, curr) => acc + curr.amount, 0)}</h3>
          <ul>
            {existingDataForSelectedDate.expense.map((expenseEntry, index) => (
              <li key={index}>
                Purpose: {expenseEntry.purpose}, Amount: {expenseEntry.amount}
              </li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
};

export default ExpenseForm;
