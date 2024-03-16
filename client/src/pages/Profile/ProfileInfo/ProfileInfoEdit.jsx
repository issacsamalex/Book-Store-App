import { Form, Input, Modal, message, ConfigProvider } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";
import { UpdateUser } from "../../../api/users";
import Button from "../../../components/Button";
import { setUser } from "../../../redux/usersSlice";

const ProfileInfoEdit = ({ showEditForm, setShowEditForm, selectedUser }) => {


  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await UpdateUser({
        ...values,
        _id: selectedUser._id,
      });
      message.success(response.message);
      dispatch(setUser(response.data));
      setShowEditForm(false);
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error("Incorrect old password");
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
        centered
        open={showEditForm}
        onCancel={() => setShowEditForm(false)}
        title="Edit Profile Info"
        footer={null}
      >
        <Form
          layout="vertical"
          initialValues={{
            name: selectedUser.name,
            email: selectedUser.email,
            phone: selectedUser.phone,
          }}
          onFinish={onFinish}
        >
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
                  message: "Name must be at least 3 characters"
                },
              ]}
              hasFeedback
          >
            <Input placeholder="Please enter your name"/>
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter your email",
              },
              {
                type: "email",
                message: "Please enter a valid e-mail"
              }
            ]}
            hasFeedback
          >
            <Input placeholder="Please enter your email"/>
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
                    if(!value){
                      return Promise.reject()
                    }else if(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(value)) {
                      return Promise.resolve();
                    }else {
                      return Promise.reject("Please enter a valid phone number");
                    }
                  }
                }
              ]}
              hasFeedback
          >
            <Input maxLength={10} placeholder="Enter your phone number"/>
          </Form.Item>
          <Form.Item
            label="Old Password"
            name="oldPassword"
            
          >
            <Input.Password placeholder="Enter your old password"/>
          </Form.Item>
          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[
                {
                  min: 8,
                  message: "Password must be at least 8 characters",
                },
                {
                  validator: (_, value) => {
                    if(value){

                        if(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/.test(value)){
                          return Promise.resolve();
                        }else{
                          return Promise.reject("Must include uppercase and lowercase letters, a number and a special character")
                        }
                    }else {
                        return Promise.resolve()
                    }
                  }
                }
              ]}
              hasFeedback
          >
            <Input.Password placeholder="Enter your new password"/>
          </Form.Item>

          <div className="flex justify-end gap-2 mt-1">
            <Button
              type="button"
              variant="flat"
              title="Cancel"
              onClick={() => setShowEditForm(false)}
            />
            <Button type="submit" title="Update" />
          </div>
        </Form>
      </Modal>
      </ConfigProvider>
    </div>
  );
};

export default ProfileInfoEdit;
