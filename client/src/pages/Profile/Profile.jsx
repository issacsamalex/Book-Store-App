import React from "react";
import { Tabs, ConfigProvider } from "antd";
import Books from "./Books/Books";
import Users from "./Users/Users";
import { useSelector } from "react-redux";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import BorrowedBooks from "./BorrowedBooks/BorrowedBooks";
import Reviews from "./Reviews/Reviews";
import RentRequests from "./RentRequest/RentRequests";
import { Helmet } from "react-helmet";





const Profile = () => {

  const {user} = useSelector(state => state.users);
  const role = user.role;

  const items = [
    {
      key: '1',
      label: "Profile Info",
      children: <ProfileInfo/>
    },
    {
      key: '2',
      label: role === 'user' ? 'Books Borrowed' : null,
      children: role === 'user' && <BorrowedBooks/>
    },
    {
      key: '3',
      label: role === 'user' ? 'Reviews' : null,
      children: role === 'user' && <Reviews/>
    },
    {
      key: '4',
      label: role === 'admin' ? 'Bookstore' : null,
      children: role === 'admin' && <Books/>
    },
    {
      key: '5',
      label: role === 'admin' ? 'Rent Requests' : null,
      children: role === 'admin' && <RentRequests/>
    },
    {
      key: '6',
      label: role === 'admin' ? 'Members' : null,
      children: role === 'admin' && <Users role='user'/>,
    },
    {
      key: '7',
      label: role === 'admin' ? 'Admins' : null,
      children: role === 'admin' && <Users role='admin'/>
    },
  ];
  

  return (
    <>
    <Helmet>
      <title>BookLendr - Dashboard</title>
    </Helmet>
    <ConfigProvider theme={{components: {Tabs: {itemColor: "#AB6527", itemActiveColor: "#DE802C",itemHoverColor: "#DE802C", itemSelectedColor: "#DE802C", inkBarColor: "#DE802C",titleFontSize: 16}}}}>
      <div>
      <Tabs defaultActiveKey="1" items= {items} />
    </div>
    </ConfigProvider>
    </>
  );
};

export default Profile;
