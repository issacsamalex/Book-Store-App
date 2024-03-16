import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetLoggedInUserDetails } from "../api/users";
import { message, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/usersSlice";
import { HideLoading, ShowLoading } from "../redux/loadersSlice";
import Brandlogo from "../assets/logo/book_3145755.png";
import { UserOutlined, HomeOutlined } from "@ant-design/icons";
import { LogoutOutlined } from "@ant-design/icons";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const validateUserToken = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetLoggedInUserDetails();
      dispatch(HideLoading());
      if (response.success) {
        dispatch(setUser(response.data));
      } else {
        localStorage.removeItem("token");
        navigate("/login");
        message.error(response.message);
      }
    } catch (error) {
      localStorage.removeItem("token");
      navigate("/login");
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      validateUserToken();
    }
  }, []);

  return (
    <div>
      {user && (
        <div className="p-1">
          <div className="header p-2 bg-dash-header-color rounded flex justify-between items-center">
            <div
              className="brand-logo cursor-pointer"
              onClick={() => navigate("/dashboard")}
            >
              <img src={Brandlogo} alt="brand-logo" />
              <h1 className="title">BookLendr</h1>
            </div>
            <div className="flex items-center gap-2">
              <div
              className="flex flex-col items-center text-white cursor-pointer gap-min"
              onClick={() => navigate("/dashboard")}
              >
                <HomeOutlined />
                <span className="text-min">Home</span>
              </div>
              <div className="flex gap-1 items-center bg-white p-1 rounded">
                <Tooltip
                title="Profile Info"
                color="cyan"
                >
                <div
                  className="cursor-pointer"
                  onClick={() => navigate("/profile")}
                >
                  <UserOutlined className="icon-color" />
                  <span className="text-sm font-bold text-secondary underline ml-min">
                    {user.name.toUpperCase().split(" ")[0]}
                  </span>
                </div>
                </Tooltip>
                <Tooltip
                title="log out"
                color="red"
                >
                <LogoutOutlined
                  className="ml-2 cursor-pointer icon-color"
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/login");
                    message.success("You have successfully logged out");
                  }}
                />
                </Tooltip>
              </div>
            </div>
          </div>

          <div className="dash-content mt-1">{children}</div>
        </div>
      )}
    </div>
  );
};

export default ProtectedRoute;
