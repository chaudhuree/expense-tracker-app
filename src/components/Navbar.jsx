import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
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
                <NavLink to="/income" className="nav-link " aria-current="page" href="#">
                  Income
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/expense" className="nav-link " aria-current="page" href="#">
                  Expense
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/summary" className="nav-link " aria-current="page" href="#">
                  Summary
                </NavLink>
              </li>
              </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
