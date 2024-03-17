import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <div className="live-now-container">
        <h1>Live Now</h1>
      </div>
      <div className="live-now">
        <div className="card1"></div>
        <div className="card2"></div>
        <div className="card3"></div>
      </div>
      <div className="upcoming-lives-container">
        <h1>Upcoming</h1>
      </div>
      <div className="live-now">
        <div className="card1"></div>
        <div className="card2"></div>
        <div className="card3"></div>
      </div>
    </div>
  );
};

export default Home;
