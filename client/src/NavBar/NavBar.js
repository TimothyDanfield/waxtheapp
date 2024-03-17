import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li className="search">
          <input
            type="text"
            placeholder="Search for products"
            style={{ padding: "5px" }}
          />
        </li>
        <li>
          <Link to="/Home" className="nav-link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/Shop" className="nav-link">
            Shop
          </Link>
        </li>
        <li>
          <Link to="/store" className="nav-link">
            Store
          </Link>
        </li>
        <li>
          <Link to="/team" className="nav-link">
            Team
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
