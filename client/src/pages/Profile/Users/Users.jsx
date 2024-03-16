import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";
import { DeleteUser, getAllUsers } from "../../../api/users";
import { Table, message, ConfigProvider, Tooltip, Popconfirm } from "antd";
import moment from "moment";
import Button from "../../../components/Button";
import IssuedBooks from "./IssuedBooks";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import UsersEditForm from "./UsersEditForm";

const Users = ({ role }) => {
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState(null);
  const [showIssuedBooks, setShowIssuedBooks] = useState(false);
  const [users, setUsers] = useState([]);
  const [openUserEditForm, setOpenUserEditForm] = useState(false);

  const getUsers = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllUsers(role);
      dispatch(HideLoading());
      if (response.success) {
        setUsers(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const deleteUser = async (id) => {
    try {
        dispatch(ShowLoading());
        const response = await DeleteUser(id);
        dispatch(HideLoading());
        if(response.success){
            message.success(response.message);
            getUsers()
        }else {
            message.error(response.message);
        }
    } catch (error) {
        dispatch(HideLoading());
        message.error(error.message)
    }
};

  useEffect(() => {
    getUsers();
  }, []);

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Created On",
      dataIndex: "createdAt",
      render: (createdAt) => moment(createdAt).format("DD-MM-YYYY"),
    },
    {
      title: role === "user" ? "Actions" : null,
      dataIndex: "actions",
      render: (actions, record) => (
        <>
          {role === "user" && (
            <>
            <div className="flex gap-2 cursor-pointer">
            <Button
              title="Issued Books"
              variant="outlined"
              color="secondary"
              onClick={() => {
                setSelectedUser(record);
                setShowIssuedBooks(true);
              }}
            />
            <Popconfirm
            title="Sure to delete?"
            onConfirm={() => deleteUser(record._id)}
            >
            <Tooltip
            title="Delete"
            color="red"
            placement="bottom"
            >
              <DeleteOutlined
              className="btn-danger-color"
              />
              </Tooltip>
              </Popconfirm>

              <Tooltip
              title="Edit"
              color="orange"
              placement="bottom"
              >
              <EditOutlined
              onClick={() => {
                setOpenUserEditForm(true)
                setSelectedUser(record)
              }}
              />
              </Tooltip>
            </div>
            </>
          )}
        </>
      ),
    },
  ];

  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#E1F2FF",
              rowHoverBg: "#F7FBFF",
            },
          },
          token: {
            colorPrimary: "#3F76A7",
          },
        }}
      >
        <Table dataSource={users} columns={columns} />
      </ConfigProvider>

      {showIssuedBooks && (
        <IssuedBooks
          showIssuedBooks={showIssuedBooks}
          setShowIssuedBooks={setShowIssuedBooks}
          selectedUser={selectedUser}
        />
      )}

      {openUserEditForm && (
        <UsersEditForm
        openUserEditForm={openUserEditForm}
        setOpenUserEditForm={setOpenUserEditForm}
        selectedUser={selectedUser}
        getUsers={getUsers}
        />
      )}
    </div>
  );
};

export default Users;
