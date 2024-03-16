import React from "react";
import "./contact.css";
import {
  FacebookOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  InstagramOutlined,
  HeartFilled,
} from "@ant-design/icons";
import Brandlogo from "../../assets/logo/book_3145755.png";
import BrushIcon from "../../assets/logo/paint-brush_6755959.png";

const Contact = () => {
  return (
    <footer className="footer-container" id="contact">
      <div className="footer">
        <div className="logo">
          <img src={Brandlogo} alt="app-logo" />
          <h4>BookLendr</h4>
        </div>
        <ul className="socials">
          <li>
            <a href="https://www.facebook.com/">
              <FacebookOutlined />
            </a>
          </li>
          <li>
            <a href="https://www.twitter.com/">
              <TwitterOutlined />
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/">
              <LinkedinOutlined />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/">
              <InstagramOutlined />
            </a>
          </li>
        </ul>
        <div className="copyright">
          <span>Copyright &copy; 2024 BookLendr</span>
        </div>
        <div className="designedBy flex items-center">
          <img src={BrushIcon} alt="icon" />
         <p>
            <a href="https://www.linkedin.com/in/issacsamalex/">
            designed by Issac Sam Alex
            </a>
          </p>
         </div>
      </div>
    </footer>
  );
};

export default Contact;
