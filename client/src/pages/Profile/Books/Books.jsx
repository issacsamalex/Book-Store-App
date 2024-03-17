import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import BookForm from "./BookForm";
import { useDispatch } from "react-redux";
import { DeleteBook, GetAllBooks } from "../../../api/books";
import { Table, message, ConfigProvider, Tooltip, Popconfirm } from "antd";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";
import Issues from "./Issues";
import IssueForm from "./IssueForm";
import ReviewModal from "./ReviewModal";

const Books = () => {
  const [formType, setFormType] = useState("add");
  const [selectedBook, setSelectedBook] = useState(null);
  const [openBookForm, setOpenBookForm] = useState(false);
  const [openIssues, setOpenIssues] = useState(false);
  const [openIssuesForm, setOpenIssuesForm] = useState(false);
  const [openReview, setOpenReview] = useState(false);
  const [books, setBooks] = useState([]);
  const dispatch = useDispatch();

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

  // Function for deleting book
  const deleteBook = async (id) => {
    try {
      dispatch(ShowLoading());
      const response = await DeleteBook(id);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        getBooks();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Book",
      dataIndex: "image",
      render: (image) => <img src={image} alt="book" width="60" height="80" />,
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Genre",
      dataIndex: "genre",
    },
    {
      title: "Language",
      dataIndex: "languages",
    },
    {
      title: "Author",
      dataIndex: "author",
    },
    {
      title: "Total Copies",
      dataIndex: "totalCopies",
    },
    {
      title: "Available Copies",
      dataIndex: "availableCopies",
    },
    {
      title: "Rented Count",
      render: (data) => data.totalCopies - data.availableCopies
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (text, record) => (
        <div className="flex gap-2 cursor-pointer items-center">
          <Popconfirm
          title="Sure to delete?"
          onConfirm={() => deleteBook(record._id)}
          >
          <Tooltip
          title="Delete"
          color="red"
          placement="bottom"
          >
          <DeleteOutlined
            className="btn-danger-color"
          />
          </Tooltip>
          </Popconfirm>

          <Tooltip
          title="Edit"
          color="orange"
          placement="bottom"
          >
          <EditOutlined
            onClick={() => {
              setFormType("edit");
              setSelectedBook(record);
              setOpenBookForm(true);
            }}
          />
          </Tooltip>
          <span
            className="underline"
            onClick={() => {
              setOpenIssues(true);
              setSelectedBook(record);
            }}
          >
            Issues
          </span>

          <span
          className="underline"
          onClick={() => {
            setOpenIssuesForm(true);
            setSelectedBook(record);
          }}
          >
            Issue New Book
          </span>

          <Button
          title="Reviews"
          variant="outlined"
          color="secondary"
          onClick={() => {
            setOpenReview(true);
            setSelectedBook(record);
          }}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-end">
        <Button
          title="Add Book"
          onClick={() => {
            setFormType("add");
            setSelectedBook(null);
            setOpenBookForm(true);
          }}
        />
      </div>

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
      <Table pagination={{ pageSize: 5, position: ["bottomRight"] }} columns={columns} dataSource={books} className="mt-1" />
      </ConfigProvider>  

      {openBookForm && (
        <BookForm
          open={openBookForm}
          setOpen={setOpenBookForm}
          reloadBooks={getBooks}
          formType={formType}
          selectedBook={selectedBook}
          setSelectedBook={setSelectedBook}
        />
      )}

      {openIssues && (
        <Issues
          open={openIssues}
          setOpen={setOpenIssues}
          selectedBook={selectedBook}
          setSelectedBook={setSelectedBook}
          reloadBooks={getBooks}
        />
      )}

      {openIssuesForm && (
        <IssueForm
            open={openIssuesForm}
            setOpen={setOpenIssuesForm}
            selectedBook={selectedBook}
            setSelectedBook={setSelectedBook}
            getData={getBooks}
            type="add"
        />
      )}

      {openReview && (
        <ReviewModal
        open={openReview}
        setOpen={setOpenReview}
        selectedBook={selectedBook}
        />
      )}
    </div>
  );
};

export default Books;
