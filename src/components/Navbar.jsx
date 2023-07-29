import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useClearLocalStorage } from "../hook/localStoregeHook";

export default function Navbar() {
  const clearAllExpenseHistory = useClearLocalStorage();
  const navigate = useNavigate();
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light py-3 static-top">
        <div className="container">
          <NavLink to="/" className="navbar-brand" href="#">
            Your Money Tracker
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink
                  to="/income"
                  className="nav-link "
                  aria-current="page"
                  href="#"
                >
                  Income
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/expense"
                  className="nav-link "
                  aria-current="page"
                  href="#"
                >
                  Expense
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/summary"
                  className="nav-link "
                  aria-current="page"
                  href="#"
                >
                  Summary
                </NavLink>
              </li>
              <l className="nav-item">
                <button
                  onClick={() => {
                    clearAllExpenseHistory("expense-tracker");
                    navigate("/");
                    window.location.reload();
                  }}
                  className="nav-link "
                  aria-current="page"
                  href="#"
                >
                  Clear All Data
                </button>
              </l>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
