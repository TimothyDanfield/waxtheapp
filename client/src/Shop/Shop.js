import React, { useState } from "react";
import { Link } from "react-router-dom";
import { parse } from "papaparse";
import "./Shop.css";

function Shop() {
  const [data, setData] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    parse(file, {
      header: true,
      complete: (results) => {
        setData(results.data);
      },
      error: (error) => {
        console.error("Error parsing file:", error);
      },
    });
  };

  return (
    <div className="shop-container">
      <input type="file" onChange={handleFileUpload} />
      <div className="shop-box">
        {data.map((item, index) => (
          <div key={index} className="shop-item">
            <h3>{item.partNumber}</h3>
            <p>{item.partDescription}</p>
            <p>QTY: {item.qty}</p>
            <p>Price: ${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shop;
