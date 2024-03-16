import { Modal, Table, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { DeleteIssue, GetIssues, ReturnBook } from "../../../api/books";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";
import moment from "moment";
import Button from "../../../components/Button";
import IssueForm from "./IssueForm";

const Issues = ({ open = false, setOpen, selectedBook, reloadBooks }) => {
  const dispatch = useDispatch();
  const [issues, setIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [showIssueForm, setShowIssueForm] = useState(false);

  const getIssues = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetIssues({
        book: selectedBook._id,
      });
      dispatch(HideLoading());
      if (response.success) {
        setIssues(response.data);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getIssues();
  }, []);

  const onReturnHandler = async (issue) => {
    try {
      // Check if the book is returned before due date
      const today = moment().format("YYYY-MM-DD");
      const dueDate = moment(issue.returnDate).format("YYYY-MM-DD");
      if (today > dueDate) {
        // book is returned after due date
        // calculate the fine
        const fine = moment(today).diff(dueDate, "days") * 3;
        issue.fine = fine;
      }
      issue.returnedDate = new Date();
      issue.book = issue.book._id;
      dispatch(ShowLoading());
      const response = await ReturnBook(issue);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        getIssues();
        reloadBooks();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const deleteIssueHandler = async (issue) => {
    try {
      dispatch(ShowLoading());
      const response = await DeleteIssue({
        ...issue,
        book: issue.book._id,
      });
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        getIssues();
        reloadBooks();
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
      title: "Issue Id",
      dataIndex: "_id",
    },
    {
      title: "User",
      dataIndex: "user",
      render: (user) => user?.name,
    },
    {
      title: "Issued On",
      dataIndex: "issueDate",
      render: (issueDate) => moment(issueDate).format("DD-MM-YYYY"),
    },
    {
      title: "Return Date(due date)",
      dataIndex: "returnDate",
      render: (returnDate) => moment(returnDate).format("DD-MM-YYYY"),
    },
    {
      title: "Amount",
      dataIndex: "rent",
      render: (rent, record) => (
        <div className="flex flex-col">
          <span>Rent : {record.rent} Rs</span>
          <span>Fine : {record.fine || 0} Rs</span>
        </div>
      ),
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
      dataIndex: "action",
      render: (action, record) => {
        return (
          !record.returnedDate && (
            <div className="flex gap-1">
              <Button
                title="Close Issue"
                onClick={() => onReturnHandler(record)}
              />
              <Button
                title="Renew"
                variant="outlined"
                onClick={() => {
                  setSelectedIssue(record);
                  setShowIssueForm(true);
                }}
              />
              <DeleteOutlined
                className="btn-danger-color cursor-pointer"
                onClick={() => deleteIssueHandler(record)}
              />
            </div>
          )
        );
      },
    },
  ];

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      width={1400}
    >
      <h1 className="text-secondary font-bold text-xl text-center mb-1">
        Book Issuance Log of {selectedBook.title}
      </h1>
      <Table columns={columns} dataSource={issues} />

      {showIssueForm && (
        <IssueForm
          selectedBook={selectedBook}
          selectedIssue={selectedIssue}
          open={showIssueForm}
          setOpen={setShowIssueForm}
          setSelectedBook={() => {}}
          getData={() => {
            getIssues();
            reloadBooks();
          }}
          type="renew"
        />
      )}
    </Modal>
  );
};

export default Issues;
