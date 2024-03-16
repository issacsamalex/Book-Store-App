import React, { useState } from 'react';
import { EditOutlined, FormOutlined } from '@ant-design/icons';
import { Avatar, Card, ConfigProvider } from 'antd';
import userIcon from '../../../assets/logo/user_icon.png';
import { useSelector } from 'react-redux';
import moment from 'moment';
import ProfileInfoEdit from './ProfileInfoEdit';
const { Meta } = Card;

const ProfileInfo = () => {

  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const {user} = useSelector((state) => state.users);

  return (
    <>
    <div className='centered-div'>
      <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#4785BC",
          colorTextDescription: "#2F597F"
        }
      }}
      >
      <Card
    style={{
      backgroundColor: "rgb(230, 246, 255)",
      borderColor: "#04152d",
      boxShadow: "0px 0px 50px -15px rgba(63,118,167,0.5)"
    }}
    actions={[
      // <div className='flex flex-col items-center'>
      //   <FormOutlined key="request" />
      //   <span className='text-sm p-min font-bold'>Request Rental</span>
      // </div>,
      <div className='flex flex-col items-center' onClick={() => {
        setShowEditForm(true)
        setSelectedUser(user)
      }}>
        <EditOutlined key="edit" />
        <span className='text-sm p-min font-bold'>Edit Profile Info</span>
      </div>,
    ]}
  >
    <Meta
      avatar={<Avatar src={userIcon} />}
      title={`welcome, ${user.name} !`}
      description={`Assigned Role : ${user.role.toUpperCase()}`}
    />
    <div className='flex justify-between pt-2 gap-4'>
      <div className='flex flex-col justify-start gap-min'>
        <span className='text-sm font-bold'>Email</span>
        <span className='text-sm font-bold'>Contact Number</span>
        <span className='text-sm font-bold'>Registered On</span>
      </div>
      <div className='flex flex-col gap-min justify-end'>
        <span className='text-sm'>{user.email}</span>
        <span className='text-sm'>{user.phone}</span>
        <span className='text-sm'>{moment(user.createdAt).format("MMMM Do YYYY")}</span>
      </div>
    </div>
  </Card>
  </ConfigProvider>
    </div>
    {showEditForm && 
    <ProfileInfoEdit
    showEditForm={showEditForm}
    setShowEditForm={setShowEditForm}
    selectedUser={selectedUser}
    />}
    </>
  )
}

export default ProfileInfo