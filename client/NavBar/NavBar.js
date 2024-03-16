import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const navbarStyle = {
    backgroundColor: "black",
    color: "white",
    padding: "10px",
    marginBottom: "20px",
    textAlign: "center",
  };

  return (
    <nav style={navbarStyle}>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        <li style={{ display: "inline-block", marginRight: "20px" }}>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            Home
          </Link>
        </li>
        <li style={{ display: "inline-block", marginRight: "20px" }}>
          <Link to="/Shop" style={{ color: "white", textDecoration: "none" }}>
            Shop
          </Link>
        </li>
        <li style={{ display: "inline-block", marginRight: "20px" }}>
          <Link to="/store" style={{ color: "white", textDecoration: "none" }}>
            Store
          </Link>
        </li>
        <li style={{ display: "inline-block" }}>
          <Link to="/team" style={{ color: "white", textDecoration: "none" }}>
            Team
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
