import { Modal, Table, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../redux/loadersSlice';
import { GetIssues } from '../../../api/books';
import moment from 'moment';

const IssuedBooks = ({
    showIssuedBooks,
    setShowIssuedBooks,
    selectedUser
}) => {

    const [issuedBooks, setIssuedBooks] = useState([]);
    const dispatch = useDispatch();

    const getIssues = async () => {
        try {
            dispatch(ShowLoading());
            const response = await GetIssues({
                user: selectedUser._id,
            })
            dispatch(HideLoading());
            if(response.success){
                setIssuedBooks(response.data);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    }

    useEffect(() => {
        getIssues();
    },[]);


    const columns = [
        {
            title: "Issue Id",
            dataIndex: "_id",
        },
        {
            title: "Book Name",
            dataIndex: "book",
            render: (book) => book.title,
        },
        {
            title: "Issued On",
            dataIndex: "issueDate",
            render: (issueDate) => moment(issueDate).format("DD-MM-YYYY"),
        },
        {
            title: "Return Date(due date)",
            dataIndex: "returnDate",
            render: (returndate) => moment(returndate).format("DD-MM-YYYY"),
        },
        {
            title: "Rent",
            dataIndex: "rent",
        },
        {
            title: "Fine",
            dataIndex: "fine",
        },
        {
            title: "Returned On",
            dataIndex: "returnedDate",
            render: (returnedDate) => {
                if(returnedDate){
                    return moment(returnedDate).format("DD-MM-YYYY");
                }else {
                    return "Pending Return";
                }
            }
        }
    ]

  return (
    <Modal
    open={showIssuedBooks}
    onCancel={() => setShowIssuedBooks(false)}
    footer={null}
    width={1400}
    >
        <h1 className='text-secondary font-bold text-xl text-center mb-1'>
            {selectedUser.name}'s Issued Books
        </h1>

        <Table columns={columns} dataSource={issuedBooks}/>
    </Modal>
  )
}

export default IssuedBooks