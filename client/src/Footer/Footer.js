import React from "react";
import { FaInstagram, FaTwitter } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <p className="footer-text">WAX</p>
      </div>
      <div className="footer-right">
        <a
          href="https://www.instagram.com/northlandbreaks/"
          target="_blank"
          rel="noreferrer"
        >
          <FaInstagram />
        </a>
        <a
          href="https://twitter.com/NorthlandBreaks"
          target="_blank"
          rel="noreferrer"
        >
          <FaTwitter />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
