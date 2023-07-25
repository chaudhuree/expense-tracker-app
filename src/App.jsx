import 'antd/dist/antd.css';
import "./App.css";
import ExpenseDataTracker from "./components/ExpenseDataTracker";
// start
import React from "react";
import { ExpenseTrackerProvider } from "./context/ExpenseTrackerContext";
// end

import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import ExpensePage from "./pages/ExpensePage";
import IncomePage from "./pages/IncomePage";
import HomePage from "./pages/HomePage";
import SummaryPage from "./pages/SummaryPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <ExpenseTrackerProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/et" element={<ExpenseDataTracker />} />
          <Route path="/expense" element={<ExpensePage />} />
          <Route path="/income" element={<IncomePage />} />
          <Route path="/summary" element={<SummaryPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ExpenseTrackerProvider>
  );
}

export default App;
