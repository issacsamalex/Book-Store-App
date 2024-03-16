import React, { useEffect } from "react";
import { Form, Input, message, Select, Button, ConfigProvider } from "antd";
import { HomeOutlined, GoogleOutlined } from '@ant-design/icons';
import ButtonCustom from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin, RegisterUser } from "../../api/users";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../../firebase";
import { Helmet } from "react-helmet";

const SignUp = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Option } = Select;


  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await RegisterUser(values);
      dispatch(HideLoading());
      if(response.success){
        message.success(response.message);
        navigate('/login');
      }else {
        message.error(response.message);
      };
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  // Function for Google Federated login
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const response = await GoogleLogin({
        name: result.user.displayName,
        email: result.user.email,
        phone: result.user.phoneNumber,
      });
      if(response.success){
        message.success(response.message);
        localStorage.setItem("token", response.data);
        window.location.href = '/dashboard';
      }else {
        message.error(response.message);
      }
    } catch (error) {
      message.error("could not login with google");
    }
  };

 

  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(token){
      navigate('/dashboard');
    }
  }, [])

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="91">+91</Option>
      </Select>
    </Form.Item>
    );

  return (
    <>
    <Helmet>
      <title>BookLendr - Register</title>
    </Helmet>
      <div className="h-screen bg-primary flex items-center justify-center">
        <div className="authentication-form bg-white p-3 rounded">
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-secondary text-2xl font-bold mb-1">
            BookLendr - Register
            </h1>
            <div className="underline-heading"></div>
            </div>
            <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#3F76A7",
              }
            }}
            >
          <Form autoComplete="off" layout="vertical" className="mt-1" initialValues={{ prefix: '91'}} onFinish={onFinish}>
            <Form.Item label="Name" name="name"
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
              <Input placeholder="Enter your name"/>
            </Form.Item>
            <Form.Item label="Email" name="email"
              rules={[
                {
                  required: true,
                  message: "Please enter your e-mail",
                },
                {
                  type: "email",
                  message: "Please enter a valid e-mail"
                }
              ]}
              hasFeedback
            >
              <Input placeholder="Enter your e-mail"/>
            </Form.Item>
            <Form.Item label="Phone Number" name="phone"
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
              <Input addonBefore={prefixSelector} maxLength={10} placeholder="Enter your phone number"/>
            </Form.Item>
            <Form.Item label="Password" name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter your password",
                },
                {
                  min: 8,
                  message: "Password must be at least 8 characters",
                },
                {
                  validator: (_, value) => {
                    if(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/.test(value)){
                      return Promise.resolve();
                    }else{
                      return Promise.reject("Must include uppercase and lowercase letters, a number and a special character")
                    }
                  }
                }
              ]}
              hasFeedback
            >
              <Input.Password placeholder="Enter your password"/>
            </Form.Item>

            
            <div className="mt-2 flex justify-center flex-col gap-1">
                <ButtonCustom title="SIGN UP" type="submit" fullWidth={true}/>
                <Button onClick={handleGoogleLogin} size="large" icon={<GoogleOutlined />}>Continue with google</Button>
                <Link to={'/login'} className="text-primary text-sm underline text-center ">Already have an account? Click here to login</Link>
                <div className="flex justify-center gap-min mt-1 text-teritary"
                onClick={() => {
                  navigate('/')
                }}
              >
                <HomeOutlined />
                <p className="text-sm underline">back to home</p>
              </div>
            </div>
          </Form>
          </ConfigProvider>
        </div>
      </div>
    </>
  );
};

export default SignUp;
