import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { GetAllBooks } from "../../api/books";
import { message, Card, List, Badge, Rate } from "antd";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const { Meta } = Card;

const Home = () => {
  const [books, setBooks] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getBooks = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllBooks();
      dispatch(HideLoading());
      if (response.success) {
        setBooks(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <>
      <Helmet>
        <title>BookLendr - Book Store</title>
      </Helmet>
      <List
        dataSource={books}
        grid={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }}
        renderItem={(item) => {
          return (
            <div className="m-1">
              <Badge.Ribbon
                text={item.availableCopies > 0 ? "Available" : "Out of stock"}
                color={item.availableCopies > 0 ? "green" : "red"}
              >
                <Card
                  onClick={() => navigate(`/book/${item._id}`)}
                  key={item._id}
                  hoverable
                  cover={
                    <img
                      className="image-card-book p-1"
                      alt="book-cover"
                      src={item.image}
                    />
                  }
                >
                  <Meta title={item.title} description={item.genre} />
                  <Rate disabled value={item.rating} className="mt-min" />
                </Card>
              </Badge.Ribbon>
            </div>
          );
        }}
      ></List>
    </>
  );
};

export default Home;
