import React from "react";
import { useNavigate } from "react-router-dom";

const BookCarousel = (props) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="book-card">
        <div className="image-box">
          <img className="image-card cursor-pointer" onClick={() => navigate(`/book/public/${props.bookId}`)} src={props.img} alt="book-img" />
        </div>
        <h3 className="book-title">{props.title}</h3>
        <p className="book-genre">{`Genre: ${props.genre}`}</p>
        <div className="book-links">
          <button
            className="book-link"
            onClick={() => navigate(`/book/public/${props.bookId}`)}
          >
            View more
          </button>
        </div>
      </div>
    </>
  );
};

export default BookCarousel;
