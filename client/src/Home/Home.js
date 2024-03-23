import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [showLoupe, setShowLoupe] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowLoupe(true);
      setTimeout(() => {
        setShowLoupe(false);
      }, 180000);
    }, 3600000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home">
      <div className="live-now-container">
        <h1>Live Now</h1>
      </div>
      <Link to="/livestream">
        <div className="live-now">
          <div className="card1"></div>
          <div className="card2"></div>
          <div className="card3"></div>
        </div>
      </Link>
      <div className="upcoming-lives-container">
        <h1>Upcoming</h1>
      </div>
      <div className="live-now">
        <div className="card1"></div>
        <div className="card2"></div>
        <div className="card3"></div>
      </div>
      <div className={`loupe ${showLoupe ? "active" : ""}`}></div>
    </div>
  );
};

export default Home;
