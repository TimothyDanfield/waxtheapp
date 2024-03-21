import React, { useState } from "react";
import { Link } from "react-router-dom";
import Products from "../Products/Products";
import "./Profile.css";

const Profile = () => {
  const [selected, setSelected] = useState("Info");

  return (
    <div className="profilePage">
      <div className="profileHeaders">
        <h3
          onClick={() => setSelected("Info")}
          style={{
            borderBottom: selected === "Info" ? "5px solid #008080" : "",
            fontWeight: selected === "Info" ? "" : "bolder"
          }}
        >
          Basic Information
        </h3>
        <h3
          onClick={() => setSelected("History")}
          style={{
            borderBottom: selected === "History" ? "5px solid #008080" : "",
            fontWeight: selected === "History" ? "" : "bolder"
          }}
        >
          Order History
        </h3>
      </div>
      {selected === 'Info' ?
        <div className="infoSection">
          <div className="profileInfo">
            <h4>Name:</h4>
            <h4>Nathan</h4>
          </div>
          <div className="profileInfo">
            <h4>Email:</h4>
            <h4>nathan.grandinette@gmail.com</h4>
          </div>
        </div>
        : 
        <div className="orderHistory">
          <h2>No orders to display</h2>
          <div>You don't seem to have any orders</div>
        </div>
        }
      <div className="separatorLine"></div>
      <Link to="https://docs.google.com/forms/d/e/1FAIpQLSfHCmxvCDD7e4DIgn-8cENYDN90kZKrZJhNqfiYK94WwHVktg/viewform?usp=sf_link" className="applySection">
        <h3>APPLY TO SELL ON WAX</h3>
      </Link>
      <Link to="/livestream" className="livestream">
        Go Live
      </Link>
      <div>
        <Products />
      </div>
      
    </div>
  );
};

export default Profile;
