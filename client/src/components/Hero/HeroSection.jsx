import React from "react";
import "./heroSection.css";
import heroImage from '../../assets/hero/heroImage.png'
import { useNavigate } from "react-router-dom";

const HeroSection = () => {

    const navigate = useNavigate();

  return (
    <section className="container">
      <div className="content">
        <h1 className="title-heading">Connect, Borrow, Read: Your Bookshelf On Demand</h1>
        <p className="title-description">BookLendr is your gateway to a limitless library experience.</p>
        <div className="btn-container">
        <button onClick={() => navigate('/signup')} className="primary-btn">Sign up</button>
        <button onClick={() => navigate('/login')} className="secondary-btn">Log in</button>
        </div>
      </div>
      <img className="hero-img" src={heroImage} alt="hero" />
      <div className="topBlur"/>
      <div className="bottomBlur"/>
    </section>
  );
};

export default HeroSection;
