import { DatePicker, Table } from "antd";
import React, { useState } from "react";
import { useContextData } from "../context/ExpenseTrackerContext";

const DataDetails = () => {
  const { data } = useContextData();
  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = (date, dateString) => {
    setSelectedDate(dateString);
  };

  const getDataForSelectedDate = () => {
    return data.find((item) => item.date === selectedDate);
  };

  const selectedData = getDataForSelectedDate();
  // console.log('selectedData', selectedData);

  const columns = [
    {
      title: "Purpose",
      dataIndex: "purpose",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      sorter: {
        compare: (a, b) => a.amount - b.amount,
        multiple: 2,
      },
    },
  ];
  const incomeData = selectedData?.income
    ?.filter((item) => item.amount !== 0)
    .map((incomeEntry, index) => ({
      key: index,
      purpose: incomeEntry.purpose,
      amount: incomeEntry.amount,
    }));
  const expenseData = selectedData?.expense
    ?.filter((item) => item.amount !== 0)
    .map((expenseEntry, index) => ({
      key: index,
      purpose: expenseEntry.purpose,
      amount: expenseEntry.amount,
    }));

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <div className="container data-details">
      <div className="row text-center heading justify-content-center items-center mb-3">
        <div className="col">
          <h1 className="white-text"> Data Details</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-6 offset-3 flex justify-content-center text-center">
          <DatePicker size="large" onChange={handleDateChange} />
        </div>
      </div>

      {selectedData ? (
        <div className="row data-showcase d-flex justify-content-center">
          <div className="col">
            <h3 className="text-center text-main">
              Date:
              <span className="date-text mx-2">{selectedData.date}</span>
            </h3>
            <p className="text-total">
              Total Income: Tk &nbsp;
              {selectedData.income.reduce((acc, curr) => acc + curr.amount, 0)}
            </p>
            <Table
              columns={columns}
              dataSource={incomeData}
              onChange={onChange}
              pagination={false}
            />

            <p className="text-total mt-5">
              Total Expense: Tk &nbsp;
              {selectedData.expense.reduce((acc, curr) => acc + curr.amount, 0)}
            </p>
            <Table
              columns={columns}
              dataSource={expenseData}
              onChange={onChange}
              pagination={false}
              size="small"
            />
          </div>
        </div>
      ) : (
        <p className="text-center fw-bold text-danger px-5 py-5">
          No data available for the selected date.
        </p>
      )}
    </div>
  );
};

export default DataDetails;
