import React, { useEffect, useState } from 'react';
import { Button, Form, message, Row, Col, Table, Modal, Select } from 'antd';
import { RiDeleteBinLine } from "react-icons/ri";
import Swal from 'sweetalert2';
import { BASE_URL } from '../../main';

//const BASE_URL = 'http://192.168.30.199:3000/api/';

const UserAccountCreate = () => {
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isAddAdminModalOpen, setIsAddAdminModalOpen] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState(null);
    const [form] = Form.useForm();
    // console.log(userData)   
    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        const token = JSON.parse(localStorage.getItem('token'));
                
                
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}create-all-user`, {
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
        //   console.log(result.data); 
            setUserData(result.data);
               
            
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
            const response = await fetch(`${BASE_URL}user-delete/${id}`, {
                method: 'DELETE',
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
                text: 'User deleted successfully',
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

        try {
            const response = await fetch(`${BASE_URL}register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                throw new Error('Failed to add admin');
            }

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Create user successfully ',
            });
            fetchUserData();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed create user ',
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

    if (loading) {
        return <div>Loading...</div>;
    }



    const columns = [
        {
            title: 'S.no',
            dataIndex: 'key',
            key: 'key', 
            render:(_,record , index)=><p>{index+1}</p>
        },
        {
            title: 'User',
            dataIndex: 'user',
            key: 'user',
            render(text, item){
               
                return(
                    <div className='capitalize'>
                        {item?.first_name} {item?.last_name}
                    </div>
                );
            }
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render(text, item){
                return(
                    <div>
                        {item?.email}
                    </div>
                );
            }
        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'action',
            render: (id) => { 
                const isSuperAdmin = JSON.parse(localStorage.getItem('user_type')) === "SUPER ADMIN";
                return( 
                    isSuperAdmin ? (
                    <RiDeleteBinLine 
                        className='cursor-pointer text-[16px]' 
                        onClick={() => showDeleteModal(id)} 
                    />
                ) : (
                    <RiDeleteBinLine 
                        className='text-[16px] text-gray-400 cursor-not-allowed' 
                        onClick={(e) => e.preventDefault()} 
                    />
                )
             ) },
        },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <div className="flex justify-between items-center mb-6">
                <h1 className='text-[#1DA1F2] text-[32px] font-normal p-1 w-full'>Create User Account</h1>
                <Button onClick={openAddAdminModal} style={{ color: '#666666' }} className='font-normal text-sm text-[#666666]' type="primary" ghost>
                    + Add user
                </Button>
            </div>
            <Row>
                <Col span={24}>
                    <Table columns={columns} dataSource={userData} pagination={false} />
                </Col>
            </Row>
            <Modal open={isDeleteModalOpen} onCancel={handleCancel} footer={null}>
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-[#E8F6FE]">
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2>Are you sure you want to delete this user?</h2>
                        <div className="flex justify-end gap-4 mt-4">
                            <Button onClick={handleCancel}>Cancel</Button>
                            <Button type="primary" onClick={handleDeleteConfirm}>Yes</Button>
                        </div>
                    </div>
                </div>
            </Modal>

            <Modal open={isAddAdminModalOpen} onCancel={closeAddAdminModal} footer={null}>
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-[#E8F6FE]">
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={handleAddAdminSubmit}
                        >
                            <Form.Item
                                name="first_name"
                                label="First Name"
                                rules={[{ required: true, message: 'Please input the admin first name!' }]}
                            >
                                <input
                                    className="block w-full rounded-md border-0 py-1.5 h-12 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </Form.Item>
                            <Form.Item
                                name="last_name"
                                label="Last Name"
                                rules={[{ required: true, message: 'Please input the admin last name!' }]}
                            >
                                <input
                                    className="block p-2 w-full rounded-md border-0 py-1.5 h-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </Form.Item>
                            <Form.Item
                                name="email"
                                label="Email address"
                                rules={[{ required: true, message: 'Please input the admin email!' }]}
                            >
                                <input
                                    className="block p-2 w-full rounded-md border-0 py-1.5 h-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </Form.Item>
                            <Form.Item style={{border:'0px'}}
                                name="user_type"
                                label="User role"
                                rules={[{ required: true, message: 'Please select the user role!' }]}
                            >
                                <Select className='block w-full rounded-md border-0 py-1.5 h-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300'>
                                    <option value="USER">USER</option>
                                   
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="password"
                                label="Password"
                                rules={[
                                    { required: true, message: 'Please input the admin password!' },
                                    { min: 6, message: 'Password must be at least 6 characters long!' },
                                ]}
                            >
                                <input
                                    type="password"
                                    className="block p-2 w-full h-12 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </Form.Item>
                            <Form.Item
                                name="password_confirmation"
                                label="Confirm password"
                                rules={[
                                    { required: true, message: 'Please confirm the admin password!' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('The two passwords do not match!'));
                                        },
                                    }),
                                ]}
                            >
                                <input
                                    type="password"
                                    className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 h-12"
                                />
                            </Form.Item>
                            <center>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className='w-[138px] h-[49px] bg-[#1D75F2] text-2xl text-white font-medium'
                                >
                                    Submit
                                </Button>
                            </center>
                        </Form>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default UserAccountCreate;
