import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { GetBookByIdPublic } from "../../api/books";
import { message, Card, Image, Rate, Descriptions, Badge, List, ConfigProvider } from "antd";
import moment from "moment";
import { GetReviewsByBookIdPublic } from "../../api/reviews";
import Button from "../../components/Button";

import "./bookDescription.css";
import { Helmet } from "react-helmet";

const BookDescriptionPublic = () => {

  const[reviews, setReviews] = useState([]);
  const [bookData, setBookData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const getBook = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetBookByIdPublic(id);
      const reviewResponse = await GetReviewsByBookIdPublic(id);
      setReviews(reviewResponse.data);
      dispatch(HideLoading());
      if (response.success) {
        setBookData(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };


  useEffect(() => {
    getBook();
  }, []);

  return (
    bookData && (
      <>
      <Helmet>
        <title>{`BookLendr - ${bookData?.title}`}</title>
      </Helmet>
        <div className="bookDetails">
          <div>
            <Image
              src={bookData?.image}
              className="bookDescriptionImage"
            />
          </div>
          <div>
            <div className="detailsBlock-1">
              <h1>{bookData?.title}</h1>
              <div className="mt-1">
              <Button title="Rent Book" onClick={() => {
                message.warning("Please Log in to rent a book");
                navigate('/login');
              }}/>
              </div>
            </div>
            <div className="detailsBlock-2">
              <Rate disabled allowHalf value={bookData?.rating || 0}/> <span>{`( ${reviews.length} )`}</span>
            </div>
            <div className="detailsBlock-3">
              <span>Stock </span>
              <Badge status={bookData?.availableCopies > 0 ? "success" : "error"} text={bookData?.availableCopies > 0 ? "Available" : "Out of Stock"} />
            </div>
            <div className="detailsBlock-4">
              <span>Genre : </span>
              <span>{bookData.genre}</span>
            </div>
            <div className="detailsBlock-5">
              <ConfigProvider
              theme={{
                components: {
                  Descriptions: {
                    labelBg: "#E1F2FF"
                  }
                },
              }}
              >
              <Descriptions
                bordered
                column={{
                  xs: 1,
                  sm: 1,
                  md: 1,
                  lg: 1,
                  xl: 1,
                  xxl: 1,
                }}
                items={[
                  {
                    label: "Description",
                    children: `${
                      bookData && bookData?.description?.substring(0, 300)
                    } ....`,
                  },
                  {
                    label: "Author",
                    children: `${bookData.author}`,
                  },
                  {
                    label: "Published Date",
                    children: `${moment(bookData.publishedDate).format(
                      "MMMM Do YYYY"
                    )}`,
                  },
                  {
                    label: "ISBN Number",
                    children: `${bookData.isbnNumber}`,
                  },
                ]}
              />
              </ConfigProvider>
            </div>
          </div>
        </div>

        <div className="reviewSection">
          <h3 className="reviewHeading">Reviews</h3>

          <div className="reviewCards">
            <List
              dataSource={reviews}
              grid={{ xs: 1, sm: 2, md: 2, lg: 3, xl: 4, xxl: 4 }}
              renderItem={(item) => {
                return (
                  <Card
                    title={item?.user?.name}
                    className="m-1 reviewCard"
                    extra={<Rate disabled defaultValue={item?.rating || 0} />}
                  >
                    <p className="text-sm">{item?.comment}</p>
                    <span className="text-sm reviewDate">{moment(item?.createdAt).format("DD-MM-YYYY")}</span>
                  </Card>
                );
              }}
            />
          </div>
        </div>
      </>
    )
  );
};

export default BookDescriptionPublic;
