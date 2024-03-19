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
import LiveStream from "./Livestream/Livestream";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/shop" element={<Shop />} />
          <Route exact path="/signin" element={<Signin />} />
          <Route exact path="/livestream" element={<LiveStream />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
