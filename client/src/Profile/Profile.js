import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Products from "../Products/Products";
import fileAxios from "../utils/axiosFileConfig";
import axios from "../utils/axiosConfig";
import toast, { Toaster } from "react-hot-toast";
import { DatePicker, Space } from 'antd'
import "./Profile.css";
import ExcelUploader from "../Excel/Excel";
import OrderHistory from "./OrderHistory";

const Profile = () => {
  const [selected, setSelected] = useState("Info");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("User")));
  const [scheduleLive, setScheduleLive] = useState({
    startTime: "",
    endTime: ""
  })

  const { RangePicker } = DatePicker

  const getUser = async () => {
    const userInfo = await axios.get(
      `http://localhost:3001/user/${JSON.parse(localStorage.getItem("User"))._id
      }`
    );
    setUser(userInfo.data);
  };

  useEffect(() => {
    getUser();
  }, []);

  const uploadImage = async (e) => {
    const photo = e.target.files[0];
    const form = new FormData();
    form.append("file", photo);

    await fileAxios
      .patch(`http://localhost:3001/user/${user._id}`, form)
      .then((res) => {
        getUser();
        localStorage.setItem("User", JSON.stringify(user));
        toast.success("Image uploaded");
      })
      .catch((error) => {
        toast.error("Error uploading image");
      });
  };

  const onOk = (value) => {
    setScheduleLive({
      startTime: value[0].$d,
      endTime: value[1].$d
    })
  }
  return (
    <div>
      <div className="profilePage">
        <div className="profileHeaders">
          <h3
            onClick={() => setSelected("Info")}
            style={{
              borderBottom: selected === "Info" ? "5px solid #008080" : "",
              fontWeight: selected === "Info" ? "" : "bolder",
            }}
          >
            Basic Information
          </h3>
          <h3
            onClick={() => setSelected("History")}
            style={{
              borderBottom: selected === "History" ? "5px solid #008080" : "",
              fontWeight: selected === "History" ? "" : "bolder",
            }}
          >
            Order History
          </h3>
        </div>
        {selected === "Info" ? (
          <div className="infoSection">
            <div className="profileInfo">
              <h4>Name:</h4>
              <h4>{user?.name}</h4>
            </div>
            <div className="profileInfo">
              <h4>Email:</h4>
              <h4>{user?.email}</h4>
            </div>
            {user.role === "admin" || user.role === "seller" ? (
              <div className="profileInfo">
                <h4>Logo:</h4>
                {user?.photo ? (
                  <img src={user.photo.path} />
                ) : (
                  <input type="file" onChange={(e) => uploadImage(e)} />
                )}
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          <OrderHistory selection={selected} />
        )}
        <div className="separatorLine"></div>
        {user.role === "user" ? (
          <Link
            to="https://docs.google.com/forms/d/e/1FAIpQLSfHCmxvCDD7e4DIgn-8cENYDN90kZKrZJhNqfiYK94WwHVktg/viewform?usp=sf_link"
            className="applySection"
          >
            <h3>APPLY TO SELL ON WAX</h3>
          </Link>
        ) : (
          <div className="applySectionAlternate">
            <div style={{ width: "30%", textAlign: 'left' }}>
              <Link to="/livestream" className="livestream">
                Go Live
              </Link>
              <p className="scheduleLive">Schedule a live</p>
            </div>

            <h3 style={{ width: "30%" }}>YOU ARE ALREADY A SELLER</h3>
            <div style={{ width: "30%" }}>
              <RangePicker
                showTime={{ format: "HH:mm" }}
                format="MM-DD-YYYY HH:mm"
                onOk={onOk}
              />
            </div>
          </div>
        )}
      </div>

      {user.role === "admin" || user.role === "seller" ? (
        <div className="product-display">
          <h1>Products</h1>
          <ExcelUploader />
        </div>
      ) : (
        ""
      )}
      <Toaster />
    </div>
  );
};

export default Profile;
