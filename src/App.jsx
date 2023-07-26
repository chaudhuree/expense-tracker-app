import 'antd/dist/antd.css';
import "./App.css";
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
import Navbar from './components/Navbar';

function App() {
  return (
    <ExpenseTrackerProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
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
