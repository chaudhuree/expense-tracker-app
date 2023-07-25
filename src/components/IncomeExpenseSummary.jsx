import React from 'react';

const IncomeExpenseSummary = ({ data }) => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  // Filter the data for the last 30 days
  const filteredData = data.filter((entry) => new Date(entry.date) >= thirtyDaysAgo);

  // Calculate total income and expense for the last 30 days
  let totalIncome = 0;
  let totalExpense = 0;

  filteredData.forEach((entry) => {
    totalIncome += entry.income.reduce((acc, curr) => acc + curr.amount, 0);
    totalExpense += entry.expense.reduce((acc, curr) => acc + curr.amount, 0);
  });

  return (
    <div>
      <h2>Income and Expense Summary for Last 30 Days</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Income</th>
            <th>Expense</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((entry) => (
            <tr key={entry.date}>
              <td>{entry.date}</td>
              <td>${entry.income.reduce((acc, curr) => acc + curr.amount, 0)}</td>
              <td>${entry.expense.reduce((acc, curr) => acc + curr.amount, 0)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td>${totalIncome}</td>
            <td>${totalExpense}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default IncomeExpenseSummary;
