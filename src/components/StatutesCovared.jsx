import React, { useEffect, useState } from 'react';
import { Button, Form, message, Row, Col, Table, Modal } from 'antd';
import { RiDeleteBinLine } from "react-icons/ri";
import Swal from 'sweetalert2';
import { BASE_URL } from '../main';
import Heading from './Heading';
//const BASE_URL = 'http://192.168.30.199:3000/api/';
const handleMenuClick = (e) => {
    message.info(`Clicked on menu item ${e.key}`);
    // console.log('Clicked on', e); 
};

const columns = [
    {
        title: 'S.no',
        dataIndex: 'key',
        key: 'key',
    },
    {
        title: 'State Name',
        dataIndex: 'stateName',
        key: 'stateName',

    },

    {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        render: () => (
            <RiDeleteBinLine className='cursor-pointer text-[16px]' />
        ),
    },
];

const data = [];
for (let i = 0; i < 8; i++) {
    data.push({
        key: i,
        stateName: `Edward King ${i}`,

    });
}


const StatutesCovared = () => {

    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isAddAdminModalOpen, setIsAddAdminModalOpen] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState(null);
    const [form] = Form.useForm();

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
            const response = await fetch(`${BASE_URL}covered`, {
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
            // console.log(result); 
            setUserData(result.map((user, index) => ({
                key: index + 1,
                user: user.state_name,
               
                id: user.id,
            })));
        } catch (error) {
           
         
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
            const response = await fetch(`${BASE_URL}covered/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ id }),
            });

            if (!response.ok) {
                throw new Error('Failed to delete user');
            }

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'State deleted successfully',
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
            const response = await fetch(`${BASE_URL}covered`, {
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
                text: 'State added successfully',
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
            title: 'State name',
            dataIndex: 'user',
            key: 'user',
            
        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'action',
            render: (id) => (
                <RiDeleteBinLine className='cursor-pointer text-[16px]' onClick={() => showDeleteModal(id)} />
            ),
        },
    ];

    return (
        <div style={{ padding: '20px' }}>

            <Row>
                <Col span={24}>
                    <div className="flex justify-between items-center p-5 bg-[#ffffff]"> 
                    <Heading title={"States Covered"} style={"text-left "} />
                    
                        <Button onClick={openAddAdminModal} style={{ color: '#fcfcfc' }} className='font-normal text-sm ' type="primary" >
                            + Add State
                        </Button>
                    </div>
                    <Table columns={columns} dataSource={userData} pagination={false} />
                </Col>
            </Row>

            <Modal open={isDeleteModalOpen} onCancel={handleCancel} footer={null}>
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-[#E8F6FE]">
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2>Are you sure you want to delete this state?</h2>
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
                                name="state_name"
                                label="State Name"
                                rules={[{ required: true, message: 'Please input the state name!' }]}
                            >
                                <input
                                    className=" p-2 block w-full rounded-md border-0 py-1.5 h-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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

export default StatutesCovared;