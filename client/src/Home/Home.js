import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from '../utils/axiosConfig'
import "./Home.css";

const Home = () => {
  const [showLoupe, setShowLoupe] = useState(false);
  const [users, setUsers] = useState()

  useEffect(() => {
    const interval = setInterval(() => {
      setShowLoupe(true);
      setTimeout(() => {
        setShowLoupe(false);
      }, 180000);
    }, 3600000);

    return () => clearInterval(interval);
  }, []);

  const getUsers = async () => {
    const userList = await axios.get("http://localhost:3001/user")
    setUsers(userList.data.filter((user) => {
      return user.liveID !== null
    }))
  }

  useEffect(() => {
    getUsers()
  }, [])


  return (
    <div className="home">
      <div className="live-now-container">
        <h1>Live Now</h1>
      </div>
      <div className="live-now">
        {users && users.map((user) => {
          return (
            <Link to="/livestream" onClick={() => {
              localStorage.setItem("LiveID", user.liveID)
            }}>
              <div className="card">
                <img src={user.photo.path} />
              </div>
            </Link>
          )
        })}
        {/* <div className="card1"></div>
          <div className="card2"></div>
          <div className="card3"></div> */}
      </div>
      <div className="upcoming-lives-container">
        <h1>Upcoming</h1>
      </div>
      <div className="live-now">
        {/* <div className="card1"></div>
        <div className="card2"></div>
        <div className="card3"></div> */}
      </div>
      <div className={`loupe ${showLoupe ? "active" : ""}`}></div>
    </div>
  );
};

export default Home;
