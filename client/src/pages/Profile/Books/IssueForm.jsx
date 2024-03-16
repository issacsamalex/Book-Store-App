import { Modal, message } from "antd";
import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import moment from "moment";
import { GetUserById } from "../../../api/users";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";
import { EditIssue, IssueBook } from "../../../api/books";

const IssueForm = ({
  open = false,
  setOpen,
  selectedBook,
  setSelectedBook,
  getData,
  selectedIssue,
  type,
}) => {
  const { user } = useSelector((state) => state.users);
  const [validated, setValidated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const [userId, setUserId] = useState(
    type === "renew" ? selectedIssue.user._id : ""
  );
  const [returnDate, setReturnDate] = useState(
    type === "renew"
      ? moment(selectedIssue.returnDate).format("YYYY-MM-DD")
      : ""
  );
  const dispatch = useDispatch();

  // Function for validating the user
  const validate = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetUserById(userId);
      if (response.success) {
        if (response.data.role !== "user") {
          setValidated(false);
          setErrMsg("Entered details are not user details");
          dispatch(HideLoading());
          return;
        } else {
          setUserData(response.data);
          setValidated(true);
          setErrMsg("");
        }
      } else {
        setValidated(false);
        setErrMsg(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      setValidated(false);
      setErrMsg(error.message);
    }
  };

  // Function for issuing a book
  const onIssue = async () => {
    try {
      dispatch(ShowLoading());
      let response = null;
      if(type !== "renew"){
        response = await IssueBook({
            book: selectedBook._id,
            user: userData._id,
            issueDate: new Date(),
            returnDate,
            rent:
              moment(returnDate).diff(moment(), "days") * selectedBook?.rentPerDay,
            fine: 0,
            issuedBy: user._id,
          });
      }else {
        response = await EditIssue({
            book : selectedBook._id,
            user : userData._id,
            issueDate : selectedIssue.issueDate,
            returnDate,
            rent:
              moment(returnDate).diff(moment(), "days") * selectedBook?.rentPerDay,
            fine: 0,
            issuedBy: user._id,
            _id : selectedIssue._id,
        });
      };
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        getData();
        setUserId("");
        setReturnDate("");
        setValidated(false);
        setErrMsg("");
        setSelectedBook(null);
        setOpen(false);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (type === "renew") {
      validate();
    }
  }, [open]);

  return (
    <Modal open={open} onCancel={() => setOpen(false)} footer={null}>
      <div className="flex flex-col gap-2">
        <h1 className="text-secondary font-bold text-xl text-center">
          {type === "renew" ? "Issue Renewal - Form" : "Issue New Book - Form"}
        </h1>
        <div>
          <span>User Id</span>
          <input
            type="text"
            value={userId}
            onChange={(event) => setUserId(event.target.value)}
            placeholder="User Id"
            disabled={type === "renew"}
          />
        </div>
        <div>
          <span>Return Date</span>
          <input
            type="date"
            value={returnDate}
            onChange={(event) => setReturnDate(event.target.value)}
            placeholder="Return Date"
            min={moment().format("YYYY-MM-DD")}
          />
        </div>

        {errMsg && <span className="error-msg">{errMsg}</span>}

        {validated && (
          <div className="flex justify-between modal-msg-card">
            <div className="flex flex-col">
              <h1 className="font-bold">Name : </h1>
              <h1 className="font-bold">Number of Days : </h1>
              <h1 className="font-bold">Rent per Day : </h1>
              <h1 className="font-bold">Rent : </h1>
            </div>
            <div className="flex flex-col pr-2">
              <h2>{userData.name}</h2>
              <h2>{moment(returnDate).diff(moment(), "days") || 0}</h2>
              <h2>{selectedBook.rentPerDay} Rs</h2>
              <h2>
                {moment(returnDate).diff(moment(), "days") *
                  selectedBook?.rentPerDay || 0}{" "}
                Rs
              </h2>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-2">
          <Button
            title="Cancel"
            variant="flat"
            onClick={() => setOpen(false)}
          />

          {type === "add" && (
            <Button
              title="Validate"
              disabled={userId === "" || returnDate === "" || validated}
              onClick={validate}
            />
          )}

          {validated && (
            <Button
              title={type === "renew" ? "Update" : "Issue"}
              disabled={userId === "" || returnDate === ""}
              onClick={onIssue}
            />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default IssueForm;
