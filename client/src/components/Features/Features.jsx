import React from "react";
import "./features.css";
import featureImage from "../../assets/features/featuresImage.png";
import icon1 from '../../assets/features/icon1.png';
import icon2 from '../../assets/features/icon2.png';
import icon3 from '../../assets/features/icon3.png';

const Features = () => {
  return (
    <section className="container-feature" id="features">
      <h2 className="title-heading-feature">Features</h2>
      <div className="content-feature">
        <img className="featureImage" src={featureImage} alt="feature-banner-img" />
        <ul className="featureItems">
          <li className="featureItem">
            <img src={icon1} alt="icon1" />
            <div className="featureItemText">
                <h3>Extensive Book Collections</h3>
                <p>Explore a vast library of books spanning various genres, authors, and topics ensuring there's something for every reader's taste</p>
            </div>
          </li>
          <li className="featureItem">
            <img src={icon2} alt="icon2" />
            <div className="featureItemText">
                <h3>Virtual Bookshelf</h3>
                <p>Offer users a virtual bookshelf where they can organize and manage their borrowed books</p>
            </div>
          </li>
          <li className="featureItem">
            <img src={icon3} alt="icon3" />
            <div className="featureItemText">
                <h3>Community Reviews and Ratings</h3>
                <p>Foster a vibrant community within the app by allowing users to leave reviews and ratings for the books they've read</p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Features;
