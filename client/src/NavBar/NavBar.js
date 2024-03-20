import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const handleSearchChange = (event) => {
    if (event.key === "Enter") {
      console.log(event.target.value);
    }
  };

  return (
    <nav className="navbar">
      <ul>
        <li>WAX</li>
        <li className="search">
          <input
            type="text"
            placeholder="Search for products"
            style={{ padding: "5px" }}
            onChange={handleSearchChange}
          />
        </li>
        <li>
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/Shop" className="nav-link">
            Shop
          </Link>
        </li>
        <li>
          <a
            href="https://www.northlandbreaks.com/"
            target="_blank"
            className="nav-link"
          >
            Store
          </a>
        </li>
        <li>
          <Link to="/team" className="nav-link">
            Team
          </Link>
        </li>
        <li className="auth">
          <Link to="/signin" className="nav-link">
            Login/Signup
          </Link>
        </li>
        <li>
          <Link to="/profile" className="nav-link">
            Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
