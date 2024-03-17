import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./NavBar/NavBar";
import Shop from "./Shop/Shop";
import Home from "./Home/Home";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/shop" element={<Shop />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
