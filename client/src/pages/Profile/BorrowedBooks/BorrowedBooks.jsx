import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";
import { GetIssues } from "../../../api/books";
import moment from "moment";
import { Table, message, ConfigProvider } from "antd";
import Button from "../../../components/Button";
import ReviewForm from "./ReviewForm";

const BorrowedBooks = () => {
  const { user } = useSelector((state) => state.users);
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [book, setBook] = useState();

  const dispatch = useDispatch();

  const getIssues = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetIssues({
        user: user._id,
      });
      dispatch(HideLoading());
      if (response.success) {
        setIssuedBooks(response.data);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getIssues();
  }, []);

  const columns = [
    {
      title: "Issue Id",
      dataIndex: "_id",
    },
    {
      title: "Book",
      dataIndex: "book",
      render: (book) => book.title,
    },
    {
      title: "Issued On",
      dataIndex: "issueDate",
      render: (issueDate) => moment(issueDate).format("DD-MM-YYYY"),
    },
    {
      title: "Return Date(due date)",
      dataIndex: "returnDate",
      render: (returndate) => moment(returndate).format("DD-MM-YYYY"),
    },
    {
      title: "Rent",
      dataIndex: "rent",
    },
    {
      title: "Fine",
      dataIndex: "fine",
    },
    {
      title: "Returned On",
      dataIndex: "returnedDate",
      render: (returnedDate) => {
        if (returnedDate) {
          return moment(returnedDate).format("DD-MM-YYYY");
        } else {
          return "Pending Return";
        }
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (actions, record) => (
        <div>
          <Button
            title="Add review"
            onClick={() => {
              setBook(record.book._id);
              setShowReviewForm(true);
            }}
          />
        </div>
      ),
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
      <Table columns={columns} dataSource={issuedBooks} />
      </ConfigProvider>
      {showReviewForm && (
        <ReviewForm
          book={book}
          showReviewForm={showReviewForm}
          setShowReviewForm={setShowReviewForm}
        />
      )}
    </div>
  );
};

export default BorrowedBooks;
