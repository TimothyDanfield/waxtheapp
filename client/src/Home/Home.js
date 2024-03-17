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
      <div className="upcoming-lives-container">
        <h1>Upcoming</h1>
      </div>
      <div className="live-now">
        <div className="card">
          <h2>Upcoming Event Title 1</h2>
          <p>Description of the upcoming event...</p>
          <p>Date and Time</p>
        </div>
        <div className="card">
          <h2>Upcoming Event Title 2</h2>
          <p>Description of the upcoming event...</p>
          <p>Date and Time</p>
        </div>
        <div className="card">
          <h2>Upcoming Event Title 3</h2>
          <p>Description of the upcoming event...</p>
          <p>Date and Time</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
