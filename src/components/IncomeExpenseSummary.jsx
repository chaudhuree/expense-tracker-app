import { Table } from "antd";
import React from "react";
import { useContextData } from "../context/ExpenseTrackerContext";
const IncomeExpenseSummary = () => {
  const { data } = useContextData();

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  // Filter the data for the last 30 days
  const filteredData = data.filter(
    (entry) => new Date(entry.date) >= thirtyDaysAgo
  );

  // Calculate total income and expense for the last 30 days
  let totalIncome = 0;
  let totalExpense = 0;

  filteredData.forEach((entry) => {
    totalIncome += entry.income.reduce((acc, curr) => acc + curr.amount, 0);
    totalExpense += entry.expense.reduce((acc, curr) => acc + curr.amount, 0);
  });

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Income",
      dataIndex: "income",
      sorter: {
        compare: (a, b) => a.income - b.income,
        multiple: 2,
      },
    },
    {
      title: "Expenses",
      dataIndex: "expenses",
      sorter: {
        compare: (a, b) => a.amount - b.amount,
        multiple: 2,
      },
    },
  ];
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const allData = filteredData.map((entry) =>
    ({
      date: entry.date,
      income: entry?.income.reduce((acc, curr) => acc + curr.amount, 0),
      expenses: entry?.expense.reduce((acc, curr) => acc + curr.amount, 0),
    })
  );
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="row text-center heading justify-content-center items-center mb-3">
            <div className="col">
              <h1 className="white-text"> Data Of Last 30 Days</h1>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Table
                columns={columns}
                dataSource={allData}
                onChange={onChange}
                pagination={{
                  pageSize: 10,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeExpenseSummary;
