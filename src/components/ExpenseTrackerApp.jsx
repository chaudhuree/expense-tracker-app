import React, { useState } from 'react';
import ExpenseForm from './ExpenseForm';
import IncomeExpenseSummary from './IncomeExpenseSummary';

const initialData = {
  date: new Date(Date.now()).toISOString().slice(0, 10),
  income: [{ purpose: '', amount: 0 }],
  expense: [{ purpose: '', amount: 0 }],
};

const ExpenseTrackerApp = () => {
  const [data, setData] = useState([initialData]);

  const addData = (date, type, purpose, amount) => {
    const newData = [...data];
    const existingData = newData.find((item) => item.date === date);

    if (type === 'income') {
      if (!existingData) {
        newData.push({
          date,
          income: [{ purpose, amount }],
          expense: [],
        });
      } else {
        existingData.income.push({ purpose, amount });
      }
    } else if (type === 'expense') {
      if (!existingData) {
        newData.push({
          date,
          income: [],
          expense: [{ purpose, amount }],
        });
      } else {
        existingData.expense.push({ purpose, amount });
      }
    }

    setData(newData);
  };

  return (
    <div>
      <h1>Expense Tracker App</h1>
      <ExpenseForm addData={addData} existingData={data} />
      {/* Display the data here */}
      <div style={{background:"palegreen",marginTop:"20px",padding:"10px"}}>
      {data.map((entry) => (
        <div key={entry.date}>
          <h2>{entry.date}</h2>
          <h3>Total Income: ${entry.income.reduce((acc, curr) => acc + curr.amount, 0)}</h3>
          <ul>
            {entry.income
              .filter((incomeEntry) => incomeEntry.purpose.trim() !== '' && incomeEntry.amount !== 0)
              .map((incomeEntry, index) => (
                <li key={index}>
                  Purpose: {incomeEntry.purpose}, Amount: {incomeEntry.amount}
                </li>
              ))}
          </ul>
          <h3>Total Expense: ${entry.expense.reduce((acc, curr) => acc + curr.amount, 0)}</h3>
          <ul>
            {entry.expense
              .filter((expenseEntry) => expenseEntry.purpose.trim() !== '' && expenseEntry.amount !== 0)
              .map((expenseEntry, index) => (
                <li key={index}>
                  Purpose: {expenseEntry.purpose}, Amount: {expenseEntry.amount}
                </li>
              ))}
          </ul>
        </div>
      ))}
</div>
      <div style={{background:"salmon",marginTop:"20px",padding:"10px"}}>
      <IncomeExpenseSummary data={data} />
      </div>
    </div>
  );
};

export default ExpenseTrackerApp;
