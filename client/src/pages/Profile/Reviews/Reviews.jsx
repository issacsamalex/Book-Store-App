import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";
import { DeleteReview, GetReviewsByUserId } from "../../../api/reviews";
import { Rate, Table, message, ConfigProvider, Popconfirm, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import moment from "moment";
import ReviewForm from "../BorrowedBooks/ReviewForm";

const Reviews = () => {
  const [selectedReview, setSelectedReview] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviews, setReviews] = useState([]);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const reviewResponse = await GetReviewsByUserId(user._id);
      setReviews(reviewResponse.data);
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const deleteReview = async (review) => {
    try {
        dispatch(ShowLoading());
        const response = await DeleteReview({
            _id: review._id,
            book: review.book._id,
        })
        message.success(response.message);
        getData();
        dispatch(HideLoading());
    } catch (error) {
        dispatch(HideLoading());
        message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      title: "Book",
      dataIndex: "book",
      render: (text, record) => record.book.title,
    },
    {
      title: "Rating",
      dataIndex: "rating",
      render: (text, record) => (
        <Rate disabled allowHalf value={record.rating} />
      ),
    },
    {
      title: "Review",
      dataIndex: "comment",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (text, record) => moment(record.createdAt).format("DD-MM-YYYY"),
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="flex gap-2 cursor-pointer">
            <Popconfirm title="Sure to delete?" onConfirm={() => deleteReview(record)}>
              <Tooltip
              title="Delete"
              color="red"
              placement="bottom"
              >
              <DeleteOutlined className="btn-danger-color" />
              </Tooltip>
            </Popconfirm>
            <Tooltip
            title="Edit"
            color="orange"
            placement="bottom"
            >
            <EditOutlined
            onClick={() => {
                setSelectedReview(record);
                setShowReviewForm(true);
            }}
            />
            </Tooltip>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#E1F2FF",
              rowHoverBg: "#F7FBFF",
            },
          },
          token: {
            colorPrimary: "#3F76A7",
          },
        }}
      >
        <Table dataSource={reviews} columns={columns} />
      </ConfigProvider>

      {showReviewForm && 
      <ReviewForm
      showReviewForm={showReviewForm}
      setShowReviewForm={setShowReviewForm}
      selectedReview={selectedReview}
      reloadData={getData}
      bookData={selectedReview.book}
      />
      }
    </div>
  );
};

export default Reviews;
