import React from "react";
import IncomeDataForm from "./IncomeDataForm";
import ExpenseDataForm from "./ExpenseDataForm";
import IncomeExpenseSummary from "./IncomeExpenseSummary";
import DataDetails from "./DataDetails";
import { ExpenseTrackerProvider } from "../context/ExpenseTrackerContext";

const ExpenseDataTrackerApp = () => {
  return (
    <ExpenseTrackerProvider>
      <div>
        <h1>Expense Tracker App</h1>
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: "20px" }}>
            <h2>Income Form</h2>
            <IncomeDataForm />
          </div>
          <div>
            <h2>Expense Form</h2>
            <ExpenseDataForm />
          </div>
        </div>
        {/* Display the data here */}

        <div
          style={{ background: "salmon", marginTop: "20px", padding: "10px" }}
        >
          <IncomeExpenseSummary />
        </div>
        <div
          style={{
            background: "lightblue",
            marginTop: "20px",
            padding: "10px"
          }}
        >
          <DataDetails />
        </div>
      </div>
    </ExpenseTrackerProvider>
  );
};

export default ExpenseDataTrackerApp;
