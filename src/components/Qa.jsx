import React, { useState, useEffect } from 'react';
import { Button, Form, message, Row, Col, Table, Modal } from 'antd';
import { RiDeleteBinLine } from "react-icons/ri";
import Swal from 'sweetalert2';
import { BASE_URL } from '../main';
import { Link } from 'react-router-dom';

const Qa = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isAddAdminModalOpen, setIsAddAdminModalOpen] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState(null);
    const [files, setFiles] = useState([]);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        setLoading(true);
        const token = JSON.parse(localStorage.getItem('token'));
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}qa-index`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            const result = await response.json();
            // console.log(result) 
            setUserData(result.data.map((user, index) => ({
                key: user.id,
                email: user.email,
                files: JSON.parse(user.file),  // Parse file paths
                id: user.id,
            })));
        } catch (error) {
            // console.error('Error fetching user data:', error); 
            message.error('Error fetching user data');
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (id) => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (!token) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Unauthorized user',
            });
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}qa-delete/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete user');
            }

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'QA deleted successfully',
            });
            fetchUserData();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to delete user',
            });
        }
    };

    const addAdmin = async (values) => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (!token) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Unauthorized user',
            });
            return;
        }

        const formData = new FormData();
        formData.append('email', values.email);
        formData.append('title', values.title);
        formData.append('description', values.description);
        files.forEach((file) => formData.append('files[]', file));

        try {
            const response = await fetch(`${BASE_URL}qa-store`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to add admin');
            }

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'QA added successfully',
            });
            fetchUserData(); 
            form.resetFields("")
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to add admin',
            });
        }
    };

    const showDeleteModal = (id) => {
        setDeleteUserId(id);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = () => {
        deleteUser(deleteUserId);
        setIsDeleteModalOpen(false);
    };

    const handleCancel = () => {
        setIsDeleteModalOpen(false);
    };

    const openAddAdminModal = () => {
        setIsAddAdminModalOpen(true);
    };

    const closeAddAdminModal = () => {
        setIsAddAdminModalOpen(false);
    };

    const handleAddAdminSubmit = (values) => {
        addAdmin(values);
        setIsAddAdminModalOpen(false);
    };

    const handleFileChange = (e) => {
        setFiles(Array.from(e.target.files));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    const columns = [
        {
            title: 'S.no',
            dataIndex: 'key',
            key: 'key', 
            render:(_,record,index)=><p>{index+1}</p>
        },
        {
            title: 'Clients Email',
            dataIndex: 'email',
            key: 'email',
        },
        // {
        //     title: 'Files',
        //     dataIndex: 'files',
        //     key: 'files',
        //     render: (files) => (
        //         <div>
        //             {files.map((file, index) => (
        //                 <a key={index} href={`${BASE_URL}${file}`} target="_blank" rel="noopener noreferrer">
        //                     {file.split('/').pop()}
        //                 </a>
        //             ))}
        //         </div>
        //     ),
        // },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'action',
            render: (id) => (
                <div className='flex gap-5'>
                    <Link to={`/qa-details/${id}`}>
                        <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.0003 0C16.3924 0 20.8784 3.87976 21.8189 9C20.8784 14.1202 16.3924 18 11.0003 18C5.60812 18 1.12215 14.1202 0.181641 9C1.12215 3.87976 5.60812 0 11.0003 0ZM11.0003 16C15.2359 16 18.8603 13.052 19.7777 9C18.8603 4.94803 15.2359 2 11.0003 2C6.7646 2 3.14022 4.94803 2.22278 9C3.14022 13.052 6.7646 16 11.0003 16ZM11.0003 13.5C8.51498 13.5 6.50026 11.4853 6.50026 9C6.50026 6.51472 8.51498 4.5 11.0003 4.5C13.4855 4.5 15.5003 6.51472 15.5003 9C15.5003 11.4853 13.4855 13.5 11.0003 13.5ZM11.0003 11.5C12.381 11.5 13.5003 10.3807 13.5003 9C13.5003 7.6193 12.381 6.5 11.0003 6.5C9.6196 6.5 8.50026 7.6193 8.50026 9C8.50026 10.3807 9.6196 11.5 11.0003 11.5Z" fill="#1D75F2" />
                        </svg>
                    </Link>
                    <RiDeleteBinLine className='cursor-pointer text-[16px]' onClick={() => showDeleteModal(id)} />
                </div>
            ),
        },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <div className='mb-4 flex justify-between '>
                <p>QA History</p>
                <Button type="primary" onClick={openAddAdminModal}>Add QA</Button>
            </div>
            <Table columns={columns} dataSource={userData} pagination={false} />

            <Modal
                title="Delete Confirmation"
                visible={isDeleteModalOpen}
                onOk={handleDeleteConfirm}
                onCancel={handleCancel}
                okText="Yes"
                cancelText="No"
            >
                <p>Are you sure you want to delete this record?</p>
            </Modal>

            <Modal
               
                visible={isAddAdminModalOpen}
                onCancel={closeAddAdminModal}
                footer={null}
                width="30%"
                
            >
                <Form
                    form={form}
                    onFinish={handleAddAdminSubmit}
                    layout="vertical"
                    style={{padding:"50px"}}
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input email!' }]}
                    >
                        <input type="email" placeholder='type your email' className=" p-2 block w-full h-12 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </Form.Item>
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[{ required: true, message: 'Please input title!' }]}
                    >
                        <input type="text"  placeholder='type your question'  className=" p-2 block w-full h-12 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </Form.Item>
                   
                    <Form.Item
                        label="Upload Files"
                    >
                        <input type="file"  multiple onChange={handleFileChange}  className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 h-12" />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please input description!' }]}
                    >
                        <textarea rows={6} cul placeholder='Write here' className='p-2 rounded-[10px] w-full' /> 
                    </Form.Item>
                    <Form.Item>
                       <center> <Button   className='w-[138px] h-[49px] bg-[#C738BD] text-2xl text-white font-medium justify-center m-auto' htmlType="submit">Submit</Button></center>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Qa;
