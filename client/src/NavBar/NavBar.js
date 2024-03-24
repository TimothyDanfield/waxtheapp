import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Divide as Hamburger } from 'hamburger-react'
import "./Navbar.css";

function Navbar() {
  const [user, setUser] = useState()
  const [showLinks, setShowLinks] = useState(false)
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [width, setWidth] = useState(window.innerWidth)
  window.addEventListener("resize", () => setWidth(window.innerWidth))

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("User")))
  }, [])

  const handleSearchChange = (event) => {
    if (event.key === "Enter") {
      console.log(event.target.value);
    }
  };

  const signOut = () => {
    localStorage.clear()
    setUser(null)
  }

  const isLoggedIn = (user) => {
    return user ? true : false
  }

  const isUserAdmin = (user) => {

  }

  return (

    <nav className="navbar">
      {width > 990 ?
        <ul>
          <li className="companyName">WAX</li>
          <li className="search">
            <input
              type="text"
              placeholder="Search for products"
              style={{ padding: "5px" }}
              onChange={handleSearchChange}
            />
          </li>
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/Shop" className="nav-link">
              Shop
            </Link>
          </li>
          <li>
            <a
              href="https://www.northlandbreaks.com/"
              target="_blank"
              className="nav-link"
            >
              Store
            </a>
          </li>
          <li>
            <Link to="/team" className="nav-link">
              Team
            </Link>
          </li>
          {isLoggedIn(user) ?
            <li>
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
            </li>
            :
            <li className="auth">
              <Link to="/signin" className="nav-link">
                Login/Signup
              </Link>
            </li>
          }
          {isLoggedIn(user) ?
            <li onClick={signOut}>
              <Link to="/signin" className="nav-link">
                Sign Out
              </Link>
            </li> : ""
          }
        </ul> :
        <ul>
          <li className="companyName">WAX</li>
          <li className="search">
            <input
              type="text"
              placeholder="Search for products"
              style={{ padding: "5px" }}
              onChange={handleSearchChange}
            />
          </li>
          <>
            <Hamburger
              toogled={showLinks}
              toggle={() => setTimeout(() => setShowLinks(!showLinks))}
              color="white"
            />
          </>
          {showLinks ?
            <ul className="links-mobile">
              <li>
                <Link to="/" className="nav-link" onClick={() => setShowLinks(!showLinks)}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/Shop" className="nav-link" onClick={() => setShowLinks(!showLinks)}>
                  Shop
                </Link>
              </li>
              <li>
                <a
                  href="https://www.northlandbreaks.com/"
                  target="_blank"
                  className="nav-link"
                >
                  Store
                </a>
              </li>
              <li>
                <Link to="/team" className="nav-link" onClick={() => setShowLinks(!showLinks)}>
                  Team
                </Link>
              </li>
              {isLoggedIn(user) ?
                <li>
                  <Link to="/profile" className="nav-link" onClick={() => setShowLinks(!showLinks)}>
                    Profile
                  </Link>
                </li>
                :
                <li>
                  <Link to="/signin" className="nav-link" onClick={() => setShowLinks(!showLinks)}>
                    Login/Signup
                  </Link>
                </li>
              }
              {isLoggedIn(user) ?
                <li onClick={signOut}>
                  <Link to="/signin" className="nav-link" onClick={() => setShowLinks(!showLinks)}>
                    Sign Out
                  </Link>
                </li> : ""
              } </ul> : ""}
        </ul>
      }
    </nav>
  );
}

export default Navbar;
