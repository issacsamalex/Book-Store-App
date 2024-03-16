import { Col, Form, Modal, Row, message } from "antd";
import React from "react";
import Button from "../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { AddBook, UpdateBook } from "../../../api/books";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";

const BookForm = ({
  open,
  setOpen,
  reloadBooks,
  formType,
  selectedBook,
  setSelectedBook,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      values.createdBy = user._id;
      let response = null;
      if(formType === "add") {
        values.availableCopies = values.totalCopies;
        response = await AddBook(values);
      }else {
        values._id = selectedBook._id;
        response = await UpdateBook(values);
      }
      if (response.success) {
        message.success(response.message);
        reloadBooks();
        setOpen(false);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <Modal
      title={formType === "add" ? "Add Book" : "Update Book"}
      open={open}
      onCancel={() => setOpen(false)}
      centered
      width={800}
      footer={null}
    >
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          ...selectedBook,
          publishedDate: selectedBook?.publishedDate
            ? new Date(selectedBook?.publishedDate).toISOString().split("T")[0]
            : null,
        }}
      >
        <Row gutter={[20]}>
          <Col span={24}>
            <Form.Item
              label="Title"
              name="title"
              rules={[
                {
                  required: true,
                  message: "Please enter book title",
                },
              ]}
            >
              <input type="text" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Author"
              name="author"
              rules={[
                {
                  required: true,
                  message: "Please enter author name",
                },
              ]}
            >
              <input type="text" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please enter book description",
                },
              ]}
            >
              <textarea type="text" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Image URL"
              name="image"
              rules={[
                {
                  required: true,
                  message: "Please enter book image URL",
                },
              ]}
            >
              <input type="text" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Genre"
              name="genre"
              rules={[
                {
                  required: true,
                  message: "Please select genre",
                },
              ]}
            >
              <select>
                <option value="">Select Genre</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Fiction">Fiction</option>
                <option value="Non-fiction">Non-Fiction</option>
                <option value="Biography">Biography</option>
                <option value="Mystery & Thriller">Mystery & Thriller</option>
                <option value="Romance">Romance</option>
                <option value="History">History</option>
              </select>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Languages"
              name="languages"
              rules={[
                {
                  required: true,
                  message: "please select languages",
                },
              ]}
            >
              <select>
                <option value="">Select Languages</option>
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="Japanese">Japanese</option>
                <option value="French">French</option>
                <option value="Portuguese">Portuguese</option>
                <option value="Italian">Italian</option>
              </select>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Published Date"
              name="publishedDate"
              rules={[
                {
                  required: true,
                  message: "Please enter published date",
                },
              ]}
            >
              <input type="date" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Rental Period"
              name="rentalPeriod"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <input type="text" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Rent Per Day"
              name="rentPerDay"
              rules={[
                {
                  required: true,
                  message: "Please enter rent per day",
                },
              ]}
            >
              <input type="number" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Total Copies"
              name="totalCopies"
              rules={[
                {
                  required: true,
                  message: "Please enter total copies",
                },
              ]}
            >
              <input type="number" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="ISBN Number"
              name="isbnNumber"
              rules={[
                {
                  required: true,
                  message: "Please enter ISBN Number",
                },
              ]}
            >
              <input type="text" />
            </Form.Item>
          </Col>
        </Row>

        <div className="flex justify-end gap-2 mt-1">
          <Button
            type="button"
            variant="flat"
            title="Cancel"
            onClick={() => setOpen(false)}
          />
          <Button type="submit" title="Save" />
        </div>
      </Form>
    </Modal>
  );
};

export default BookForm;
