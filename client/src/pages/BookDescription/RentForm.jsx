import { Form, Input, Modal, ConfigProvider, message } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button";
import { CreateRequestForm } from "../../api/requestForm";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";

const RentForm = ({ showRentForm, setShowRentForm, bookData }) => {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
        dispatch(ShowLoading());
        const response = await CreateRequestForm({
            ...values,
            userId : user._id,
            bookId : bookData._id
        });
        dispatch(HideLoading());
        if(response.success){
            message.success(response.message);
            setShowRentForm(false);
        }else {
            message.error(response.message);
        }
    } catch (error) {
        dispatch(HideLoading());
        message.error(error.message);
    }
  };

  return (
    <div>
      <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#3F76A7",
        }
      }}
      >
        <Modal
          open={showRentForm}
          centered
          onCancel={() => setShowRentForm(false)}
          title="Rent Request Form"
          footer={null}
        >
          <Form
            layout="vertical"
            initialValues={{
              title: bookData.title,
              author: bookData.author,
              name: user.name,
              phone: user.phone,
            }}
            onFinish={onFinish}
          >
            <Form.Item label="Book Title" name="title">
              <Input disabled placeholder="Please enter book title" />
            </Form.Item>
            <Form.Item label="Book Author" name="author">
              <Input disabled placeholder="Please enter book author" />
            </Form.Item>
            <Form.Item label="Library Id" name="libraryId">
              <Input placeholder="Please enter your library Id" />
            </Form.Item>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please enter your name",
                },
                {
                  whitespace: true,
                  message: "Name cannot be empty",
                },
                {
                  min: 3,
                  message: "Name must be at least 3 characters",
                },
              ]}
            >
              <Input placeholder="Please enter your name" />
            </Form.Item>
            <Form.Item
              label="Contact Number"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please enter your phone number",
                },
                {
                  validator: (_, value) => {
                    if (!value) {
                      return Promise.reject();
                    } else if (
                      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
                        value
                      )
                    ) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject(
                        "Please enter a valid phone number"
                      );
                    }
                  },
                },
              ]}
            >
              <Input
                maxLength={10}
                placeholder="Please enter your contact number"
              />
            </Form.Item>

            <div className="flex justify-end gap-2 mt-1">
              <Button type="button" variant="flat" title="Cancel" onClick={() => setShowRentForm(false)} />
              <Button type="submit" title="Send Request" />
            </div>
          </Form>
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default RentForm;
