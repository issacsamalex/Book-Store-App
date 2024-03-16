import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { ApproveRequest, GetAllRequests } from '../../../api/requestForm';
import { HideLoading, ShowLoading } from '../../../redux/loadersSlice';
import { Table, message, ConfigProvider } from 'antd';
import Button from '../../../components/Button';

const RentRequests = () => {

    const [requests, setRequests] = useState([]);
    const dispatch = useDispatch();


    const GetRequests = async () => {
        try {
            dispatch(ShowLoading());
            const response = await GetAllRequests();
            dispatch(HideLoading());
            if(response.success){
                setRequests(response.data);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message)
        }
    };

    const handleApproveRequest = async (id) => {
        try {
            dispatch(ShowLoading());
            const response = await ApproveRequest(id);
            dispatch(HideLoading());
            if(response.success){
                message.success(response.message)
                GetRequests();
            }else {
                message.error(response.message)
            };
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    useEffect(() => {
        GetRequests();
    }, [])

    const columns = [
        {
            title: "Issue Id",
            dataIndex: "_id",
        },
        {
            title: "User Id",
            dataIndex: "user",
            render:(user) => user._id,
        },
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Library Id",
            dataIndex: "libraryId",
        },
        {
            title: "Book Name",
            dataIndex: "title",
        },
        {
            title: "Status",
            dataIndex: "status",
        },
        {
            title: "Actions",
            dataIndex: "actions",
            render: (action, record) => {
                return record.status === "Pending" && (
                    <div>
                        <Button title='Approve' onClick={() => handleApproveRequest(record._id)}/>
                    </div>
                )
            }
        }
    ]

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
        <Table columns={columns} dataSource={requests}/>
        </ConfigProvider>
    </div>
  )
}

export default RentRequests