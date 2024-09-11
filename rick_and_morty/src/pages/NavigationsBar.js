import React from "react";
import { Link, NavLink } from "react-router-dom";
import RickAndMortyLogo from "../images/logo.png";

export default function NavigationBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          <img
            src={RickAndMortyLogo}
            alt="Rick and Morty Logo"
            style={{ height: "40px" }}
          />
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/locations"
                activeClassName="active"
              >
                Locations
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/character"
                activeClassName="active"
              >
                Characters
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
