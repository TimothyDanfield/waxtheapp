import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [user, setUser] = useState();
  const [window, setWindow] = useState();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("User")));
  }, []);

  const handleSearchChange = (event) => {
    if (event.key === "Enter") {
      console.log(event.target.value);
    }
  };

  const signOut = () => {
    localStorage.clear();
    setUser(null);
  };

  const isLoggedIn = (user) => {
    return user ? true : false;
  };

  const isUserAdmin = (user) => {};

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
        {isLoggedIn(user) ? (
          <li>
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
          </li>
        ) : (
          <li className="auth">
            <Link to="/signin" className="nav-link">
              Login/Signup
            </Link>
          </li>
        )}
        {isLoggedIn(user) ? (
          <li onClick={signOut}>
            <Link to="/signin" className="nav-link">
              Sign Out
            </Link>
          </li>
        ) : (
          ""
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
