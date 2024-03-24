import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  MeetingProvider,
  MeetingConsumer,
  useMeeting,
  useParticipant,
} from "@videosdk.live/react-sdk";
import Navbar from "./NavBar/NavBar";
import Shop from "./Shop/Shop";
import Home from "./Home/Home";
import Team from "./Team/Team";
import Signin from "./components/Signin/Signin";
import Footer from "./Footer/Footer";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import LiveStream from "./Livestream/Livestream";
import Profile from "./Profile/Profile";
import Products from "./Products/Products";
import UserRoutes from "./utils/PrivateRoutes/UserRoutes";
import AdminRoutes from "./utils/PrivateRoutes/AdminRoutes";
import SignedInRoutes from './utils/PrivateRoutes/SignedInRoutes'

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/shop" element={<Shop />} />
          <Route element={<SignedInRoutes />}>
            <Route exact path="/signin" element={<Signin />} />
            <Route exact path="/forgotpassword" element={<ForgotPassword />} />
          </Route>
          <Route element={<UserRoutes />}>
            <Route exact path="/livestream" element={<LiveStream />} />
            <Route exact path="/profile" element={<Profile />} />
          </Route>
          <Route element={<AdminRoutes />}>

          </Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
