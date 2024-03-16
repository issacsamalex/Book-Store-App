import React, { useEffect, useState } from "react";
import "./books.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import BookCarousel from "./BookCarousel";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { GetAllBooks, GetAllBooksPublic } from "../../api/books";
import { message } from "antd";

const Books = () => {

  const [books, setBooks] = useState([]);
  const dispatch = useDispatch();


  const getBooks = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllBooksPublic();
      dispatch(HideLoading());
      if (response.success) {
        setBooks(response.data.slice(0, 20).sort(() => Math.random() - 0.5));
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };


  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1440 },
      items: 4,
      slidesToSlide: 4,
      partialVisibilityGutter: 10,
    },
    LargeDesktop:{
      breakpoint: { max: 1440, min: 1024},
      items: 4,
      slidesToSlide: 4,
      partialVisibilityGutter: 10,
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 3,
      slidesToSlide: 3,
      partialVisibilityGutter: 10,
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 2,
      slidesToSlide: 2,
      partialVisibilityGutter: 40,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };



  useEffect(() => {
    getBooks()
  }, [])

  const bookData = books.map((item, id) => <BookCarousel key={id} title={item.title} genre={item.genre} img={item.image} bookId={item._id} />)

  
  

  return (
    <section className="container-card" id="books">
      <h2 className="title-card">Trending Books</h2>
      <div className="box-card">
        <Carousel responsive={responsive} partialVisible={true} customTransition="transform 600ms ease-in-out">
          {bookData}
        </Carousel>
      </div>
    </section>
  );
};

export default Books;
