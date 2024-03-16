import React, { useEffect } from "react";
import { Form, Input, message, Button, ConfigProvider } from "antd";
import { HomeOutlined, GoogleOutlined } from '@ant-design/icons';
import ButtonCustom from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { GoogleLogin, LoginUser } from "../../api/users";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../../firebase";
import { Helmet } from "react-helmet";

const Login = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async  (values) => {
    try {
      dispatch(ShowLoading());
      const response = await LoginUser(values);
      dispatch(HideLoading());
      if(response.success){
        message.success(response.message);
        localStorage.setItem("token", response.data);
        window.location.href = '/dashboard';
      }else {
        message.error(response.message);
      }
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


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>BookLendr - Login</title>
      </Helmet>
      <div className="h-screen bg-primary flex items-center justify-center">
        <div className="authentication-form bg-white p-3 rounded">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-secondary text-2xl font-bold mb-1">
              BookLendr - Login
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
          <Form layout="vertical" className="mt-1" onFinish={onFinish}>
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
                },
              ]}
              hasFeedback
            >
              <Input placeholder="Enter your e-mail"/>
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter your password",
                },
              ]}
              hasFeedback
            >
              <Input.Password placeholder="Enter your password"/>
            </Form.Item>

            <div className="mt-2 flex justify-center flex-col gap-1">
              <ButtonCustom title="LOG IN" type="submit" fullWidth={true} />
              <Button onClick={handleGoogleLogin} size="large" icon={<GoogleOutlined />}>Continue with google</Button>
              <Link to={"/signup"} className="text-primary text-sm underline text-center">
                Don't have an account? Click here to Register
              </Link>
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

export default Login;
