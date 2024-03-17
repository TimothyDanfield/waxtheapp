import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to Live Now</h1>
      <div className="live-now">
        <div className="card">
          <h2>Event Title 1</h2>
          <p>Description of the event...</p>
          <p>Date and Time</p>
        </div>
        <div className="card">
          <h2>Event Title 2</h2>
          <p>Description of the event...</p>
          <p>Date and Time</p>
        </div>
        <div className="card">
          <h2>Event Title 3</h2>
          <p>Description of the event...</p>
          <p>Date and Time</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
