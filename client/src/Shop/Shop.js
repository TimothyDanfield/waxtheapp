import React from "react";
import { Link } from "react-router-dom";
import "./Shop.css"; // Import the Shop.css file

function Shop() {
  return (
    <div className="shop-container">
      <a
        href="https://www.northlandbreaks.com"
        className="shop-box"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="shop-content"></div>
      </a>
    </div>
  );
}

export default Shop;
