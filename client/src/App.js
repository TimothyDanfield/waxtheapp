import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./NavBar/NavBar";
import Shop from "./Shop/Shop";
import Home from "./Home/Home";
import Team from "./Team/Team";
import Signin from "./components/Signin/Signin";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/shop" element={<Shop />} />
          <Route exact path="/signin" element={<Signin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
